/* ⚠ FICHIER GÉNÉRÉ — ne pas éditer à la main.
 * Produit par prototype/tools/exporter-guide.ts, qui IMPORTE prototype/src/config.ts.
 * Les explications ci-dessous sont donc MOT POUR MOT celles que le jeu montre au joueur.
 * Régénérer après tout changement de la chaîne de quêtes ou de la boucle d'expédition.
 */
window.CAIRN_GUIDE = {
  "genere": "2026-08-10",
  "actes": [
    {
      "titre": "Act I — Take root",
      "sous": "Wood, planks, homes, mouths to feed.",
      "quetes": [
        {
          "id": "logs",
          "titre": "Chop 50 logs",
          "cible": 50,
          "aide": "Place a Woodcutter (Resources menu) with trees inside his work radius, then draw a road from your castle to his door. Nothing in Cairnheim moves on its own — every good is carried by hand along the roads you draw. Add a Forester beside him and the woods never run out.",
          "recompense": {
            "pieces": 15,
            "materiaux": {
              "axe": 1,
              "pickaxe": 1
            }
          }
        },
        {
          "id": "planks",
          "titre": "Saw 30 planks",
          "cible": 30,
          "aide": "Logs build nothing on their own. Raise a Sawmill (Processing) and connect it to the road network — carriers will bring the logs to its door by themselves. Planks are the backbone of the game: nearly every building costs them.",
          "recompense": {
            "pieces": 20,
            "materiaux": {
              "scythe": 1,
              "iron_ingot": 4
            }
          }
        },
        {
          "id": "houses",
          "titre": "Build 3 houses",
          "cible": 3,
          "aide": "Houses (Housing) shelter colonists, and colonists are what staff your workshops — a building with nobody in it produces nothing. Keep them close to your castle, and keep food coming: each home feeds its own occupants from its own stock.",
          "recompense": {
            "pieces": 25,
            "materiaux": {
              "scythe": 1,
              "rod": 1
            }
          }
        },
        {
          "id": "pop",
          "titre": "Grow to 15 colonists",
          "cible": 15,
          "aide": "Colonists can be recruited at the castle for coins. Whatever you do, keep them fed — bread, fish or meat all count. A hungry colony does not just stop growing, it slows every workshop you own.",
          "recompense": {
            "pieces": 30,
            "materiaux": {
              "cleaver": 1
            }
          }
        }
      ]
    },
    {
      "titre": "Act II — The old shaft",
      "sous": "Reach the ruin, then open it.",
      "quetes": [
        {
          "id": "link",
          "titre": "Connect the old shaft to your roads",
          "cible": 1,
          "aide": "The ruin on the hill is a building like any other: not one stone reaches it until a road does. Draw cairns from your network up to its door. This is the step players stumble on — the shaft looks ready long before it is reachable.",
          "recompense": {
            "pieces": 20,
            "materiaux": {
              "stone": 30,
              "plank": 30
            }
          }
        },
        {
          "id": "shaft",
          "titre": "Clear the ancient shaft",
          "cible": 1,
          "aide": "Click the Cairn Mine and pay the first stage: 30 stone and 30 planks — exactly what the last quest paid you. From that moment the shaft yields CAIRN, a trickle at first. It never stops, and it keeps running while you are away.",
          "recompense": {
            "pieces": 40,
            "materiaux": null
          }
        }
      ]
    },
    {
      "titre": "Act III — Forge and arms",
      "sous": "The gold chain, and the first soldiers.",
      "quetes": [
        {
          "id": "coins",
          "titre": "Mint 20 coins",
          "cible": 20,
          "aide": "The longest chain in the game: Gold mine → Gold smelter → Mint (Processing). It is slow on purpose — the Mint alone takes 41 ticks per coin. Coins recruit colonists and generals, raise comfort buildings, and go into every travel ration. And as your colony spreads out, watch the roads: goods flow to the NEAREST storage, so a Warehouse (Logistics) beside a distant cluster keeps its surplus local instead of queuing across the whole map. Cairns backing up is the sign you need one.",
          "recompense": {
            "pieces": 60,
            "materiaux": null
          }
        },
        {
          "id": "army",
          "titre": "Train 5 soldiers",
          "cible": 5,
          "aide": "A Training camp (Military) turns one FREE colonist plus a full kit of equipment into a soldier. The kit comes from the Weaponsmith and the Fletcher — so those must be running first. Three troop types exist, and each one beats another: an army of one kind will lose to the right answer.",
          "recompense": {
            "pieces": 80,
            "materiaux": null
          }
        }
      ]
    },
    {
      "titre": "Act IV — Staff officers",
      "sous": "Soldiers are not an army.",
      "quetes": [
        {
          "id": "school",
          "titre": "Build the Military school",
          "cible": 1,
          "aide": "Trained soldiers cannot leave the colony by themselves — they need someone to lead them. The Military school (Military) is where officers are found. Build it now; you recruit in the next step.",
          "recompense": {
            "pieces": 40,
            "materiaux": null
          }
        },
        {
          "id": "general",
          "titre": "Recruit your first general",
          "cible": 1,
          "aide": "Open the Military school and recruit. Gold buys you TWO generals and no more — the ones that come after are paid for differently. Then go to Inventory ▸ Generals and load troops onto him: an empty general is a man on a horse, nothing else.",
          "recompense": {
            "pieces": 60,
            "materiaux": null
          }
        }
      ]
    },
    {
      "titre": "Act V — Beyond the coast",
      "sous": "Drive out the raiders, then go and look.",
      "quetes": [
        {
          "id": "camps",
          "titre": "Drive out the bandit camps",
          "cible": 2,
          "aide": "Select your loaded general, then click a camp. Read its colours first: each troop type beats one and loses to another, and numbers alone have buried better armies. A defeat costs you the troops you sent but wounds the camp too — you can bleed it over several assaults. The loot is half of everything the shaft will later ask for.",
          "recompense": {
            "pieces": 150,
            "materiaux": {
              "plank": 30,
              "stone": 20,
              "copper_ingot": 25
            }
          }
        },
        {
          "id": "hut",
          "titre": "Build the Explorer hut",
          "cible": 1,
          "aide": "The Explorer hut (Expedition menu) is where scouts are hired. Building it finds nothing by itself — it is the door, not the journey.",
          "recompense": {
            "pieces": 60,
            "materiaux": {
              "copper_ingot": 25
            }
          }
        },
        {
          "id": "glass",
          "titre": "Forge 25 spyglasses",
          "cible": 25,
          "aide": "Spyglasses are forged from copper and glass. They are not equipment you keep: an explorer takes 25 of them with him as his fee when you hire him. This is why the copper chain exists.",
          "recompense": {
            "pieces": 80,
            "materiaux": {
              "plank": 40,
              "iron_ingot": 40
            }
          }
        },
        {
          "id": "explorer",
          "titre": "Recruit an explorer",
          "cible": 1,
          "aide": "Open the Explorer hut and hire. It costs spyglasses AND coins — nobody walks off the edge of the map on goodwill. Hiring him is not the same as sending him: that is the next step.",
          "recompense": {
            "pieces": 80,
            "materiaux": {
              "plank": 25,
              "stone": 15
            }
          }
        },
        {
          "id": "chart",
          "titre": "Bring back a chart",
          "cible": 1,
          "aide": "Go to Inventory ▸ Explorers and send him scouting. It costs rations and takes 30 REAL minutes — the search finishes even with the tab closed, so send him and go do something else. He returns with a chart to one of the two isles. Your second chart is always the other one, so you are never stuck on the same island twice.",
          "recompense": {
            "pieces": 90,
            "materiaux": {
              "plank": 30,
              "stone": 20
            }
          }
        },
        {
          "id": "marble",
          "titre": "Bring home 100 marble",
          "cible": 100,
          "aide": "Inventory ▸ Maps, click your chart. Load a general with troops, then load the HOLD: mine kits raise mines over there, rations are your clock — one buys 30 minutes on the isle, and the countdown only starts once every camp has fallen. The panel shows exactly what your load will bring home BEFORE you sail; read that line, it saves you a second voyage. Then clear the three camps, raise a mine on a vein, and recall when the hold is full.",
          "recompense": {
            "pieces": 100,
            "materiaux": {
              "plank": 40,
              "iron_ingot": 40
            }
          }
        },
        {
          "id": "plat",
          "titre": "Bring home 100 platinum",
          "cible": 100,
          "aide": "Same voyage, other isle — and it is held just as firmly. An isle holds 300 ore in all, so one successful expedition covers this and more. Kits matter more than you think: four mines fill the hold four times faster than one.",
          "recompense": {
            "pieces": 120,
            "materiaux": null
          }
        }
      ]
    },
    {
      "titre": "Act VI — The awakening",
      "sous": "What everything before it was for.",
      "quetes": [
        {
          "id": "awaken",
          "titre": "Awaken the Cairn Mine",
          "cible": 2,
          "aide": "Open the Cairn Mine and pay the last stage: 200 marble and 200 platinum. Everything before this was preparation. Once awake, the shaft yields eleven times what it did — and from there the real economy begins: picks to raise your Strike, diamonds and comfort to lower what it burns.",
          "recompense": {
            "pieces": 200,
            "materiaux": null
          }
        }
      ]
    }
  ],
  "expedition": {
    "campsCarteMere": 2,
    "campsIle": 3,
    "veines": 4,
    "minerParIle": 300,
    "secondesParUnite": 30,
    "minutesParRation": 30,
    "renfortsParRation": 5,
    "rationsRecherche": 6,
    "minutesRecherche": 30,
    "explorateurCout": {
      "longuesVues": 25,
      "pieces": 40
    },
    "iles": {
      "marble": "Marble Isle",
      "platinum": "Platinum Isle"
    },
    "eveilCout": {
      "marble": 200,
      "platinum": 200
    },
    "formuleRecolte": "min(kits × rations × 60, 300)"
  },
  "reperes": {
    "generauxOr": 2,
    "colonPieces": 8
  }
};
