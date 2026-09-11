/* Cairnheim — comportements du site. Aucun framework, aucune dépendance externe. */

// ---------------------------------------------------------------------------
// PIVOT STEAM : plus de lien « Play » vers le jeu web (version crypto, gate wallet). Le site est
// désormais une vitrine de jeu qui pointe vers Steam. Tant que cette URL est vide, tous les boutons
// « data-play » restent inertes — mais les pages n'en ont plus : elles affichent des CTA
// « Coming to Steam » en dur. On garde le mécanisme au cas où une URL Steam publique arrive.
// ---------------------------------------------------------------------------
const PLAY_URL = '';

// ---------------------------------------------------------------------------
// LIENS COMMUNAUTÉ — une entrée VIDE n'est pas rendue. C'est délibéré : une icône qui mène à une 404
// coûte plus cher en crédibilité que son absence. Remplis ce que tu as, laisse le reste vide.
// ---------------------------------------------------------------------------
const LINKS = {
  x: 'https://x.com/Cairnheim',   // compte officiel du projet
  discord: '',    // ex. 'https://discord.gg/xxxx'
  telegram: '',   // ex. 'https://t.me/cairnheim'
  github: '',     // dépôt public du site, si tu veux le montrer
};

const LINK_META = {
  x: { label: 'X', glyph: '𝕏' },
  discord: { label: 'Discord', glyph: '💬' },
  telegram: { label: 'Telegram', glyph: '✈️' },
  github: { label: 'Source', glyph: '⌥' },
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

// Le HTML annonce « Coming to Steam » PAR DÉFAUT, et ce script ACTIVERAIT un lien « Play » si une URL
// existait. Le sens de la bascule compte : tout ce qui n'exécute pas JS — robots d'indexation, aperçus
// de liens — ne voit que le HTML. Tant que PLAY_URL est vide, rien ne bouge.
(function play() {
  if (!PLAY_URL) return;
  document.querySelectorAll('[data-play]').forEach((a) => {
    a.href = PLAY_URL;
    a.target = '_blank';
    a.rel = 'noopener';
    a.removeAttribute('aria-disabled');
    a.removeAttribute('title');
    const label = a.querySelector('[data-play-label]') || a;
    label.textContent = a.dataset.play === 'short' ? 'Play' : 'Play the game';
  });
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
// Ici le calcul est direct et vrai dès le chargement.
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
