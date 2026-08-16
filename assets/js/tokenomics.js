/* ⚠ FICHIER GÉNÉRÉ — ne pas éditer à la main.
 * Produit par prototype/tools/exporter-tokenomics.ts, qui IMPORTE prototype/src/config.ts.
 * Les chiffres ci-dessous sont donc exactement ceux que le jeu applique, pas une recopie.
 * Régénérer après tout changement d'émission ou du rig.
 */
window.CAIRN_TOKENOMICS = {
  "genere": "2026-08-16",
  "supply": {
    "total": 1000000000,
    "parts": [
      {
        "label": "Public sale (curve)",
        "amount": 600000000,
        "locked": false
      },
      {
        "label": "Migration liquidity",
        "amount": 150000000,
        "locked": true
      },
      {
        "label": "Emission reserve",
        "amount": 200000000,
        "locked": true
      },
      {
        "label": "Team",
        "amount": 50000000,
        "locked": true
      }
    ]
  },
  "paliers": [
    {
      "label": "Ruin",
      "strike": 0,
      "cost": {}
    },
    {
      "label": "Shored",
      "strike": 5,
      "cost": {
        "stone": 30,
        "plank": 30
      }
    },
    {
      "label": "Awakened",
      "strike": 57,
      "cost": {
        "marble": 200,
        "platinum": 200
      }
    }
  ],
  "pick": {
    "strike": 1,
    "cost": 25,
    "lots": [
      1,
      10,
      100
    ]
  },
  "thrift": {
    "start": 40,
    "floor": 12,
    "decay": 0.92
  },
  "reseau": 7500,
  "plancher": 7500,
  "emission": {
    "reserve": 200000000,
    "tauxMensuel": 0.02
  },
  "tribut": {
    "bonus": 0.2
  },
  "entretien": [
    {
      "good": "emberwood",
      "rate": 40,
      "fromStrike": 0,
      "why": "the fire that drives the shaft"
    },
    {
      "good": "stone",
      "rate": 70,
      "fromStrike": 150,
      "why": "roads chewed up by the hauling"
    },
    {
      "good": "plank",
      "rate": 14,
      "fromStrike": 150,
      "why": "shoring, as the shaft goes deeper"
    },
    {
      "good": "iron_ingot",
      "rate": 8,
      "fromStrike": 400,
      "why": "tools worn out at the face"
    },
    {
      "good": "copper_ingot",
      "rate": 6,
      "fromStrike": 400,
      "why": "pipes for the pumps — the shaft floods"
    },
    {
      "good": "coin",
      "rate": 5,
      "fromStrike": 800,
      "why": "wages for the crew"
    }
  ]
};
