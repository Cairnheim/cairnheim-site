/* Cairnheim — comportements du site. Aucun framework, aucune dépendance externe. */

// ---------------------------------------------------------------------------
// URL DU PROTOTYPE JOUABLE — l'unique endroit à modifier après le déploiement.
// Tant qu'elle est vide, tous les boutons « Play » passent en « bientôt » et
// deviennent inertes : jamais de lien mort sur la page.
// ---------------------------------------------------------------------------
const PLAY_URL = '';

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
