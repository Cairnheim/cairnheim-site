/* Cairnheim — comportements du site. Aucun framework, aucune dépendance externe. */

// ---------------------------------------------------------------------------
// URL DU PROTOTYPE JOUABLE — l'unique endroit à modifier après le déploiement.
// Tant qu'elle est vide, tous les boutons « Play » passent en « bientôt » et
// deviennent inertes : jamais de lien mort sur la page.
// ---------------------------------------------------------------------------
// Domaine propre depuis le 16/08. On garde `cairnheim.vercel.app` en service — Vercel le sert
// toujours — mais un lien qu'on donne doit porter le nom du projet, pas celui de l'hébergeur :
// c'est ce nom-là que les gens recopient, épinglent et reconnaissent.
const PLAY_URL = 'https://play.cairnheim.com';

// ---------------------------------------------------------------------------
// LIENS COMMUNAUTÉ — même règle que PLAY_URL : une entrée VIDE n'est pas rendue.
// C'est délibéré. Un site vitrine dont l'icône Discord mène à une 404 coûte plus
// cher en crédibilité que l'absence d'icône ; et personne ne peut deviner une
// URL à ma place. Remplis ce que tu as, laisse le reste vide.
// ---------------------------------------------------------------------------
const LINKS = {
  x: '',          // ex. 'https://x.com/cairnheim'
  discord: '',    // ex. 'https://discord.gg/xxxx'
  telegram: '',   // ex. 'https://t.me/cairnheim'
  github: '',     // dépôt public du site, si tu veux le montrer
  whitepaper: '', // le §6.1 est à jour depuis le 15/08 (pioche fongible, emberwood) — reste à héberger le PDF
};

const LINK_META = {
  x: { label: 'X', glyph: '𝕏' },
  discord: { label: 'Discord', glyph: '💬' },
  telegram: { label: 'Telegram', glyph: '✈️' },
  github: { label: 'Source', glyph: '⌥' },
  whitepaper: { label: 'Whitepaper', glyph: '📄' },
};

(function liens() {
  const hotes = document.querySelectorAll('[data-links]');
  if (!hotes.length) return;
  const actifs = Object.entries(LINKS).filter(([, url]) => url && url.trim());
  for (const hote of hotes) {
    if (!actifs.length) { hote.remove(); continue; } // aucun lien : pas de bloc vide
    hote.innerHTML = actifs.map(([cle, url]) => {
      const m = LINK_META[cle] || { label: cle, glyph: '↗' };
      return `<a class="lnk" href="${url}" target="_blank" rel="noopener">`
        + `<span aria-hidden="true">${m.glyph}</span> ${m.label}</a>`;
    }).join('');
  }
})();

// Le HTML annonce « coming soon » PAR DÉFAUT, et ce script ACTIVE le lien quand l'URL existe.
// Le sens de la bascule compte : tout ce qui n'exécute pas JS — robots d'indexation, aperçus de
// liens sur les réseaux, lecteurs simplifiés — ne voit que le HTML. S'il y était écrit « Play the
// prototype », ces surfaces annonceraient un jeu jouable qui ne l'est pas encore.
(function play() {
  if (!PLAY_URL) return;
  document.querySelectorAll('[data-play]').forEach((a) => {
    a.href = PLAY_URL;
    a.target = '_blank';
    a.rel = 'noopener';
    a.removeAttribute('aria-disabled');
    a.removeAttribute('title');
    const label = a.querySelector('[data-play-label]') || a;
    label.textContent = a.dataset.play === 'short' ? 'Play' : 'Play the prototype';
  });
})();

