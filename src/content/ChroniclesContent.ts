import { chapters, type ChapterMeta } from '../data/chapters';
import { getCharacter } from '../data/characters';
import { getLanguage } from '../data/languages';
import { getMachine } from '../data/machines';
import { getEvent } from '../data/events';
import { interactiveTimelineMarkup } from '../history/InteractiveTimeline';
import { comparisonMarkup } from '../interactions/LanguageComparison';
import { tr } from '../i18n';

export function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getSideLabel(era: string): string {
  return tr(`era.${era}`) || era;
}

/**
 * Hero Cinematográfico
 * - Título oversized con máscaras de revelación
 * - Floating peek window con previsualización
 * - Chips de navegación directa a capítulos en el pie
 */
export function heroMarkup(): string {
  return `
    <header class="hero hero-layout" id="hero" data-section="hero">
      <div class="diorama-monolith diorama-monolith--hero" aria-hidden="true">1843 → 2026</div>
      <div class="hero-top" data-reveal>
        <div class="eyebrow" data-rv><span class="dot"></span> ${tr('hero.eyebrow')}</div>
        <h1 class="display display--xl" data-rv>
          <span class="mask-line"><span>${tr('hero.line1')}</span></span>
          <span class="mask-line"><span>${tr('hero.line2')}</span></span>
          <span class="mask-line"><span>${tr('hero.line3')}</span></span>
        </h1>
        <p class="hero-sub body" data-rv>${tr('hero.sub')}</p>
      </div>

      <aside class="peek" data-rv="up">
        <a class="peek-fr" href="#ch-01-before-code" aria-label="${tr('hero.explore.ch1')}">
          <span class="peek-play" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="23" stroke="#dfe7e0" stroke-width="1.5"/><path d="m20 16 12 8-12 8V16z" fill="#dfe7e0"/></svg>
          </span>
        </a>
        <div class="peek-cap">
          <b>1843</b>
          <i>Ada Lovelace · Nota G</i>
        </div>
      </aside>

      <div class="hero-foot" data-reveal>
        <div class="hero-cue" data-rv>
          <span>${tr('hero.scroll')}</span>
          <span class="track"><i aria-hidden="true"></i></span>
        </div>
        <nav class="chapters-grid" data-rv="up" aria-label="${tr('hero.chapters.label')}">
          <a class="chip" href="#ch-01-before-code">
            <span class="num">01</span>
            <div class="tx">
              <b>${tr('ch.ch-01-before-code.title')}</b>
              <p>${tr('ct.hero.chip1')}</p>
            </div>
          </a>
          <a class="chip" href="#ch-02-machines">
            <span class="num">02</span>
            <div class="tx">
              <b>${tr('ch.ch-02-machines.title')}</b>
              <p>${tr('ct.hero.chip2')}</p>
            </div>
          </a>
          <a class="chip" href="#ch-04-languages">
            <span class="num">03</span>
            <div class="tx">
              <b>${tr('ch.ch-04-languages.title')}</b>
              <p>${tr('ct.hero.chip3')}</p>
            </div>
          </a>
          <a class="chip" href="#ch-05-systems">
            <span class="num">04</span>
            <div class="tx">
              <b>${tr('ch.ch-05-systems.title')}</b>
              <p>${tr('ct.hero.chip4')}</p>
            </div>
          </a>
        </nav>
      </div>
    </header>`;
}

/**
 * Renderiza un capítulo con el sistema editorial cinemático:
 * - Sec-head con índice mono, línea horizontal y época
 * - Gate-grid (titular masivo a la izquierda + texto editorial & arrowlink a la derecha)
 * - Gate-stats con 4 cifras clave de la era
 * - Cards-stagger (3 tarjetas con outline sutil, hover orgánico y metadatos)
 */
