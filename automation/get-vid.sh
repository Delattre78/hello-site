#!/bin/bash
# =====================================================================
# BRIZZ — Récupère le VID de la variante CJ (1 min, 1 seule fois)
# Lance ce script dans Terminal :  bash automation/get-vid.sh
# =====================================================================

echo ""
echo "=== Récupération du VID produit CJ ==="
echo ""
read -p "Ton email CJ Dropshipping : " CJ_EMAIL
read -sp "Ton mot de passe CJ : " CJ_PASS
echo ""

# 1. Obtenir le token
echo "Connexion à CJ..."
TOKEN=$(curl -s -X POST \
  "https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$CJ_EMAIL\",\"password\":\"$CJ_PASS\"}" \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['data']['accessToken'] if d.get('result') else 'ERREUR: ' + d.get('message','connexion échouée'))")

if [[ "$TOKEN" == ERREUR* ]]; then
  echo "❌ $TOKEN"
  echo "Vérifie ton email et mot de passe CJ."
  exit 1
fi

echo "✅ Connecté."
echo ""

# 2. Récupérer les variantes du produit
echo "Récupération des variantes..."
RESULT=$(curl -s -X GET \
  "https://developers.cjdropshipping.com/api2.0/v1/product/variant/query?pid=2014603723890790401" \
  -H "CJ-Access-Token: $TOKEN")

echo ""
echo "=== VARIANTES TROUVÉES ==="
echo "$RESULT" | python3 -c "
import sys, json
d = json.load(sys.stdin)
if not d.get('result'):
    print('Erreur:', d.get('message'))
    sys.exit(1)
variants = d.get('data', [])
if not variants:
    print('Aucune variante trouvée.')
    sys.exit(1)
for v in variants:
    print(f\"Couleur : {v.get('variantNameEn','?')}  →  VID : {v.get('vid','?')}\")
print()
print('=== COLLE LE VID DANS stripe-cj-worker.js =====')
print('Remplace VID_A_REMPLACER par le VID ci-dessus.')
"
