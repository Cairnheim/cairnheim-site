# Cairnheim — site vitrine

Site statique : landing (`index.html`) + documentation (`docs.html`). **Aucune dépendance, aucun
build** — trois fichiers HTML/CSS/JS et des images. On l'ouvre tel quel, on le déploie tel quel.

```
site/
├── index.html          landing
├── docs.html           documentation (sommaire collant + 15 sections)
├── vercel.json         en-têtes de sécurité + cache
└── assets/
    ├── css/style.css
    ├── js/site.js
    └── img/            captures de jeu (webp) + sprites détourés
```

## Lancer en local

```bash
cd site
python -m http.server 5178      # puis http://localhost:5178
```

## Déployer (Vercel, gratuit)

Projet **séparé** de `prototype/` : le site et le jeu se déploient indépendamment.

```bash
cd site
npx vercel        # Framework preset : « Other » — pas de build, pas de output directory
```

## ⚠️ Le bouton « Play »

Le prototype n'étant pas encore en ligne, **tous les boutons Play affichent « coming soon » et ne
mènent nulle part** (plutôt qu'un lien mort). Pour les activer, une seule ligne à changer, en tête de
`assets/js/site.js` :

```js
const PLAY_URL = 'https://…';   // URL du prototype déployé
```

Les boutons deviennent alors des liens normaux (nouvel onglet), sans autre modification.

## Contenu de la doc

Les chiffres viennent de `prototype/src/specs.ts` et `prototype/src/config.ts` (coûts, recettes,
cadences, priorités de distribution, seuils de population). **Si l'équilibrage bouge, la doc ment** —
les endroits à reprendre sont les tables des sections `#chains`, `#buildings`, `#decorations` et
`#world`.

## Régénérer les captures

Elles ont été prises depuis le jeu lui-même : rendu Pixi forcé hors écran, `toDataURL`, envoi à un
petit serveur d'écriture local. Recette : ouvrir le jeu en dev, puis dans la console

```js
const g = window.game, a = g.app;
a.renderer.resize(1600, 900);      // le canvas fait 0×0 tant que l'onglet est masqué
g.world.scale.set(0.95); g.centerOn(78, 80);
a.render();
(a.canvas || a.view).toDataURL('image/png');   // → à enregistrer
```

Avant la prise : masquer les pastilles d'état (`b.gfx.children` de type `Text` → `visible = false`),
sinon les ⛔/⏳ parasitent l'image.
