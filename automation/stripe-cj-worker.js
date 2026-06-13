/* =====================================================================
   🤖 BRIZZ — AUTOMATISATION COMPLÈTE DES COMMANDES
   ---------------------------------------------------------------------
   Circuit : client paie sur Stripe → Stripe appelle ce serveur (webhook)
   → le serveur crée AUTOMATIQUEMENT la commande chez CJ Dropshipping
   avec l'adresse du client → CJ expédie → Mattéo reçoit un email récap.
   En cas de pépin (rupture de stock, API en panne…) : email d'alerte
   avec toutes les infos pour passer la commande à la main.

   Ce fichier se déploie sur Cloudflare Workers (gratuit, 100k req/jour) :
   dash.cloudflare.com → Workers → Create → coller ce code → Deploy.

   ⚙️ VARIABLES À CONFIGURER (Worker → Settings → Variables) :
   - STRIPE_WEBHOOK_SECRET : whsec_… (Stripe → Développeurs → Webhooks)
   - CJ_EMAIL              : email du compte CJ Dropshipping
   - CJ_API_KEY            : CJ → My CJ → Authorization → API Key
   - ALERT_EMAIL           : delattrematteo4@gmail.com
   ===================================================================== */

/* ---------- CONFIG PRODUITS (à remplir une seule fois) ----------
   Le pack est reconnu par le MONTANT payé (en centimes).
   ⚠️ Si tu changes les prix de la boutique, mets aussi à jour ici.

   Produit CJ : Neck Hanging Bladeless Fan — Luxury Style
   PID CJ     : 2014603723890790401
   URL CJ     : https://cjdropshipping.com/product/neck-hanging-bladeless-fan-white-luxury-style-3-gears-2000-4000mah-usb-rechargeable-retractable-air-outlet-3-6h-battery-life-p-2014603723890790401.html

   Pour les coloris : sur CJ, ouvre la fiche produit, clique sur chaque
   coloris et regarde l'URL ou l'onglet réseau → récupère le "vid".     */
const PACKS_PAR_MONTANT = {
  3490: { pack: "Solo",  quantite: 1 },
  5990: { pack: "Duo",   quantite: 2 },
  7990: { pack: "Tribu", quantite: 3 },
};
const COLORIS_VERS_CJ_VID = {
  // libellé du menu "Coloris" dans Stripe → vid de la variante CJ
  "Blanc":     "VID_BLANC_A_REMPLACER",
  "Bleu nuit": "VID_BLEU_A_REMPLACER",
  "Vert":      "VID_VERT_A_REMPLACER",
};
const COLORIS_PAR_DEFAUT = "Blanc";
const LOGISTIQUE = "CJPacket Ordinary"; // livraison suivie FR ~6-10 j