// ---------------------------------------------------------------------------
// CALCULATEUR DE PIOCHE. Les constantes viennent de tokenomics.js, lui-même
// GÉNÉRÉ depuis le config.ts du jeu : ce que la page affiche est ce que le
// moteur applique, pas une recopie qui se périmerait au premier rééquilibrage.
// ---------------------------------------------------------------------------
(function calc() {
  const el = document.querySelector('#calc-rig');
  const T = window.CAIRN_TOKENOMICS;
  if (!el) return;
  if (!T) { el.innerHTML = '<p class="muted small">Figures unavailable.</p>'; return; }

  const nf = (n, d = 0) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
  const paliers = T.paliers.map((p, i) => `<option value="${i}"${i === T.paliers.length - 1 ? ' selected' : ''}>${p.label} — Strike ${p.strike}</option>`).join('');

  // Bornes de l'échelle logarithmique du réseau : d'une poignée de mineurs à ~127 000 joueurs
  // équipés du rig de référence. Le haut de la plage est le seul endroit où l'on VOIT le rendement
  // individuel s'effondrer — c'est le fait central du modèle, il ne doit pas rester hors du curseur.
  const NET_MIN = 500, NET_MAX = 20000000;
  // Arrondi à deux chiffres significatifs : un curseur qui affiche « 7 483 » se lit comme une
  // précision qu'il n'a pas, et rend le repère du jeu (7 500) impossible à retrouver à l'œil.
  const deuxSignif = (n) => { const p = Math.pow(10, Math.floor(Math.log10(n)) - 1); return Math.round(n / p) * p; };
  const netDepuisCurseur = (v) => deuxSignif(NET_MIN * Math.pow(NET_MAX / NET_MIN, v / 1000));

  el.innerHTML = `
    <div class="calc-in">
      <label>Your shaft
        <select id="c-stage">${paliers}</select></label>
      <label>Picks set
        <input id="c-picks" type="number" min="0" max="10000" step="1" value="100"></label>
      <label>Network Strike <small id="c-netv"></small>
        <!-- ÉCHELLE LOGARITHMIQUE. En linéaire il fallait choisir entre atteindre un vrai réseau
             et pouvoir viser 7 500 : à pas constant, un maximum de 200 000 plafonnait la page à
             ~1 270 joueurs — soit précisément en dessous du point où le rendement s'effondre, la
             chose que ce calculateur existe pour montrer. Le curseur porte donc l'EXPOSANT, ce qui
             donne de la finesse en bas et de la portée en haut. -->
        <input id="c-net" type="range" min="0" max="1000" step="1" value="${Math.round(1000 * Math.log(T.reseau / NET_MIN) / Math.log(NET_MAX / NET_MIN))}"></label>
    </div>
    <div class="calc-out">
      <div class="co"><b id="o-strike"></b><span>your Strike</span></div>
      <div class="co"><b id="o-share"></b><span>share of the network</span></div>
      <div class="co"><b id="o-day"></b><span>CAIRN / day</span></div>
      <div class="co"><b id="o-month"></b><span>CAIRN / month</span></div>
      <div class="co"><b id="o-cost"></b><span>CAIRN spent on picks</span></div>
      <div class="co"><b id="o-back"></b><span>to earn it back</span></div>
    </div>
    <p class="muted small" id="c-note"></p>`;

  const q = (id) => el.querySelector(id);
  const maj = () => {
    const palier = T.paliers[+q('#c-stage').value] || T.paliers[0];
    const picks = Math.max(0, Math.floor(+q('#c-picks').value || 0));
    const reseau = Math.max(1, netDepuisCurseur(+q('#c-net').value));
    const strike = palier.strike + picks * T.pick.strike;
    // On affiche AUSSI le réseau en joueurs : personne ne raisonne en points de Frappe, et c'est
    // le nombre de joueurs qui décide du partage. Base : d'autres mineurs équipés comme celui-ci.
    const pairs = strike > 0 ? Math.max(1, Math.round(reseau / strike)) : 0;
    q('#c-netv').textContent = `${nf(reseau)}${strike > 0 ? ` — about ${nf(pairs)} miner${pairs > 1 ? 's' : ''} like yours` : ''}`;

    // La part se calcule sur le réseau TOTAL, la sienne comprise : grossir dilue aussi sa propre
    // part. C'est la règle du moteur, et l'oublier surestimerait le rendement des gros rigs.
    // Le PLANCHER borne ce dénominateur, exactement comme `Game.networkStrike()` : sans lui, un
    // curseur descendu à 500 afficherait une part que le jeu ne verse jamais.
    const denom = Math.max(reseau + strike, T.plancher || 0);
    const plancherActif = denom > reseau + strike;
    const part = strike > 0 ? strike / denom : 0;
    const mois = T.emission.reserve * T.emission.tauxMensuel; // 2 % de la réserve restante
    const parMois = part * mois;
    const parJour = parMois / 30;
    const cout = picks * T.pick.cost;
    // LA FACTURE EN BIENS. Les seuils portent sur la Frappe AJOUTÉE (au-dessus du socle gratuit),
    // comme dans `Game.upkeepBasket()` — le socle, lui, ne consomme rien.
    const extra = Math.max(0, strike - (T.paliers[T.paliers.length - 1] || {}).strike);
    const panier = (T.entretien || [])
      .filter((u) => extra >= u.fromStrike)
      .map((u) => `${nf((extra / 100) * u.rate)} ${u.good.replace(/_/g, ' ')}`);

    q('#o-strike').textContent = nf(strike);
    q('#o-share').textContent = (100 * part).toFixed(3) + ' %';
    q('#o-day').textContent = nf(parJour, parJour < 10 ? 2 : 0);
    q('#o-month').textContent = nf(parMois, 0);
    q('#o-cost').textContent = nf(cout);
    // REMBOURSEMENT : seul le rendement IMPUTABLE AUX PIOCHES compte. Le socle gratuit rapporte de
    // toute façon, qu'on achète ou non — le porter au crédit de l'achat surestimait le retour d'un
    // facteur 1,57 au rig de référence (0,9 jour annoncé pour 1,4 réel).
    const partPioches = strike > 0 ? (picks * T.pick.strike) / strike : 0;
    const jourPioches = parJour * partPioches;
    q('#o-back').textContent = cout === 0 ? '—' : (jourPioches > 0 ? nf(cout / jourPioches, 1) + ' days' : 'never');

    q('#c-note').innerHTML = `Emission is <b>${(100 * T.emission.tauxMensuel).toFixed(0)} %</b> of the remaining `
      + `reserve each month — ${nf(T.emission.reserve)} CAIRN at launch, so <b>${nf(mois)}</b> shared `
      + `between every miner this month. It shrinks as the reserve is drawn down, and it never depends on how `
      + `many players there are: more Strike on the network simply means thinner slices. A pick costs `
      + `<b>${T.pick.cost}</b> CAIRN and adds <b>${T.pick.strike}</b> Strike.`
      + (plancherActif
        ? ` <b>The network floor applies here.</b> Shares are divided by at least <b>${nf(T.plancher)}</b> Strike, `
          + `however empty the network is — what nobody claims stays in the reserve for the players who come later. `
          + `That is why your share stops climbing below this point.`
        : '')
      + (panier.length
        ? ` <b>A pick is not paid once.</b> At this rig the shaft consumes <b>${panier.join(', ')}</b> every hour, `
          + `for as long as you run it — coal first, then stone and planks past 150 added Strike, ingots past 400, `
          + `wages past 800. That bill, not the price, is what limits a rig.`
        : '')
      + ` Thrift starts at <b>${T.thrift.start}</b> coal per hundred strikes and floors at <b>${T.thrift.floor}</b>. `
      + `Figures generated from the game's own balance file on ${T.genere}.`;
  };
  el.addEventListener('input', maj);
  maj();
})();

// Menu de navigation mobile
(function nav() {
  const btn = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') links.classList.remove('open');
  });
})();

// Sommaire de la documentation : surligne la section à l'écran.
// Écouteur de scroll et non IntersectionObserver : l'observer ne livre rien tant que le document
// n'est pas peint (onglet masqué, capture hors écran), donc l'état initial pouvait rester vide.
// Ici le calcul est direct et vrai dès le chargement — 16 sections, coût négligeable.
(function toc() {
  const links = [...document.querySelectorAll('.toc a[href^="#"]')];
  if (!links.length) return;

  const items = links
    .map((a) => ({ a, el: document.getElementById(a.getAttribute('href').slice(1)) }))
    .filter((it) => it.el);
  if (!items.length) return;

  let current = null;

  function update() {
    // Section active = la dernière dont le titre est passé sous la barre de navigation.
    const line = 100;
    let found = items[0];
    for (const it of items) {
      if (it.el.getBoundingClientRect().top <= line) found = it;
      else break;
    }
    if (found === current) return;
    current = found;
    links.forEach((a) => a.classList.toggle('active', a === found.a));
  }

  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();
})();
