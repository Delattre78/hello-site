#!/bin/bash
# =====================================================================
# BRIZZ — Récupère le VID de la variante CJ (1 min, 1 seule fois)
# Lance ce script dans Terminal :  bash automation/get-vid.sh
# =====================================================================

echo ""
echo "=== Récupération du VID produit CJ ==="
echo ""
echo "Colle ta CJ API Key (format CJxxxxx@api@xxxxx) :"
echo "(CJ → Settings → Sécurité du compte → API Key → Generate)"
echo ""
read -p "CJ API Key : " CJ_API_KEY

# 1. Obtenir le token
echo ""
echo "Connexion à CJ..."
TOKEN=$(curl -s -X POST \
  "https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken" \
  -H "Content-Type: application/json" \
  -d "{\"apiKey\":\"$CJ_API_KEY\"}" \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['data']['accessToken'] if d.get('result') else 'ERREUR: ' + str(d.get('message','')))")

if [[ "$TOKEN" == ERREUR* ]]; then
  echo "❌ $TOKEN"
  echo "Vérifie que tu as copié l'API Key complète depuis CJ."
  exit 1
fi

echo "✅ Connecté."

# 2. Récupérer les variantes
echo "Récupération des variantes du produit..."
RESULT=$(curl -s -X GET \
  "https://developers.cjdropshipping.com/api2.0/v1/product/variant/query?pid=2014603723890790401" \
  -H "CJ-Access-Token: $TOKEN")

echo ""
echo "$RESULT" | python3 -c "
import sys, json
d = json.load(sys.stdin)
if not d.get('result'):
    print('Erreur:', d.get('message'))
    sys.exit(1)
variants = d.get('data', [])
for v in variants:
    print(f\"Couleur : {v.get('variantNameEn','?')}  →  VID : {v.get('vid','?')}\")
print()
print('✅ Colle la CJ API Key dans Cloudflare Worker → Settings → Variables → CJ_API_KEY')
"