function chapterMarkup(ch: ChapterMeta): string {
  const char = getChapterCharacter(ch);
  const lang = getChapterLanguage(ch);
  const machine = getChapterMachine(ch);
  const event = getChapterEvent(ch);

  const arSvg = `<span class="card-ar" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" width="13" height="13"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg></span>`;

  // Construir las 3 tarjetas de la era
  const cardsHTML: string[] = [];

  if (char) {
    const prof = tr(`card.char.${char.id}.profession`, char.profession);
    const quote = char.quote ? tr(`card.char.${char.id}.quote`, char.quote) : '';
    cardsHTML.push(`
      <article class="card card--interactive" data-rv="up" data-discover="${char.id}" role="button" tabindex="0" aria-label="${esc(char.name)}">
        ${arSvg}
        <p class="eyebrow eyebrow--accent">${tr('ct.card.figure')}</p>
        <h3 class="display display--md">${esc(char.name)}</h3>
        <p class="meta">${esc(prof)} · ${esc(char.years)}</p>
        ${quote ? `<blockquote class="scene__quote"><p>“${esc(quote)}”</p></blockquote>` : ''}
        <div class="card-meta">
          <span>${esc(tr('ui.representation.' + char.representation, char.representation))}</span>
          <span class="card-read-cue">${tr('ui.explore')} ↗</span>
        </div>
      </article>`);
  }

  if (lang) {
    const context = tr(`card.lang.${lang.id}.context`, lang.historicalContext);
    const localizedParadigms = lang.paradigms
      .map((p) => tr('paradigm.' + p.toLowerCase().replace(/[^a-z0-9]/g, '_'), p))
      .join(' · ');
    cardsHTML.push(`
      <article class="card card--interactive" data-rv="up" data-discover="${lang.id}" role="button" tabindex="0" aria-label="${esc(lang.name)}">
        ${arSvg}
        <p class="eyebrow eyebrow--accent">${tr('ct.card.language')}</p>
        <h3 class="display display--md">${esc(lang.name)}</h3>
        <p class="meta">${esc(lang.creators.join(', '))} · ${lang.year}</p>
        <p class="body-text">${esc(context)}</p>
        <div class="card-meta">
          <span>${esc(localizedParadigms)}</span>
          <span class="card-read-cue">${tr('ui.explore')} ↗</span>
        </div>
      </article>`);
  }

  if (machine) {
    const desc = tr(`card.machine.${machine.id}.desc`, machine.description);
    cardsHTML.push(`
      <article class="card card--interactive" data-rv="up" data-discover="${machine.id}" role="button" tabindex="0" aria-label="${esc(machine.name)}">
        ${arSvg}
        <p class="eyebrow eyebrow--accent">${tr('ct.card.machine')}</p>
        <h3 class="display display--md">${esc(machine.name)}</h3>
        <p class="meta">${esc(machine.creator)} · ${machine.year}</p>
        <p class="body-text">${esc(desc)}</p>
        <div class="card-meta">
          <span>${tr('ct.card.tech')} · ${machine.year}</span>
          <span class="card-read-cue">${tr('ui.explore')} ↗</span>
        </div>
      </article>`);
  }

  if (event && cardsHTML.length < 3) {
    const title = tr(`card.event.${event.id}.title`, event.title);
    const desc = tr(`card.event.${event.id}.desc`, event.description);
    cardsHTML.push(`
      <article class="card card--interactive" data-rv="up" data-discover="${event.id}" role="button" tabindex="0" aria-label="${esc(title)}">
        ${arSvg}
        <p class="eyebrow eyebrow--accent">${tr('ct.card.event')}</p>
        <h3 class="display display--md">${esc(title)}</h3>
        <p class="meta">${event.year ?? ''}</p>
        <p class="body-text">${esc(desc)}</p>
        <div class="card-meta">
          <span>${tr('ct.card.milestone')} · ${event.year ?? '—'}</span>
          <span class="card-read-cue">${tr('ui.explore')} ↗</span>
        </div>
      </article>`);
  }

  // Franja de estadísticas específicas del capítulo
  const stats = chapterStats(ch);

  return `
    <section class="scene scene--diorama" id="${ch.id}" data-section="${ch.id}" data-era="${ch.era}">
      <div class="diorama-monolith" aria-hidden="true">${esc(ch.yearLabel)}</div>

      <div class="sec-head" data-rv>
        <span class="k"><b>${String(ch.number).padStart(2, '0')}</b> — ${esc(tr(`ch.${ch.id}.subtitle`))}</span>
        <span class="rule"></span>
        <span class="k">${esc(ch.yearLabel)} · ${esc(tr(`era.${ch.era}`))}</span>
      </div>

      <div class="diorama-layout">
        <div class="diorama-narrative" data-reveal>
          <h2 class="display display--lg" data-rv>${esc(tr(`ch.${ch.id}.tagline`))}</h2>
          <div class="gate-copy">
            <p class="lead" data-rv>${esc(tr(`ch.${ch.id}.summary`))}</p>
            <p class="body-text" data-rv>${chapterExtraNarrative(ch)}</p>
          </div>
          <div class="gate-stats" data-rv>
            ${stats.map((s) => `<div><b>${esc(s.val)}</b><span>${esc(tr(s.labelKey))}</span></div>`).join('')}
          </div>
        </div>

        ${
          cardsHTML.length > 0
            ? `
        <div class="diorama-stack" data-reveal>
          <span id="cards-${ch.id}" class="diorama-anchor" aria-hidden="true"></span>
          <div class="diorama-stack__glow" aria-hidden="true"></div>
          ${cardsHTML
            .map(
              (card, idx) =>
                `<div class="card-stack-item card-stack-item--${idx + 1}" style="--stack-idx: ${idx};">${card}</div>`,
            )
            .join('\n')}
        </div>`
            : ''
        }
      </div>
    </section>`;
}

/**
 * Sección especial de Banco Histórico (Código Bernoulli y Línea Temporal)
 */
