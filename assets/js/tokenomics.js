/* ⚠ FICHIER GÉNÉRÉ — ne pas éditer à la main.
 * Produit par prototype/tools/exporter-tokenomics.ts, qui IMPORTE prototype/src/config.ts.
 * Les chiffres ci-dessous sont donc exactement ceux que le jeu applique, pas une recopie.
 * Régénérer après tout changement d'émission ou du rig.
 */
window.CAIRN_TOKENOMICS = {
  "genere": "2026-08-08",
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
  "emission": {
    "reserve": 200000000,
    "tauxMensuel": 0.02
  },
  "tribut": {
    "bonus": 0.2
  }
};
