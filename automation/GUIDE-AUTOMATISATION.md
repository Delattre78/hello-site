# 🤖 Brizz — Guide : commandes 100 % automatiques

**Le circuit final :** le client paie sur la boutique → Stripe encaisse →
notre robot (Cloudflare Worker) reçoit l'info → il crée la commande chez
CJ Dropshipping avec l'adresse du client → CJ expédie → tu reçois un email
récap. Tu ne touches à rien. Si quoi que ce soit échoue, tu reçois un email
« ⚠️ à passer à la main » avec toutes les infos.

> Le code du robot est prêt : `automation/stripe-cj-worker.js`.
> Il ne reste que les comptes (toi) et le branchement (Claude).

---

## Étape 1 — Compte Stripe (~20 min) — L'ARGENT

1. https://stripe.com/fr → « Commencer » → email + mot de passe.
2. Renseigne ton identité + ton **IBAN** (= où arrive l'argent) + ton SIRET
   (micro-entreprise : gratuit sur autoentrepreneur.urssaf.fr si pas encore fait).
3. Crée les 3 produits : *Brizz Air Solo* 34,90 € / *Duo* 59,90 € / *Tribu* 79,90 €.
4. Pour chaque produit : **Liens de paiement** → crée le lien et ACTIVE :
   - ✅ « Collecter l'adresse de livraison » (obligatoire pour l'automatisation !)
   - ✅ « Collecter le numéro de téléphone » (utile pour le transporteur)
   - ✅ Champ personnalisé → menu déroulant nommé **Coloris** avec :
     `Blanc`, `Bleu nuit`, `Vert` (exactement ces libellés)
5. **À envoyer à Claude :** les 3 URLs des liens + leurs identifiants
   `plink_…` (visibles dans le dashboard quand tu cliques sur un lien).

## Étape 2 — Compte CJ Dropshipping (~10 min) — LE FOURNISSEUR

1. https://cjdropshipping.com → Sign Up (gratuit).
2. Cherche **« bladeless neck fan »** (le modèle des photos = JISULIFE FA12,
   sinon le clone équivalent) → ouvre la fiche produit.
3. **À envoyer à Claude :** le lien de la fiche produit CJ choisie.
   (Claude en sortira les `vid` des 3 coloris pour le robot.)
4. Mets du solde sur ton **CJ Wallet** (50-100 € pour commencer) :
   c'est avec ça que les commandes auto se paient toutes seules.

## Étape 3 — Compte Cloudflare (~5 min) — LE ROBOT

1. https://dash.cloudflare.com/sign-up (gratuit, juste un email).
2. C'est tout. Le déploiement du robot, Claude le fait avec toi
   (5 min : coller le code, coller 4 variables, copier l'URL du robot
   dans Stripe → Webhooks).

---

## Ce qui reste humain (et le restera)

- **Le SAV** : répondre aux clients (remboursements 14 j, questions).
- **Le wallet CJ** : garder du solde dessus (sinon les commandes attendent).
- **La qualité** : commande UN exemplaire chez le fournisseur choisi avant
  d'ouvrir les ventes, pour vérifier ce que recevront tes clients.

## Récap de qui fait quoi

| Quoi | Qui |
|---|---|
| Comptes Stripe / CJ / Cloudflare (identité, IBAN) | **Mattéo** |
| Liens de paiement + champ Coloris | Mattéo (guidé) |
| Code du robot, branchement, tests | **Claude** |
| Pages légales, avis réels, remplacements | Claude (quand SIRET ok) |
