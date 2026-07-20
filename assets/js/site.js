/* Cairnheim — comportements du site. Aucun framework, aucune dépendance externe. */

// ---------------------------------------------------------------------------
// URL DU PROTOTYPE JOUABLE — l'unique endroit à modifier après le déploiement.
// Tant qu'elle est vide, tous les boutons « Play » passent en « bientôt » et
// deviennent inertes : jamais de lien mort sur la page.
// ---------------------------------------------------------------------------
const PLAY_URL = '';

(function play() {
  document.querySelectorAll('[data-play]').forEach((a) => {
    if (PLAY_URL) {
      a.href = PLAY_URL;
      a.target = '_blank';
      a.rel = 'noopener';
      return;
    }
    a.href = '#roadmap';
    a.setAttribute('aria-disabled', 'true');
    a.title = 'The playable build is not online yet.';
    const label = a.querySelector('[data-play-label]') || a;
    label.textContent = a.dataset.play === 'short' ? 'Coming soon' : 'Playable build coming soon';
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
