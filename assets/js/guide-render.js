/* Rendu du guide. Aucune donnee en dur ici : tout vient de guide.js, genere depuis config.ts.
 *
 * ⚠️ CE CODE ETAIT INLINE DANS guide.html, ET IL NE S'EXECUTAIT PAS EN PRODUCTION. La CSP du site
 * (vercel.json) pose `script-src 'self'`, qui interdit tout script inline : en local, servi par un
 * simple http.server sans en-tetes, la page marchait ; en ligne elle affichait « Loading the
 * chain… » pour toujours. Un bug invisible partout sauf la ou il compte.
 *
 * Ne PAS le reinserer dans la page. La directive reste stricte a dessein — c'est celle qui protege
 * vraiment — et un fichier externe la satisfait sans l'affaiblir.
 */
/* Rendu du guide. Aucune donnée en dur ici : tout vient de guide.js, généré depuis config.ts. */
(function () {
  const G = window.CAIRN_GUIDE;
  const root = document.getElementById('gd-guide');
  if (!G) { root.innerHTML = '<p class="muted">Guide unavailable.</p>'; return; }

  const nom = (g) => g.replace(/_/g, ' ');
  const recompense = (r) => {
    const mats = r.materiaux ? Object.entries(r.materiaux).map(([g, n]) => `${n} ${nom(g)}`).join(', ') : null;
    return mats ? `${mats} &nbsp;or&nbsp; ${r.pieces} coins` : `${r.pieces} coins`;
  };

  let n = 0;
  root.innerHTML = G.actes.map((a) => `
    <section class="gd-act">
      <h2>${a.titre}</h2>
      <p class="gd-sub">${a.sous}</p>
      ${a.quetes.map((q) => {
        n++;
        return `<article class="gd-q" id="q-${q.id}">
          <div class="gd-q-head">
            <span class="gd-n">${n}</span>
            <h3>${q.titre}</h3>
            <span class="gd-reward">🏆 ${recompense(q.recompense)}</span>
          </div>
          <p>${q.aide}</p>
        </article>`;
      }).join('')}
    </section>`).join('');

  const e = G.expedition;
  const nf = (x) => x.toLocaleString('en-US');
  const eveil = Object.entries(e.eveilCout).map(([g, q]) => `${q} ${nom(g)}`).join(' + ');
  document.getElementById('gd-exp').innerHTML = `
    <div class="gd-facts">
      <div class="gd-fact"><b>${e.campsIle}</b><span>camps hold each isle. Nothing is mined until the last one falls.</span></div>
      <div class="gd-fact"><b>${e.veines}</b><span>veins per isle — one mine each, so a fifth kit stays in the hold.</span></div>
      <div class="gd-fact"><b>${nf(e.minerParIle)}</b><span>ore on an isle, in total. It runs out; the isle is not a rent.</span></div>
      <div class="gd-fact"><b>${e.secondesParUnite}s</b><span>per unit, per mine. It keeps running with the tab closed.</span></div>
      <div class="gd-fact"><b>${e.minutesParRation} min</b><span>bought by one ration — your clock on the isle.</span></div>
      <div class="gd-fact"><b>${e.renfortsParRation}</b><span>reinforcements per ration, if the fighting goes badly.</span></div>
    </div>

    <h3>The loop, in order</h3>
    <ol>
      <li><strong>Build the Explorer hut</strong>, then hire a scout — he costs
        ${e.explorateurCout.longuesVues} spyglasses and ${e.explorateurCout.pieces} coins.</li>
      <li><strong>Send him scouting.</strong> ${e.rationsRecherche} rations, ${e.minutesRecherche} real
        minutes. It finishes with the tab closed, so send him and go do something else. He returns with
        a chart to one of the two isles — and your <em>second</em> chart is always the other one, so
        you can never be stranded on the same island twice.</li>
      <li><strong>Load the expedition.</strong> A general with troops, plus the hold: mine kits and
        rations. The dispatch panel tells you what that load will bring home <em>before</em> you sail.</li>
      <li><strong>Land, camp, clear.</strong> Place your beachhead on open ground, then take the
        ${e.campsIle} camps. Rations do not burn while you fight — the countdown starts when the isle
        is secured.</li>
      <li><strong>Raise mines and fill the hold</strong>, then recall. What is in the hold sails home;
        what is not, does not.</li>
    </ol>

    <h3>What a load actually brings home</h3>
    <p>The panel shows this figure live while you set your load. It is not an estimate — it is the
      formula the game runs:</p>
    <div class="gd-formula">haul = ${e.formuleRecolte}</div>
    <p>So one kit and one ration bring back ${nf(e.minutesParRation * 60 / e.secondesParUnite)} ore;
      four kits and two rations bring the isle's whole ${nf(e.minerParIle)}. Kits multiply the rate,
      rations multiply the time — and the awakening needs <strong>${eveil}</strong>, which is why the
      voyage is made twice.</p>

    <p class="muted small">Reference: gold buys you ${G.reperes.generauxOr} generals and no more; a
      colonist is recruited for ${G.reperes.colonPieces} coins.</p>`;

  /* ---- La guerre. Aucun chiffre en dur : G.militaire vient de config.ts. ---- */
  const m = G.militaire;
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const REALMS = Object.keys(m.factions);
  const ligneEnnemi = (e) => `
    <tr>
      <td>${e.pastille} <b>${e.noms.mainland}</b><br>
        <span class="muted small">${REALMS.filter((r) => r !== 'mainland')
          .map((r) => `${cap(r)} isle: ${e.noms[r]}`).join(' · ')}</span></td>
      <td class="num">${e.att.toFixed(2)}</td>
      <td class="num">${e.pv}</td>
      <td>${e.contre}</td>
    </tr>`;
  const g = m.garnisons;
  document.getElementById('gd-war').innerHTML = `
    <h3>Your three troops</h3>
    <p>Weight is attack × hit points, but an army's real strength is
      <strong>N × √(attack × hit points)</strong> — volleys land simultaneously, so numbers count for
      more than quality. That is why a cheap archer line is not a mistake.</p>
    <div class="gd-table-wrap"><table class="gd-table">
      <thead><tr><th>Troop</th><th class="num">Atk</th><th class="num">HP</th>
        <th class="num">Power</th><th>Colour</th></tr></thead>
      <tbody>${m.troupes.map((t) => `<tr><td><b>${cap(t.nom)}</b></td>
        <td class="num">${t.att}</td><td class="num">${t.pv}</td>
        <td class="num">${t.puissance.toFixed(2)}</td><td>${t.couleur}</td></tr>`).join('')}</tbody>
    </table></div>
    <p class="muted small">A general leads up to ${m.plafondGeneral.basique} troops, or
      ${m.plafondGeneral.premium} once promoted.</p>

    <h3>The four enemies</h3>
    <p>All of them have <strong>1 hit point</strong> — that is deliberate, so "garrison 26" always
      means twenty-six blows to land and you can size up a fight at a glance. What differs is how
      hard they hit back. The same four archetypes guard every place in the game; only their name
      changes with the ground they hold.</p>
    <div class="gd-table-wrap"><table class="gd-table">
      <thead><tr><th>Enemy</th><th class="num">Atk</th><th class="num">HP</th><th>Weak to</th></tr></thead>
      <tbody>${m.ennemis.map(ligneEnnemi).join('')}</tbody>
    </table></div>
    <p>Colour beats colour in a triangle: a favourable match-up hits for
      <strong>×${m.avantage}</strong>, an unfavourable one for <strong>×${m.desavantage}</strong>.
      Marauders sit outside the triangle entirely — no weakness, no advantage, and they hit above
      the average. Each round, ${Math.round(m.front * 100)}% of both sides' power lands.</p>

    <h3>How big the garrisons get</h3>
    <p>Camps on the mainland are a school. The isles are not: each tier is sized to refuse the army
      that cleared the tier below it, so a voyage is never a formality and never a wall.</p>
    <div class="gd-facts">
      <div class="gd-fact"><b>${g.carteMere.min}–${g.carteMere.max}</b><span>mainland camp — where you learn the colour triangle.</span></div>
      <div class="gd-fact"><b>${g.ile1.min}–${g.ile1.max}</b><span>tier 1 isle. A full basic general, and it still costs you.</span></div>
      <div class="gd-fact"><b>${g.ile2.min}–${g.ile2.max}</b><span>tier 2 isle. The army that took tier 1 does not pass.</span></div>
      <div class="gd-fact"><b>${g.ile3.min}–${g.ile3.max}</b><span>tier 3 isle. A promoted general, at full strength.</span></div>
    </div>
    <p class="muted small">Three camps hold each isle, so the cost above is paid three times over
      before a single unit of ore is mined.</p>`;

  document.getElementById('gd-stamp').textContent =
    `Generated from the game's own balance file on ${G.genere}. ${n} objectives.`;
})();