function chapterWorkbenchMarkup(): string {
  return `
    <section class="scene scene--workbench" id="ch-01-workbench" data-section="ch-01-workbench" data-era="pre-code">
      <div class="diorama-monolith" aria-hidden="true">1843</div>
      <div class="sec-head" data-rv>
        <span class="k"><b>01.B</b> — ${esc(tr('wb.01.tag'))}</span>
        <span class="rule"></span>
        <span class="k">${esc(tr('wb.01.subtag'))}</span>
      </div>

      <div class="gate-grid" data-reveal>
        <div>
          <h3 class="display display--md" data-rv>${esc(tr('wb.01.head'))}</h3>
          <p class="body-text" data-rv>${esc(tr('wb.01.desc'))}</p>
          <div class="tcode" data-rv>
            <div class="tcode__bar">
              <span class="tcode__dots" aria-hidden="true"><i></i><i></i><i></i></span>
              <span class="tcode__file">bernoulli_note_g_1843.alg</span>
              <button class="tcode__copy" data-copy type="button" aria-label="${esc(tr('ui.copy_code_aria'))}">${esc(tr('ui.copy'))}</button>
            </div>
            <pre class="tcode__body" aria-label="bernoulli_note_g_1843.alg">
// ${esc(tr('wb.01.code.c1'))}
// ${esc(tr('wb.01.code.c2'))}
1.  V4  * V1  → V4     // ${esc(tr('wb.01.code.c3'))}
2.  V5  - V4  → V5     // ${esc(tr('wb.01.code.c4'))}
3.  V6  + 1   → V6     // ${esc(tr('wb.01.code.c5'))}
4.  B   ← V2 / 2       // ${esc(tr('wb.01.code.c6'))}
5.  ${esc(tr('wb.01.code.res'))} ← V3     // ${esc(tr('wb.01.code.c7'))}
            <span class="tcode__caret" aria-hidden="true"></span></pre>
          </div>
        </div>

        <div>
          <h3 class="display display--md" data-rv>${esc(tr('wb.01.timeline.head'))}</h3>
          <p class="body-text" data-rv>${esc(tr('wb.01.timeline.desc'))}</p>
          ${interactiveTimelineMarkup()}
        </div>
      </div>
    </section>`;
}

/**
 * Sección de Curriculum / Roadmap (.cur y .les con bar animado)
 */
function curriculumMilestonesMarkup(): string {
  return `
    <section class="scene scene--workbench" id="ch-curriculum" data-section="ch-curriculum" data-era="first-languages">
      <div class="diorama-monolith" aria-hidden="true">1957</div>
      <div class="sec-head" data-rv>
        <span class="k"><b>03.B</b> — ${esc(tr('wb.04.tag'))}</span>
        <span class="rule"></span>
        <span class="k">${esc(tr('wb.04.subtag'))}</span>
      </div>

      <div class="cur-head" data-reveal>
        <h2 class="display display--lg" data-rv>${esc(tr('wb.04.head'))}</h2>
        <div data-rv>
          <p class="lead">${esc(tr('wb.04.desc'))}</p>
        </div>
      </div>

      <div class="cur" data-reveal>
        <div class="les" data-rv="up">
          <span class="k">01</span>
          <div>
            <h3>Fortran <em>IBM</em></h3>
            <p>${esc(tr('wb.04.m1.desc'))}</p>
          </div>
          <p class="body-text">${esc(tr('wb.04.m1.note'))}</p>
          <span class="t">1957</span>
          <i class="bar" aria-hidden="true"></i>
        </div>

        <div class="les" data-rv="up">
          <span class="k">02</span>
          <div>
            <h3>Lisp <em>MIT</em></h3>
            <p>${esc(tr('wb.04.m2.desc'))}</p>
          </div>
          <p class="body-text">${esc(tr('wb.04.m2.note'))}</p>
          <span class="t">1958</span>
          <i class="bar" aria-hidden="true"></i>
        </div>

        <div class="les" data-rv="up">
          <span class="k">03</span>
          <div>
            <h3>COBOL &amp; Grace Hopper <em>US NAVY</em></h3>
            <p>${esc(tr('wb.04.m3.desc'))}</p>
          </div>
          <p class="body-text">${esc(tr('wb.04.m3.note'))}</p>
          <span class="t">1959</span>
          <i class="bar" aria-hidden="true"></i>
        </div>

        <div class="les" data-rv="up">
          <span class="k">04</span>
          <div>
            <h3>C &amp; Unix <em>BELL LABS</em></h3>
            <p>${esc(tr('wb.04.m4.desc'))}</p>
          </div>
          <p class="body-text">${esc(tr('wb.04.m4.note'))}</p>
          <span class="t">1972</span>
          <i class="bar" aria-hidden="true"></i>
        </div>

        <div class="les" data-rv="up">
          <span class="k">05</span>
          <div>
            <h3>Python &amp; La Era de la IA <em>GLOBAL</em></h3>
            <p>${esc(tr('wb.04.m5.desc'))}</p>
          </div>
          <p class="body-text">${esc(tr('wb.04.m5.note'))}</p>
          <span class="t">1991–2026</span>
          <i class="bar" aria-hidden="true"></i>
        </div>
      </div>

      <div class="gate-stats" data-rv>
        <div><b>1957</b><span>Nacimiento Fortran</span></div>
        <div><b>A-0</b><span>Primer Compilador</span></div>
        <div><b>COBOL</b><span>Banca Mundial</span></div>
        <div><b>λ-Cálculo</b><span>Esencia Lisp</span></div>
      </div>
    </section>`;
}