/* ===================================================================== */

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Brizz automation: en ligne ✅", { status: 200 });
    }

    const payload = await request.text();

    // 1. Vérifier que l'appel vient bien de Stripe (signature HMAC)
    const sigOk = await verifierSignatureStripe(
      payload,
      request.headers.get("stripe-signature") || "",
      env.STRIPE_WEBHOOK_SECRET
    );
    if (!sigOk) return new Response("signature invalide", { status: 400 });

    const event = JSON.parse(payload);
    if (event.type !== "checkout.session.completed") {
      return new Response("ignoré", { status: 200 });
    }

    const session = event.data.object;
    const adresse = session.shipping_details || session.customer_details;
    const produit = PACKS_PAR_MONTANT[session.amount_total];

    // Coloris choisi par le client dans le champ personnalisé Stripe
    const champColoris = (session.custom_fields || []).find(
      f => f.key && f.key.toLowerCase().includes("coloris")
    );
    const coloris =
      (champColoris && champColoris.dropdown && champColoris.dropdown.value) ||
      COLORIS_PAR_DEFAUT;

    const recap = {
      pack: produit ? produit.pack : "INCONNU (montant " + session.amount_total + ")",
      quantite: produit ? produit.quantite : 1,
      coloris,
      montant: (session.amount_total / 100).toFixed(2) + " €",
      client: adresse?.name,
      email: session.customer_details?.email,
      adresse: [
        adresse?.address?.line1,
        adresse?.address?.line2,
        adresse?.address?.postal_code + " " + adresse?.address?.city,
        adresse?.address?.country,
      ].filter(Boolean).join(", "),
    };

    // 2. Créer la commande chez CJ Dropshipping
    try {
      if (!produit) throw new Error("montant inconnu : " + session.amount_total + " centimes");
      const vid = COLORIS_VERS_CJ_VID[coloris];
      if (!vid || vid.startsWith("VID_")) throw new Error("vid CJ non configuré pour " + coloris);

      const token = await cjToken(env);
      const cjResp = await fetch(
        "https://developers.cjdropshipping.com/api2.0/v1/shopping/order/createOrder",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "CJ-Access-Token": token },
          body: JSON.stringify({
            orderNumber: "BRIZZ-" + session.id.slice(-12),
            shippingCountryCode: adresse.address.country || "FR",
            shippingProvince: adresse.address.state || adresse.address.city,
            shippingCity: adresse.address.city,
            shippingAddress: [adresse.address.line1, adresse.address.line2].filter(Boolean).join(" "),
            shippingZip: adresse.address.postal_code,
            shippingCustomerName: adresse.name,
            shippingPhone: session.customer_details?.phone || "0600000000",
            email: session.customer_details?.email,
            logisticName: LOGISTIQUE,
            fromCountryCode: "CN",
            products: [{ vid, quantity: produit.quantite }],
          }),
        }
      );
      const cjData = await cjResp.json();
      if (!cjData.result) throw new Error("CJ a refusé : " + JSON.stringify(cjData));

      await prevenir(env, "✅ Commande Brizz expédiée automatiquement",
        recap, "Commande CJ créée : " + (cjData.data?.orderId || "ok") +
        "\n💰 Pense à garder du solde sur ton wallet CJ pour le paiement auto.");
      return new Response("ok", { status: 200 });

    } catch (err) {
      // 3. Plan B : si l'automatisation échoue, on te prévient IMMÉDIATEMENT
      await prevenir(env, "⚠️ Commande Brizz À PASSER À LA MAIN",
        recap, "L'automatisation a échoué (" + err.message + ").\n" +
        "→ Va sur CJ/AliExpress et passe cette commande manuellement.");
      return new Response("erreur gérée", { status: 200 });
    }
  },
};

/* ---------- Outils ---------- */

async function cjToken(env) {
  const r = await fetch(
    "https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: env.CJ_EMAIL, password: env.CJ_API_KEY }),
    }
  );
  const d = await r.json();
  if (!d.result) throw new Error("connexion CJ impossible : " + d.message);
  return d.data.accessToken;
}

async function prevenir(env, sujet, recap, note) {
  const corps = Object.entries(recap)
    .map(([k, v]) => k + " : " + v)
    .join("\n");
  await fetch("https://formsubmit.co/ajax/" + env.ALERT_EMAIL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ _subject: sujet, message: corps + "\n\n" + note }),
  }).catch(() => {});
}

async function verifierSignatureStripe(payload, header, secret) {
  try {
    const parts = Object.fromEntries(header.split(",").map(p => p.split("=")));
    const attendu = parts.v1, t = parts.t;
    if (!attendu || !t) return false;
    const key = await crypto.subtle.importKey(
      "raw", new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
    );
    const mac = await crypto.subtle.sign("HMAC", key,
      new TextEncoder().encode(t + "." + payload));
    const calc = [...new Uint8Array(mac)].map(b => b.toString(16).padStart(2, "0")).join("");
    return calc === attendu;
  } catch { return false; }
}
