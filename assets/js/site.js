/* Cairnheim — comportements du site. Aucun framework, aucune dépendance externe. */

// ---------------------------------------------------------------------------
// URL DU PROTOTYPE JOUABLE — l'unique endroit à modifier après le déploiement.
// Tant qu'elle est vide, tous les boutons « Play » passent en « bientôt » et
// deviennent inertes : jamais de lien mort sur la page.
// ---------------------------------------------------------------------------
const PLAY_URL = 'https://cairnheim.vercel.app';

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
  whitepaper: '', // ⚠ voir docs : le §6.1 décrit encore l'ancien modèle de pioches
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

  el.innerHTML = `
    <div class="calc-in">
      <label>Your shaft
        <select id="c-stage">${paliers}</select></label>
      <label>Picks set
        <input id="c-picks" type="number" min="0" max="10000" step="1" value="100"></label>
      <label>Network Strike <small id="c-netv"></small>
        <!-- pas de 500 et non 1000 : un curseur cale ses valeurs sur min + n×pas, et avec un pas de
             1000 depuis 1000 la valeur du jeu (7 500) était silencieusement arrondie à 8 000 —
             la page affichait alors une part fausse dès son ouverture. -->
        <input id="c-net" type="range" min="500" max="200000" step="500" value="${T.reseau}"></label>
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
    const reseau = Math.max(1, +q('#c-net').value);
    q('#c-netv').textContent = nf(reseau);

    const strike = palier.strike + picks * T.pick.strike;
    // La part se calcule sur le réseau TOTAL, la sienne comprise : grossir dilue aussi sa propre
    // part. C'est la règle du moteur, et l'oublier surestimerait le rendement des gros rigs.
    const part = strike > 0 ? strike / (reseau + strike) : 0;
    const mois = T.emission.reserve * T.emission.tauxMensuel; // 2 % de la réserve restante
    const parMois = part * mois;
    const parJour = parMois / 30;
    const cout = picks * T.pick.cost;

    q('#o-strike').textContent = nf(strike);
    q('#o-share').textContent = (100 * part).toFixed(3) + ' %';
    q('#o-day').textContent = nf(parJour, parJour < 10 ? 2 : 0);
    q('#o-month').textContent = nf(parMois, 0);
    q('#o-cost').textContent = nf(cout);
    q('#o-back').textContent = cout === 0 ? '—' : (parJour > 0 ? nf(cout / parJour, 1) + ' days' : 'never');

    q('#c-note').innerHTML = `Emission is <b>${(100 * T.emission.tauxMensuel).toFixed(0)} %</b> of the remaining `
      + `reserve each month — ${nf(T.emission.reserve)} CAIRN at launch, so <b>${nf(mois)}</b> shared `
      + `between every miner this month. It shrinks as the reserve is drawn down, and it never depends on how `
      + `many players there are: more Strike on the network simply means thinner slices. A pick costs `
      + `<b>${T.pick.cost}</b> CAIRN and adds <b>${T.pick.strike}</b> Strike. Running picks burns coal — `
      + `<b>${T.thrift.start}</b> per hundred strikes at first, down to a floor of <b>${T.thrift.floor}</b>. `
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