/**
 * Sección de Banco Comparativo Interactivo
 */
function comparisonWorkbenchMarkup(): string {
  return `
    <section class="scene scene--workbench" id="ch-comparison" data-section="ch-comparison" data-era="systems">
      <div class="diorama-monolith" aria-hidden="true">SYSTEMS</div>
      <div class="sec-head" data-rv>
        <span class="k"><b>04.B</b> — ${esc(tr('wb.comp.tag'))}</span>
        <span class="rule"></span>
        <span class="k">${esc(tr('wb.comp.subtag'))}</span>
      </div>

      <div class="gate-grid" data-reveal style="margin-bottom: clamp(24px, 4vh, 48px);">
        <h2 class="display display--md" data-rv>${esc(tr('wb.comp.head'))}</h2>
        <div class="gate-copy">
          <p class="lead" data-rv>${esc(tr('wb.comp.desc'))}</p>
        </div>
      </div>

      <div data-reveal>
        ${comparisonMarkup()}
      </div>
    </section>`;
}

export function epilogueMarkup(): string {
  return `
    <section class="scene scene--center epilogue" id="epilogue" data-section="epilogue">
      <div class="diorama-monolith diorama-monolith--hero" aria-hidden="true">CHRONICLES</div>
      <div class="fin" data-reveal>
        <div class="sec-head" style="justify-content: center; margin-bottom: 24px;" data-rv>
          <span class="k"><b>${tr('ct.epilogue.tag')}</b> — ${tr('ct.epilogue.subtag')}</span>
        </div>
        <h2 class="display display--xl" data-rv>${tr('ct.epilogue.head')}</h2>
        <p class="body-text lede" style="max-width: 50ch; margin: 20px auto 0;" data-rv>${tr('ct.epilogue.body')}</p>
        <a class="cta-pill" href="#hero" data-rv>
          <span>${tr('ct.epilogue.back')}</span>
          <svg viewBox="0 0 14 14" fill="none" width="13" height="13"><path d="M7 11V3M3 7l4-4 4 4" stroke="currentColor" stroke-width="1.4"/></svg>
          <i aria-hidden="true"></i>
        </a>
      </div>
    </section>`;
}

/**
 * Sección especial de Banco Histórico: Xerox PARC y la Programación Orientada a Objetos
 */
function chapterOopWorkbenchMarkup(): string {
  return `
    <section class="scene scene--workbench" id="ch-06-workbench" data-section="ch-06-workbench" data-era="oop">
      <div class="diorama-monolith" aria-hidden="true">OBJECTS</div>
      <div class="sec-head" data-rv>
        <span class="k"><b>06.B</b> — ${esc(tr('wb.06.tag'))}</span>
        <span class="rule"></span>
        <span class="k">${esc(tr('wb.06.subtag'))}</span>
      </div>

      <div class="gate-grid" data-reveal>
        <div>
          <h3 class="display display--md" data-rv>${esc(tr('wb.06.head'))}</h3>
          <p class="body-text" data-rv>${esc(tr('wb.06.desc'))}</p>
          <div class="tcode" data-rv>
            <div class="tcode__bar">
              <span class="tcode__dots" aria-hidden="true"><i></i><i></i><i></i></span>
              <span class="tcode__file">chronicle_agent.st</span>
              <button class="tcode__copy" data-copy type="button" aria-label="${esc(tr('ui.copy_code_aria'))}">${esc(tr('ui.copy'))}</button>
            </div>
            <pre class="tcode__body" aria-label="chronicle_agent.st">
// Definición de clase en Smalltalk-80 (Xerox PARC)
Object subclass: #ChronicleAgent
  instanceVariableNames: 'name era active'
  classVariableNames: ''
  poolDictionaries: ''
  category: 'Chronicles-Core'!

!ChronicleAgent methodsFor: 'travel'!
jumpToEra: targetYear
  Transcript show: name; show: ' viajando al año '; show: targetYear printString; cr.
  active := true.
  ^self!
            <span class="tcode__caret" aria-hidden="true"></span></pre>
          </div>
        </div>

        <div>
          <h3 class="display display--md" data-rv>${esc(tr('wb.06.lineage.head'))}</h3>
          <p class="body-text" data-rv>${esc(tr('wb.06.lineage.desc'))}</p>
          <div class="cur" data-rv>
            <div class="les">
              <span class="k">1967</span>
              <div>
                <h3>Simula 67 <em>Dahl &amp; Nygaard</em></h3>
                <p>${esc(tr('wb.06.l1.desc'))}</p>
              </div>
              <i class="bar" aria-hidden="true"></i>
            </div>
            <div class="les">
              <span class="k">1972</span>
              <div>
                <h3>Smalltalk <em>Xerox PARC</em></h3>
                <p>${esc(tr('wb.06.l2.desc'))}</p>
              </div>
              <i class="bar" aria-hidden="true"></i>
            </div>
            <div class="les">
              <span class="k">1985</span>
              <div>
                <h3>C++ <em>Bjarne Stroustrup</em></h3>
                <p>${esc(tr('wb.06.l3.desc'))}</p>
              </div>
              <i class="bar" aria-hidden="true"></i>
            </div>
            <div class="les">
              <span class="k">1995</span>
              <div>
                <h3>Java <em>Sun Microsystems</em></h3>
                <p>${esc(tr('wb.06.l4.desc'))}</p>
              </div>
              <i class="bar" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

/**
 * Sección especial de Banco Histórico: La Primera Web y la Chispa de JavaScript
 */
function chapterWebWorkbenchMarkup(): string {
  return `
    <section class="scene scene--workbench" id="ch-08-workbench" data-section="ch-08-workbench" data-era="web">
      <div class="diorama-monolith" aria-hidden="true">1989</div>
      <div class="sec-head" data-rv>
        <span class="k"><b>08.B</b> — ${esc(tr('wb.08.tag'))}</span>
        <span class="rule"></span>
        <span class="k">${esc(tr('wb.08.subtag'))}</span>
      </div>

      <div class="gate-grid" data-reveal>
        <div>
          <h3 class="display display--md" data-rv>${esc(tr('wb.08.head'))}</h3>
          <p class="body-text" data-rv>${esc(tr('wb.08.desc'))}</p>
          <div class="tcode" data-rv>
            <div class="tcode__bar">
              <span class="tcode__dots" aria-hidden="true"><i></i><i></i><i></i></span>
              <span class="tcode__file">info.cern.ch_1991.html</span>
              <button class="tcode__copy" data-copy type="button" aria-label="${esc(tr('ui.copy_code_aria'))}">${esc(tr('ui.copy'))}</button>
            </div>
            <pre class="tcode__body" aria-label="info.cern.ch_1991.html">
&lt;HEADER&gt;
&lt;TITLE&gt;The World Wide Web project&lt;/TITLE&gt;
&lt;/HEADER&gt;
&lt;BODY&gt;
&lt;H1&gt;WorldWideWeb&lt;/H1&gt;
The WorldWideWeb (W3) is a wide-area hypermedia
information retrieval initiative aiming to give
universal access to a large universe of documents.

Everything there is online about W3 is linked
directly by pointers through this web of nodes.
&lt;/BODY&gt;
            <span class="tcode__caret" aria-hidden="true"></span></pre>
          </div>
        </div>

        <div>
          <h3 class="display display--md" data-rv>${esc(tr('wb.08.engine.head'))}</h3>
          <p class="body-text" data-rv>${esc(tr('wb.08.engine.desc'))}</p>
          <div class="cur" data-rv>
            <div class="les">
              <span class="k">1995</span>
              <div>
                <h3>Mocha / LiveScript <em>Brendan Eich</em></h3>
                <p>${esc(tr('wb.08.e1.desc'))}</p>
              </div>
              <i class="bar" aria-hidden="true"></i>
            </div>
            <div class="les">
              <span class="k">2005</span>
              <div>
                <h3>AJAX &amp; Web 2.0 <em>Jesse James Garrett</em></h3>
                <p>${esc(tr('wb.08.e2.desc'))}</p>
              </div>
              <i class="bar" aria-hidden="true"></i>
            </div>
            <div class="les">
              <span class="k">2008</span>
              <div>
                <h3>Motor V8 &amp; Node.js <em>Lars Bak &amp; Ryan Dahl</em></h3>
                <p>${esc(tr('wb.08.e3.desc'))}</p>
              </div>
              <i class="bar" aria-hidden="true"></i>
            </div>
            <div class="les">
              <span class="k">2012+</span>
              <div>
                <h3>TypeScript <em>Anders Hejlsberg</em></h3>
                <p>${esc(tr('wb.08.e4.desc'))}</p>
              </div>
              <i class="bar" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

/**
 * Sección especial de Banco Histórico: La Mecánica del Transformer y la Síntesis de Código
 */
function chapterAiWorkbenchMarkup(): string {
  return `
    <section class="scene scene--workbench" id="ch-10-workbench" data-section="ch-10-workbench" data-era="ai">
      <div class="diorama-monolith" aria-hidden="true">NEURAL</div>
      <div class="sec-head" data-rv>
        <span class="k"><b>10.B</b> — ${esc(tr('wb.10.tag'))}</span>
        <span class="rule"></span>
        <span class="k">${esc(tr('wb.10.subtag'))}</span>
      </div>

      <div class="gate-grid" data-reveal>
        <div>
          <h3 class="display display--md" data-rv>${esc(tr('wb.10.head'))}</h3>
          <p class="body-text" data-rv>${esc(tr('wb.10.desc'))}</p>
          <div class="tcode" data-rv>
            <div class="tcode__bar">
              <span class="tcode__dots" aria-hidden="true"><i></i><i></i><i></i></span>
              <span class="tcode__file">attention_mechanism.py</span>
              <button class="tcode__copy" data-copy type="button" aria-label="${esc(tr('ui.copy_code_aria'))}">${esc(tr('ui.copy'))}</button>
            </div>
            <pre class="tcode__body" aria-label="attention_mechanism.py">
# Cálculo de Atención en Transformers (Vaswani et al., 2017)
import torch
import torch.nn.functional as F

def scaled_dot_product_attention(Q, K, V, mask=None):
    d_k = Q.size(-1)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, -1e9)
    weights = F.softmax(scores, dim=-1)
    return torch.matmul(weights, V), weights
            <span class="tcode__caret" aria-hidden="true"></span></pre>
          </div>
        </div>

        <div>
          <h3 class="display display--md" data-rv>${esc(tr('wb.10.mind.head'))}</h3>
          <p class="body-text" data-rv>${esc(tr('wb.10.mind.desc'))}</p>
          <div class="cur" data-rv>
            <div class="les">
              <span class="k">1958</span>
              <div>
                <h3>Perceptrón <em>Frank Rosenblatt</em></h3>
                <p>${esc(tr('wb.10.m1.desc'))}</p>
              </div>
              <i class="bar" aria-hidden="true"></i>
            </div>
            <div class="les">
              <span class="k">1986</span>
              <div>
                <h3>Backpropagation <em>Hinton, Rumelhart, Williams</em></h3>
                <p>${esc(tr('wb.10.m2.desc'))}</p>
              </div>
              <i class="bar" aria-hidden="true"></i>
            </div>
            <div class="les">
              <span class="k">2017</span>
              <div>
                <h3>Transformer <em>Vaswani et al. (Google Brain)</em></h3>
                <p>${esc(tr('wb.10.m3.desc'))}</p>
              </div>
              <i class="bar" aria-hidden="true"></i>
            </div>
            <div class="les">
              <span class="k">2021+</span>
              <div>
                <h3>Modelos de Código <em>Codex, Copilot, Claude</em></h3>
                <p>${esc(tr('wb.10.m4.desc'))}</p>
              </div>
              <i class="bar" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

/**
 * Sección especial de Banco Histórico: El Oráculo Cuántico y el Horizonte del Código
 */
function chapterFutureWorkbenchMarkup(): string {
  return `
    <section class="scene scene--workbench" id="ch-11-workbench" data-section="ch-11-workbench" data-era="future">
      <div class="diorama-monolith" aria-hidden="true">QUANTUM</div>
      <div class="sec-head" data-rv>
        <span class="k"><b>11.B</b> — ${esc(tr('wb.11.tag'))}</span>
        <span class="rule"></span>
        <span class="k">${esc(tr('wb.11.subtag'))}</span>
      </div>

      <div class="gate-grid" data-reveal>
        <div>
          <h3 class="display display--md" data-rv>${esc(tr('wb.11.head'))}</h3>
          <p class="body-text" data-rv>${esc(tr('wb.11.desc'))}</p>
          <div class="tcode" data-rv>
            <div class="tcode__bar">
              <span class="tcode__dots" aria-hidden="true"><i></i><i></i><i></i></span>
              <span class="tcode__file">entanglement_bell.qs</span>
              <button class="tcode__copy" data-copy type="button" aria-label="${esc(tr('ui.copy_code_aria'))}">${esc(tr('ui.copy'))}</button>
            </div>
            <pre class="tcode__body" aria-label="entanglement_bell.qs">
// Preparación de Entrelazamiento Cuántico en Q#
operation PrepareBellPair(q0 : Qubit, q1 : Qubit) : Unit is Adj + Ctl {
    H(q0);             // Puerta Hadamard: q0 entra en superposición (|0⟩ + |1⟩)/√2
    CNOT(q0, q1);      // Puerta NOT controlada: entrelaza instantáneamente q0 con q1
    // Medir q0 forzará a q1 al mismo valor sin importar la distancia espacial
}
            <span class="tcode__caret" aria-hidden="true"></span></pre>
          </div>
        </div>

        <div>
          <h3 class="display display--md" data-rv>${esc(tr('wb.11.dilemmas.head'))}</h3>
          <p class="body-text" data-rv>${esc(tr('wb.11.dilemmas.desc'))}</p>
          <div class="cur" data-rv>
            <div class="les">
              <span class="k">01</span>
              <div>
                <h3>${esc(tr('wb.11.d1.title'))} <em>${esc(tr('wb.11.d1.sub'))}</em></h3>
                <p>${esc(tr('wb.11.d1.desc'))}</p>
              </div>
              <i class="bar" aria-hidden="true"></i>
            </div>
            <div class="les">
              <span class="k">02</span>
              <div>
                <h3>${esc(tr('wb.11.d2.title'))} <em>${esc(tr('wb.11.d2.sub'))}</em></h3>
                <p>${esc(tr('wb.11.d2.desc'))}</p>
              </div>
              <i class="bar" aria-hidden="true"></i>
            </div>
            <div class="les">
              <span class="k">03</span>
              <div>
                <h3>${esc(tr('wb.11.d3.title'))} <em>${esc(tr('wb.11.d3.sub'))}</em></h3>
                <p>${esc(tr('wb.11.d3.desc'))}</p>
              </div>
              <i class="bar" aria-hidden="true"></i>
            </div>
            <div class="les">
              <span class="k">04</span>
              <div>
                <h3>${esc(tr('wb.11.d4.title'))} <em>${esc(tr('wb.11.d4.sub'))}</em></h3>
                <p>${esc(tr('wb.11.d4.desc'))}</p>
              </div>
              <i class="bar" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

function chapterStats(ch: ChapterMeta): Array<{ val: string; label: string; labelKey: string }> {
  switch (ch.id) {
    case 'ch-01-before-code':
      return [
        { val: '1843', label: 'Primer Algoritmo', labelKey: 'stat.first.algorithm' },
        { val: '24,000', label: 'Engranajes de Bronce', labelKey: 'stat.bronze.gears' },
        { val: 'Nota G', label: 'Manuscrito Original', labelKey: 'stat.original.manuscript' },
        { val: '∞', label: 'Legado Vivo', labelKey: 'stat.living.legacy' },
      ];
    case 'ch-02-machines':
      return [
        { val: '1936', label: 'Máquina Universal', labelKey: 'stat.universal.machine' },
        { val: '2,400', label: 'Relés Zuse Z3', labelKey: 'stat.zuse.relays' },
        { val: '5,000 c/s', label: 'Lectura Colossus', labelKey: 'stat.colossus.read' },
        { val: 'Binario', label: 'Lógica Booleana', labelKey: 'stat.boolean.logic' },
      ];
    case 'ch-03-computers':
      return [
        { val: '1945', label: 'ENIAC Operativo', labelKey: 'stat.eniac.operational' },
        { val: '18,000', label: 'Válvulas de Vacío', labelKey: 'stat.vacuum.tubes' },
        { val: 'von Neumann', label: 'Arquitectura', labelKey: 'stat.vonneumann.arch' },
        { val: '167 m²', label: 'Superficie', labelKey: 'stat.surface' },
      ];
    case 'ch-04-languages':
      return [
        { val: '1957', label: 'Fortran I', labelKey: 'stat.fortran.one' },
        { val: 'A-0', label: 'Primer Compilador', labelKey: 'stat.first.compiler' },
        { val: 'COBOL', label: 'Estándar Global', labelKey: 'stat.global.standard' },
        { val: 'Lisp', label: 'Cálculo Lambda', labelKey: 'stat.lambda.calculus' },
      ];
    case 'ch-05-systems':
      return [
        { val: '1972', label: 'Nacimiento de C', labelKey: 'stat.birth.c' },
        { val: 'Unix', label: 'Filosofía Modular', labelKey: 'stat.modular.philosophy' },
        { val: 'PDP-11', label: 'Hardware Clave', labelKey: 'stat.key.hardware' },
        { val: 'POSIX', label: 'Estándar Universal', labelKey: 'stat.uni.std' },
      ];
    case 'ch-06-oop':
      return [
        { val: '1972', label: 'Nacimiento Smalltalk', labelKey: 'stat.birth.smalltalk' },
        { val: 'Xerox PARC', label: 'Cuna de la GUI', labelKey: 'stat.gui.cradle' },
        { val: 'C++', label: 'Stroustrup (1985)', labelKey: 'stat.stroustrup' },
        { val: 'Objetos', label: 'Paradigma Vivo', labelKey: 'stat.living.paradigm' },
      ];
    case 'ch-07-modern':
      return [
        { val: '1991', label: 'Python de Guido', labelKey: 'stat.guido.python' },
        { val: '1995', label: 'Java & la JVM', labelKey: 'stat.java.jvm' },
        { val: '+700', label: 'Lenguajes Vivos', labelKey: 'stat.living.languages' },
        { val: 'Open Source', label: 'Revolución Global', labelKey: 'stat.global.revolution' },
      ];
    case 'ch-08-web':
      return [
        { val: '1989', label: 'Tim Berners-Lee', labelKey: 'stat.tbl' },
        { val: '10 Días', label: 'Génesis de JS', labelKey: 'stat.js.genesis' },
        { val: '5.4B', label: 'Personas en Línea', labelKey: 'stat.online.people' },
        { val: 'V8 / Web', label: 'Plataforma Global', labelKey: 'stat.global.platform' },
      ];
    case 'ch-09-systems':
      return [
        { val: '2009', label: 'Go en Google', labelKey: 'stat.go.google' },
        { val: '2010', label: 'Rust y Safety', labelKey: 'stat.rust.safety' },
        { val: '0 Races', label: 'Borrow Checker', labelKey: 'stat.borrow.checker' },
        { val: 'Concurrencia', label: 'Escala Masiva', labelKey: 'stat.massive.scale' },
      ];
    case 'ch-10-ai':
      return [
        { val: '2012', label: 'Revolución Deep Learning', labelKey: 'stat.deep.learning' },
        { val: '2017', label: 'Atención / Transformer', labelKey: 'stat.transformer' },
        { val: 'Trillones', label: 'Parámetros', labelKey: 'stat.parameters' },
        { val: 'Copilot', label: 'Síntesis Asistida', labelKey: 'stat.assisted.synthesis' },
      ];
    case 'ch-11-future':
      return [
        { val: '53 Qubits', label: 'Supremacía Cuántica', labelKey: 'stat.quantum.supremacy' },
        { val: '|0⟩ + |1⟩', label: 'Superposición', labelKey: 'stat.superposition' },
        { val: 'AGI', label: 'Horizonte Teórico', labelKey: 'stat.theoretical.horizon' },
        { val: '∞', label: 'El Próximo Capítulo', labelKey: 'stat.next.chapter' },
      ];
    default:
      return [
        { val: ch.yearLabel, label: 'Época', labelKey: 'stat.epoch' },
        { val: String(ch.number).padStart(2, '0'), label: 'Capítulo', labelKey: 'stat.chapter' },
        { val: getSideLabel(ch.era), label: 'Dominio', labelKey: 'stat.domain' },
        { val: tr('stat.active'), label: 'Estado', labelKey: 'stat.state' },
      ];
  }
}

function chapterExtraNarrative(ch: ChapterMeta): string {
  return tr(`ct.narr.${ch.id}`);
}

function getChapterCharacter(ch: ChapterMeta) {
  const map: Record<string, string> = {
    'ch-01-before-code': 'ada-lovelace',
    'ch-02-machines': 'alan-turing',
    'ch-03-computers': 'margaret-hamilton',
    'ch-04-languages': 'grace-hopper',
    'ch-05-systems': 'dennis-ritchie',
    'ch-06-oop': 'alan-kay',
    'ch-07-modern': 'guido-van-rossum',
    'ch-08-web': 'tim-berners-lee',
    'ch-09-systems': 'linus-torvalds',
    'ch-10-ai': 'geoffrey-hinton',
    'ch-11-future': 'demis-hassabis',
  };
  const id = map[ch.id];
  return id ? getCharacter(id) : undefined;
}

function getChapterLanguage(ch: ChapterMeta) {
  const map: Record<string, string> = {
    'ch-04-languages': 'fortran-language',
    'ch-05-systems': 'c-language',
    'ch-06-oop': 'smalltalk-language',
    'ch-07-modern': 'python-language',
    'ch-08-web': 'javascript-language',
    'ch-09-systems': 'rust-language',
    'ch-10-ai': 'mojo-language',
    'ch-11-future': 'qsharp-language',
  };
  const id = map[ch.id];
  return id ? getLanguage(id) : undefined;
}

function getChapterMachine(ch: ChapterMeta) {
  const map: Record<string, string> = {
    'ch-01-before-code': 'analytical-engine',
    'ch-02-machines': 'z3-machine',
    'ch-03-computers': 'eniac-machine',
    'ch-05-systems': 'pdp-11-machine',
    'ch-06-oop': 'xerox-alto-machine',
    'ch-07-modern': 'ibm-pc-machine',
    'ch-10-ai': 'nvidia-tensor-hardware',
  };
  const id = map[ch.id];
  return id ? getMachine(id) : undefined;
}

function getChapterEvent(ch: ChapterMeta) {
  const map: Record<string, string> = {
    'ch-01-before-code': 'bernoulli-algorithm',
    'ch-02-machines': 'turing-computable-numbers',
    'ch-03-computers': 'first-computer-bug',
    'ch-04-languages': 'first-compiler',
    'ch-05-systems': 'apollo-guidance',
    'ch-06-oop': 'smalltalk-parc',
    'ch-07-modern': 'java-launch',
    'ch-08-web': 'world-wide-web',
    'ch-09-systems': 'linux-announcement',
    'ch-10-ai': 'alphago-victory',
    'ch-11-future': 'quantum-supremacy',
  };
  const id = map[ch.id];
  return id ? getEvent(id) : undefined;
}

/**
 * Construye toda la experiencia editorial de CodeChronicles.
 * Orquesta la narrativa, los portales de capítulo, las galerías y los bancos de trabajo.
 */
export function renderChronicles(): string {
  const sections = [heroMarkup()];

  chapters.forEach((ch) => {
    if (ch.number === 0) return;
    sections.push(chapterMarkup(ch));

    // Integraciones ricas en capítulos clave
    if (ch.id === 'ch-01-before-code') {
      sections.push(chapterWorkbenchMarkup());
    } else if (ch.id === 'ch-04-languages') {
      sections.push(curriculumMilestonesMarkup());
    } else if (ch.id === 'ch-05-systems') {
      sections.push(comparisonWorkbenchMarkup());
    } else if (ch.id === 'ch-06-oop') {
      sections.push(chapterOopWorkbenchMarkup());
    } else if (ch.id === 'ch-08-web') {
      sections.push(chapterWebWorkbenchMarkup());
    } else if (ch.id === 'ch-10-ai') {
      sections.push(chapterAiWorkbenchMarkup());
    } else if (ch.id === 'ch-11-future') {
      sections.push(chapterFutureWorkbenchMarkup());
    }
  });

  sections.push(epilogueMarkup());

  return `
    <div class="timeline-ribbon" id="timeline-ribbon">
      <div class="timeline-ribbon-spine" id="timeline-ribbon-spine" aria-hidden="true">
        <div class="timeline-ribbon-spine__line"></div>
        <div class="timeline-ribbon-spine__cursor" id="timeline-ribbon-cursor"></div>
      </div>
      <div class="timeline-ribbon-track" id="timeline-ribbon-track">
        ${sections.join('\n')}
      </div>
    </div>`;
}