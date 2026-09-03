import { chapters, type ChapterMeta } from '../data/chapters';
import { getCharacter } from '../data/characters';
import { getLanguage } from '../data/languages';
import { getMachine } from '../data/machines';
import { getEvent } from '../data/events';
import { interactiveTimelineMarkup } from '../history/InteractiveTimeline';
import { comparisonMarkup } from '../interactions/LanguageComparison';

export function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const SIDE_LABELS: Record<string, string> = {
  'pre-code': 'Antes del Código',
  algorithms: 'Algoritmos',
  machines: 'Las Máquinas',
  'machine-language': 'Código Máquina',
  assembly: 'Ensamblador',
  computers: 'Computadoras',
  'first-languages': 'Primeros Lenguajes',
  enterprise: 'Lenguajes de Gestión',
  structured: 'Estructura',
  c: 'Sistemas',
  oop: 'Los Objetos',
  modern: 'Era Moderna',
  internet: 'Internet',
  web: 'La Web',
  mobile: 'Móvil',
  systems: 'Sistemas',
  ai: 'IA',
  future: 'Futuro',
};

/**
 * Hero Cinematográfico
 * - Título oversized con máscaras de revelación
 * - Floating peek window con previsualización
 * - Chips de navegación directa a capítulos en el pie
 */
export function heroMarkup(): string {
  return `
    <header class="hero hero-layout" id="hero" data-section="hero">
      <div class="hero-top" data-reveal>
        <div class="eyebrow" data-rv><span class="dot"></span> CAPÍTULO 00 — EL UMBRAL DEL CÓDIGO</div>
        <h1 class="display display--xl" data-rv>
          <span class="mask-line"><span>Donde las ideas</span></span>
          <span class="mask-line"><span>se convierten en</span></span>
          <span class="mask-line"><span>lenguaje.</span></span>
        </h1>
        <p class="hero-sub body" data-rv>Un viaje interactivo y cinematográfico por la historia viva del software, desde las tarjetas de seda de Lovelace hasta la era de la inteligencia artificial.</p>
      </div>

      <aside class="peek" data-rv="up">
        <a class="peek-fr" href="#ch-01-before-code" aria-label="Explorar Capítulo 01">
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
          <span>Desplázate para viajar</span>
          <span class="track"><i aria-hidden="true"></i></span>
        </div>
        <nav class="chapters-grid" data-rv="up" aria-label="Capítulos de la crónica">
          <a class="chip" href="#ch-01-before-code">
            <span class="num">01</span>
            <div class="tx">
              <b>Antes del Código</b>
              <p>Telares, Babbage y el primer algoritmo de 1843.</p>
            </div>
          </a>
          <a class="chip" href="#ch-02-machines">
            <span class="num">02</span>
            <div class="tx">
              <b>Las Máquinas</b>
              <p>Turing, relés electromagnéticos y el amanecer del silicio.</p>
            </div>
          </a>
          <a class="chip" href="#ch-04-languages">
            <span class="num">03</span>
            <div class="tx">
              <b>Primeros Lenguajes</b>
              <p>Fortran, Lisp, COBOL y los compiladores de Grace Hopper.</p>
            </div>
          </a>
          <a class="chip" href="#ch-05-systems">
            <span class="num">04</span>
            <div class="tx">
              <b>Sistemas y Red</b>
              <p>C, Unix, objetos y el software que sostiene el mundo.</p>
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
  const eraText = ch.era.toUpperCase().replace(/-/g, ' ');
  const char = getChapterCharacter(ch);
  const lang = getChapterLanguage(ch);
  const machine = getChapterMachine(ch);
  const event = getChapterEvent(ch);

  const arSvg = `<span class="card-ar" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" width="13" height="13"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg></span>`;

  // Construir las 3 tarjetas de la era
  const cardsHTML: string[] = [];

  if (char) {
    cardsHTML.push(`
      <article class="card" data-rv="up">
        ${arSvg}
        <p class="eyebrow eyebrow--accent">Figura Histórica</p>
        <h3 class="display display--md">${esc(char.name)}</h3>
        <p class="meta">${esc(char.profession)} · ${esc(char.years)}</p>
        ${char.quote ? `<blockquote class="scene__quote"><p>“${esc(char.quote)}”</p></blockquote>` : ''}
        <div class="card-meta"><span>${esc(char.representation)}</span><span>${esc(char.years)}</span></div>
      </article>`);
  }

  if (lang) {
    cardsHTML.push(`
      <article class="card" data-rv="up">
        ${arSvg}
        <p class="eyebrow eyebrow--accent">Lenguaje Clave</p>
        <h3 class="display display--md">${esc(lang.name)}</h3>
        <p class="meta">${esc(lang.creators.join(', '))} · ${lang.year}</p>
        <p class="body-text">${esc(lang.historicalContext)}</p>
        <div class="card-meta"><span>${esc(lang.paradigms.join(' · '))}</span><span>${lang.year}</span></div>
      </article>`);
  }

  if (machine) {
    cardsHTML.push(`
      <article class="card" data-rv="up">
        ${arSvg}
        <p class="eyebrow eyebrow--accent">Máquina / Hardware</p>
        <h3 class="display display--md">${esc(machine.name)}</h3>
        <p class="meta">${esc(machine.creator)} · ${machine.year}</p>
        <p class="body-text">${esc(machine.description)}</p>
        <div class="card-meta"><span>Tecnología Física</span><span>${machine.year}</span></div>
      </article>`);
  }

  if (event && cardsHTML.length < 3) {
    cardsHTML.push(`
      <article class="card" data-rv="up">
        ${arSvg}
        <p class="eyebrow eyebrow--accent">Acontecimiento Clave</p>
        <h3 class="display display--md">${esc(event.title)}</h3>
        <p class="meta">${event.year ?? ''}</p>
        <p class="body-text">${esc(event.description)}</p>
        <div class="card-meta"><span>Hito Histórico</span><span>${event.year ?? '—'}</span></div>
      </article>`);
  }

  // Franja de estadísticas específicas del capítulo
  const stats = chapterStats(ch);

  const gateSection = `
    <section class="scene" id="${ch.id}" data-section="${ch.id}" data-era="${ch.era}">
      <div class="sec-head" data-rv>
        <span class="k"><b>${String(ch.number).padStart(2, '0')}</b> — ${esc(ch.subtitle)}</span>
        <span class="rule"></span>
        <span class="k">${esc(ch.yearLabel)} · ${esc(SIDE_LABELS[ch.era] ?? eraText)}</span>
      </div>

      <div class="gate-grid" data-reveal>
        <h2 class="display display--lg" data-rv>${esc(ch.tagline)}</h2>
        <div class="gate-copy">
          <p class="lead" data-rv>${esc(ch.summary)}</p>
          <p class="body-text" data-rv>${chapterExtraNarrative(ch)}</p>
          ${
            cardsHTML.length > 0
              ? `<a class="arrowlink" href="#cards-${ch.id}" data-rv>
                  <span>Explorar placas de la era</span>
                  <span class="ar" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg></span>
                </a>`
              : ''
          }
        </div>
      </div>

      <div class="gate-stats" data-rv>
        ${stats.map((s) => `<div><b>${esc(s.val)}</b><span>${esc(s.label)}</span></div>`).join('')}
      </div>
    </section>`;

  const cardsSection =
    cardsHTML.length > 0
      ? `
    <section class="scene" id="cards-${ch.id}" data-section="cards-${ch.id}" data-era="${ch.era}">
      <div class="sec-head" data-rv>
        <span class="k"><b>${String(ch.number).padStart(2, '0')}.A</b> — Placas &amp; Protagonistas</span>
        <span class="rule"></span>
        <span class="k">${esc(ch.yearLabel)}</span>
      </div>
      <div data-reveal style="margin-bottom: 20px;">
        <h2 class="display display--md" data-rv>Los artefactos y mentes que forjaron la era.</h2>
      </div>
      <div class="cards-stagger" data-reveal>
        ${cardsHTML.join('')}
      </div>
    </section>`
      : '';

  return gateSection + '\n' + cardsSection;
}

/**
 * Sección especial de Banco Histórico (Código Bernoulli y Línea Temporal)
 */
function chapterWorkbenchMarkup(): string {
  return `
    <section class="scene" id="ch-01-workbench" data-section="ch-01-workbench" data-era="pre-code">
      <div class="sec-head" data-rv>
        <span class="k"><b>01.B</b> — Código Histórico &amp; Cronología Interactiva</span>
        <span class="rule"></span>
        <span class="k">MANUSCRITO DE 1843</span>
      </div>

      <div class="gate-grid" data-reveal>
        <div>
          <h3 class="display display--md" data-rv>El manuscrito que inició todo.</h3>
          <p class="body-text" data-rv>A continuación se presenta la transcripción algorítmica del primer programa de la historia, formulado por Ada Lovelace para calcular los números de Bernoulli en la Máquina Analítica:</p>
          <div class="tcode" data-rv>
            <div class="tcode__bar">
              <span class="tcode__dots" aria-hidden="true"><i></i><i></i><i></i></span>
              <span class="tcode__file">bernoulli_note_g_1843.alg</span>
              <button class="tcode__copy" data-copy type="button" aria-label="Copiar código">Copiar</button>
            </div>
            <pre class="tcode__body" aria-label="bernoulli_note_g_1843.alg">
// Operaciones de Lovelace para números de Bernoulli (1843)
// Variables de columna V1..V8 en el Molino Analítico
1.  V4  * V1  → V4     // Multiplicación inicial
2.  V5  - V4  → V5     // Diferencia en acumulador
3.  V6  + 1   → V6     // Incremento de índice n
4.  B   ← V2 / 2       // Coeficiente de Bernoulli
5.  resultado ← V3     // Salida al Almacén Mecánico
            <span class="tcode__caret" aria-hidden="true"></span></pre>
          </div>
        </div>

        <div>
          <h3 class="display display--md" data-rv>Cronología interactiva de la era.</h3>
          <p class="body-text" data-rv>Desliza o haz clic en los hitos para viajar paso a paso por los inventos que hicieron posible el software:</p>
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
    <section class="scene" id="ch-curriculum" data-section="ch-curriculum" data-era="first-languages">
      <div class="sec-head" data-rv>
        <span class="k"><b>03.B</b> — Evolución de los Lenguajes</span>
        <span class="rule"></span>
        <span class="k">HITOS FUNDACIONALES</span>
      </div>

      <div class="cur-head" data-reveal>
        <h2 class="display display--lg" data-rv>La rebelión contra los ceros y unos: el nacimiento del compilador.</h2>
        <div data-rv>
          <p class="lead">Antes de 1954, programar significaba manipular cables físicos o cadenas binarias. La invención del compilador demostró que las máquinas podían traducir la notación matemática y el lenguaje humano a silicio.</p>
        </div>
      </div>

      <div class="cur" data-reveal>
        <div class="les" data-rv="up">
          <span class="k">01</span>
          <div>
            <h3>Fortran <em>IBM</em></h3>
            <p>John Backus elimina el ensamblador: la traducción directa de fórmulas matemáticas a instrucciones de procesador.</p>
          </div>
          <p class="body-text">Probó que el código de alto nivel podía ser tan eficiente como el escrito a mano.</p>
          <span class="t">1957</span>
          <i class="bar" aria-hidden="true"></i>
        </div>

        <div class="les" data-rv="up">
          <span class="k">02</span>
          <div>
            <h3>Lisp <em>MIT</em></h3>
            <p>John McCarthy formula las funciones lambda, la recolección de basura automática y los árboles de datos simbólicos.</p>
          </div>
          <p class="body-text">El lenguaje que definió la inteligencia artificial y la programación funcional.</p>
          <span class="t">1958</span>
          <i class="bar" aria-hidden="true"></i>
        </div>

        <div class="les" data-rv="up">
          <span class="k">03</span>
          <div>
            <h3>COBOL &amp; Grace Hopper <em>US NAVY</em></h3>
            <p>El código escrito en prosa en inglés: el estándar que movió los bancos y transacciones del planeta.</p>
          </div>
          <p class="body-text">La invención del primer compilador de la historia (A-0) y la estandarización masiva.</p>
          <span class="t">1959</span>
          <i class="bar" aria-hidden="true"></i>
        </div>

        <div class="les" data-rv="up">
          <span class="k">04</span>
          <div>
            <h3>C &amp; Unix <em>BELL LABS</em></h3>
            <p>Dennis Ritchie y Ken Thompson crean el lenguaje universal que gobierna los sistemas operativos contemporáneos.</p>
          </div>
          <p class="body-text">El cimiento directo de Linux, macOS, Windows, Android e iOS.</p>
          <span class="t">1972</span>
          <i class="bar" aria-hidden="true"></i>
        </div>

        <div class="les" data-rv="up">
          <span class="k">05</span>
          <div>
            <h3>Python &amp; La Era de la IA <em>GLOBAL</em></h3>
            <p>Guido van Rossum prioriza la legibilidad humana. Décadas después, se convierte en la lengua franca del machine learning.</p>
          </div>
          <p class="body-text">El puente entre los algoritmos matemáticos y los modelos de frontera.</p>
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
    <section class="scene" id="ch-comparison" data-section="ch-comparison" data-era="systems">
      <div class="sec-head" data-rv>
        <span class="k"><b>04.B</b> — Laboratorio de Sintaxis y Paradigmas</span>
        <span class="rule"></span>
        <span class="k">COMPARATIVA EN TIEMPO REAL</span>
      </div>

      <div class="gate-grid" data-reveal style="margin-bottom: clamp(24px, 4vh, 48px);">
        <h2 class="display display--md" data-rv>Un mismo problema, filosofías opuestas.</h2>
        <div class="gate-copy">
          <p class="lead" data-rv>Compara cómo cada generación resolvió el mismo desafío lógico a través de distintos paradigmas: imperativo, orientado a objetos, funcional y moderno.</p>
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
      <div class="fin" data-reveal>
        <div class="sec-head" style="justify-content: center; margin-bottom: 24px;" data-rv>
          <span class="k"><b>EPÍLOGO</b> — EL VIAJE CONTINÚA</span>
        </div>
        <h2 class="display display--xl" data-rv>La historia de la programación<br/>todavía se sigue escribiendo.</h2>
        <p class="body-text lede" style="max-width: 50ch; margin: 20px auto 0;" data-rv>Cada línea de código que compilas hoy está conectada con los telares de seda de 1801, las notas de Ada Lovelace de 1843 y la máquina universal de Turing de 1936. El próximo capítulo es nuestro.</p>
        <a class="cta-pill" href="#hero" data-rv>
          <span>Volver al Umbral</span>
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
    <section class="scene" id="ch-06-workbench" data-section="ch-06-workbench" data-era="oop">
      <div class="sec-head" data-rv>
        <span class="k"><b>06.B</b> — El Manifiesto de Xerox PARC &amp; La Biología del Software</span>
        <span class="rule"></span>
        <span class="k">SMALLTALK-80 (1972–1980)</span>
      </div>

      <div class="gate-grid" data-reveal>
        <div>
          <h3 class="display display--md" data-rv>Todo es un objeto. Todo se comunica por mensajes.</h3>
          <p class="body-text" data-rv>En el Xerox Alto, Alan Kay y Adele Goldberg reemplazaron la noción tradicional de procedimientos separados de datos por entidades biológicas de software capaces de responder a mensajes. Observa el código original de Smalltalk-80:</p>
          <div class="tcode" data-rv>
            <div class="tcode__bar">
              <span class="tcode__dots" aria-hidden="true"><i></i><i></i><i></i></span>
              <span class="tcode__file">chronicle_agent.st</span>
              <button class="tcode__copy" data-copy type="button" aria-label="Copiar código">Copiar</button>
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
          <h3 class="display display--md" data-rv>El linaje de los objetos.</h3>
          <p class="body-text" data-rv>Cómo la metáfora de las células autónomas se expandió por toda la industria del software:</p>
          <div class="cur" data-rv>
            <div class="les">
              <span class="k">1967</span>
              <div>
                <h3>Simula 67 <em>Dahl &amp; Nygaard</em></h3>
                <p>Nace el concepto de clase, subclase y herencia para simular sistemas físicos.</p>
              </div>
              <i class="bar" aria-hidden="true"></i>
            </div>
            <div class="les">
              <span class="k">1972</span>
              <div>
                <h3>Smalltalk <em>Xerox PARC</em></h3>
                <p>Pureza conceptual absoluta: enteros, ventanas y métodos son objetos que intercambian mensajes.</p>
              </div>
              <i class="bar" aria-hidden="true"></i>
            </div>
            <div class="les">
              <span class="k">1985</span>
              <div>
                <h3>C++ <em>Bjarne Stroustrup</em></h3>
                <p>Clases agregadas a C: la potencia de los objetos sin ceder un milisegundo de rendimiento.</p>
              </div>
              <i class="bar" aria-hidden="true"></i>
            </div>
            <div class="les">
              <span class="k">1995</span>
              <div>
                <h3>Java <em>Sun Microsystems</em></h3>
                <p>Tipado estático seguro, recolección de basura y ejecución universal con la máquina virtual JVM.</p>
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
    <section class="scene" id="ch-08-workbench" data-section="ch-08-workbench" data-era="web">
      <div class="sec-head" data-rv>
        <span class="k"><b>08.B</b> — El Hipertexto del CERN &amp; La Chispa de JavaScript</span>
        <span class="rule"></span>
        <span class="k">1991 — 1995</span>
      </div>

      <div class="gate-grid" data-reveal>
        <div>
          <h3 class="display display--md" data-rv>El documento original que conectó al planeta.</h3>
          <p class="body-text" data-rv>Así lucía el código fuente de la primera página web montada por Tim Berners-Lee en el NeXT Computer del CERN en 1991. Una estructura modesta que transformó la civilización:</p>
          <div class="tcode" data-rv>
            <div class="tcode__bar">
              <span class="tcode__dots" aria-hidden="true"><i></i><i></i><i></i></span>
              <span class="tcode__file">info.cern.ch_1991.html</span>
              <button class="tcode__copy" data-copy type="button" aria-label="Copiar código">Copiar</button>
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
          <h3 class="display display--md" data-rv>De 10 días a motor omnipresente.</h3>
          <p class="body-text" data-rv>La evolución del lenguaje que pasó de mover botones a ejecutar aplicaciones de escala astronómica:</p>
          <div class="cur" data-rv>
            <div class="les">
              <span class="k">1995</span>
              <div>
                <h3>Mocha / LiveScript <em>Brendan Eich</em></h3>
                <p>Creado en 10 días para Netscape Navigator 2.0; combinó la sintaxis de Java con el alma funcional de Scheme.</p>
              </div>
              <i class="bar" aria-hidden="true"></i>
            </div>
            <div class="les">
              <span class="k">2005</span>
              <div>
                <h3>AJAX &amp; Web 2.0 <em>Jesse James Garrett</em></h3>
                <p>Las páginas dejan de recargarse: intercambio de datos asíncrono en segundo plano (Gmail, Google Maps).</p>
              </div>
              <i class="bar" aria-hidden="true"></i>
            </div>
            <div class="les">
              <span class="k">2008</span>
              <div>
                <h3>Motor V8 &amp; Node.js <em>Lars Bak &amp; Ryan Dahl</em></h3>
                <p>Compilación JIT ultrarrápida: JavaScript sale del navegador y conquista los servidores de la nube.</p>
              </div>
              <i class="bar" aria-hidden="true"></i>
            </div>
            <div class="les">
              <span class="k">2012+</span>
              <div>
                <h3>TypeScript <em>Anders Hejlsberg</em></h3>
                <p>Tipado estático a escala sobre JavaScript: la base de las aplicaciones web más complejas de la historia.</p>
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
    <section class="scene" id="ch-10-workbench" data-section="ch-10-workbench" data-era="ai">
      <div class="sec-head" data-rv>
        <span class="k"><b>10.B</b> — La Mecánica del Transformer &amp; La Síntesis de Código</span>
        <span class="rule"></span>
        <span class="k">ATTENTION IS ALL YOU NEED (2017)</span>
      </div>

      <div class="gate-grid" data-reveal>
        <div>
          <h3 class="display display--md" data-rv>La fórmula que enseñó a las máquinas a razonar sintaxis.</h3>
          <p class="body-text" data-rv>El mecanismo de auto-atención escalada (Scaled Dot-Product Attention) permite que un modelo pondere la relevancia de cada token respecto a todos los demás en una secuencia de código:</p>
          <div class="tcode" data-rv>
            <div class="tcode__bar">
              <span class="tcode__dots" aria-hidden="true"><i></i><i></i><i></i></span>
              <span class="tcode__file">attention_mechanism.py</span>
              <button class="tcode__copy" data-copy type="button" aria-label="Copiar código">Copiar</button>
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
          <h3 class="display display--md" data-rv>La evolución de la mente sintáctica.</h3>
          <p class="body-text" data-rv>Hitos que transformaron el cálculo numérico en comprensión de software:</p>
          <div class="cur" data-rv>
            <div class="les">
              <span class="k">1958</span>
              <div>
                <h3>Perceptrón <em>Frank Rosenblatt</em></h3>
                <p>El primer modelo de red neuronal artificial inspirado en la sinapsis biológica cerebral.</p>
              </div>
              <i class="bar" aria-hidden="true"></i>
            </div>
            <div class="les">
              <span class="k">1986</span>
              <div>
                <h3>Backpropagation <em>Hinton, Rumelhart, Williams</em></h3>
                <p>El algoritmo de propagación hacia atrás del gradiente que permitió entrenar redes multicapa.</p>
              </div>
              <i class="bar" aria-hidden="true"></i>
            </div>
            <div class="les">
              <span class="k">2017</span>
              <div>
                <h3>Transformer <em>Vaswani et al. (Google Brain)</em></h3>
                <p>Abandono de la recurrencia: atención paralela sobre secuencias arbitrariamente largas.</p>
              </div>
              <i class="bar" aria-hidden="true"></i>
            </div>
            <div class="les">
              <span class="k">2021+</span>
              <div>
                <h3>Modelos de Código <em>Codex, Copilot, Claude</em></h3>
                <p>La programación asistida: el código como diálogo continuo entre humanos y modelos de frontera.</p>
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
    <section class="scene" id="ch-11-workbench" data-section="ch-11-workbench" data-era="future">
      <div class="sec-head" data-rv>
        <span class="k"><b>11.B</b> — El Oráculo Cuántico &amp; Las Nuevas Fronteras</span>
        <span class="rule"></span>
        <span class="k">HORIZONTE ESPECULATIVO</span>
      </div>

      <div class="gate-grid" data-reveal>
        <div>
          <h3 class="display display--md" data-rv>El algoritmo que habita en superposición.</h3>
          <p class="body-text" data-rv>En computación cuántica, un qubit no es un cero o un uno, sino una esfera de Bloch de infinitas probabilidades continuas. Observa la preparación del estado de Bell en lenguaje Q#:</p>
          <div class="tcode" data-rv>
            <div class="tcode__bar">
              <span class="tcode__dots" aria-hidden="true"><i></i><i></i><i></i></span>
              <span class="tcode__file">entanglement_bell.qs</span>
              <button class="tcode__copy" data-copy type="button" aria-label="Copiar código">Copiar</button>
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
          <h3 class="display display--md" data-rv>Los cuatro dilemas de lo que vendrá.</h3>
          <p class="body-text" data-rv>Preguntas fundamentales que definirán el software de la próxima generación:</p>
          <div class="cur" data-rv>
            <div class="les">
              <span class="k">01</span>
              <div>
                <h3>Criptografía Post-Cuántica <em>Resistencia al algoritmo de Shor</em></h3>
                <p>Reescribir la seguridad bancaria y de comunicaciones antes de que los qubits rompan el cifrado RSA.</p>
              </div>
              <i class="bar" aria-hidden="true"></i>
            </div>
            <div class="les">
              <span class="k">02</span>
              <div>
                <h3>Verificación Formal de IA <em>Garantías matemáticas inmutables</em></h3>
                <p>Pruebas de corrección lógica para agentes autónomos que toman decisiones en tiempo real.</p>
              </div>
              <i class="bar" aria-hidden="true"></i>
            </div>
            <div class="les">
              <span class="k">03</span>
              <div>
                <h3>Almacenamiento en ADN <em>Densidad molecular extrema</em></h3>
                <p>Guardar todos los repositorios de código de la humanidad en unos gramos de material biológico durante milenios.</p>
              </div>
              <i class="bar" aria-hidden="true"></i>
            </div>
            <div class="les">
              <span class="k">04</span>
              <div>
                <h3>El Lenguaje Humano como Código <em>La interfaz definitiva</em></h3>
                <p>¿Seguiremos escribiendo sintaxis formal o la arquitectura del pensamiento abstracto será la única herramienta?</p>
              </div>
              <i class="bar" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

function chapterStats(ch: ChapterMeta): Array<{ val: string; label: string }> {
  switch (ch.id) {
    case 'ch-01-before-code':
      return [
        { val: '1843', label: 'Primer Algoritmo' },
        { val: '24,000', label: 'Engranajes de Bronce' },
        { val: 'Nota G', label: 'Manuscrito Original' },
        { val: '∞', label: 'Legado Vivo' },
      ];
    case 'ch-02-machines':
      return [
        { val: '1936', label: 'Máquina Universal' },
        { val: '2,400', label: 'Relés Zuse Z3' },
        { val: '5,000 c/s', label: 'Lectura Colossus' },
        { val: 'Binario', label: 'Lógica Booleana' },
      ];
    case 'ch-03-computers':
      return [
        { val: '1945', label: 'ENIAC Operativo' },
        { val: '18,000', label: 'Válvulas de Vacío' },
        { val: 'von Neumann', label: 'Arquitectura' },
        { val: '167 m²', label: 'Superficie' },
      ];
    case 'ch-04-languages':
      return [
        { val: '1957', label: 'Fortran I' },
        { val: 'A-0', label: 'Primer Compilador' },
        { val: 'COBOL', label: 'Estándar Global' },
        { val: 'Lisp', label: 'Cálculo Lambda' },
      ];
    case 'ch-05-systems':
      return [
        { val: '1972', label: 'Nacimiento de C' },
        { val: 'Unix', label: 'Filosofía Modular' },
        { val: 'PDP-11', label: 'Hardware Clave' },
        { val: 'POSIX', label: 'Estándar Universal' },
      ];
    case 'ch-06-oop':
      return [
        { val: '1972', label: 'Nacimiento Smalltalk' },
        { val: 'Xerox PARC', label: 'Cuna de la GUI' },
        { val: 'C++', label: 'Stroustrup (1985)' },
        { val: 'Objetos', label: 'Paradigma Vivo' },
      ];
    case 'ch-07-modern':
      return [
        { val: '1991', label: 'Python de Guido' },
        { val: '1995', label: 'Java & la JVM' },
        { val: '+700', label: 'Lenguajes Vivos' },
        { val: 'Open Source', label: 'Revolución Global' },
      ];
    case 'ch-08-web':
      return [
        { val: '1989', label: 'Tim Berners-Lee' },
        { val: '10 Días', label: 'Génesis de JS' },
        { val: '5.4B', label: 'Personas en Línea' },
        { val: 'V8 / Web', label: 'Plataforma Global' },
      ];
    case 'ch-09-systems':
      return [
        { val: '2009', label: 'Go en Google' },
        { val: '2010', label: 'Rust y Safety' },
        { val: '0 Races', label: 'Borrow Checker' },
        { val: 'Concurrencia', label: 'Escala Masiva' },
      ];
    case 'ch-10-ai':
      return [
        { val: '2012', label: 'Revolución Deep Learning' },
        { val: '2017', label: 'Atención / Transformer' },
        { val: 'Trillones', label: 'Parámetros' },
        { val: 'Copilot', label: 'Síntesis Asistida' },
      ];
    case 'ch-11-future':
      return [
        { val: '53 Qubits', label: 'Supremacía Cuántica' },
        { val: '|0⟩ + |1⟩', label: 'Superposición' },
        { val: 'AGI', label: 'Horizonte Teórico' },
        { val: '∞', label: 'El Próximo Capítulo' },
      ];
    default:
      return [
        { val: ch.yearLabel, label: 'Época' },
        { val: String(ch.number).padStart(2, '0'), label: 'Capítulo' },
        { val: SIDE_LABELS[ch.era] ?? ch.era, label: 'Dominio' },
        { val: 'Activo', label: 'Estado' },
      ];
  }
}

function chapterExtraNarrative(ch: ChapterMeta): string {
  switch (ch.id) {
    case 'ch-01-before-code':
      return 'Lovelace vio más allá del cálculo aritmético: intuyó que cualquier relación simbólica —música, imágenes, lógica— podía manipularse si una máquina seguía las reglas adecuadas.';
    case 'ch-02-machines':
      return 'Los relés electromagnéticos abrían y cerraban circuitos en milisegundos, convirtiendo la matemática booleana en corriente física medible y dando vida a la primera computación programable.';
    case 'ch-03-computers':
      return 'Las computadoras electrónicas sustituyeron la inercia mecánica por el flujo de electrones a través de tubos de vacío, multiplicando por diez mil la velocidad de cómputo y dando origen a la ingeniería de software con misiones críticas como el Apolo.';
    case 'ch-04-languages':
      return 'Los compiladores democratizaron la programación: ya no era necesario memorizar secuencias binarias en tarjetas perforadas; el pensamiento abstracto y la notación matemática se convertían directamente en software ejecutable.';
    case 'ch-05-systems':
      return 'La filosofía de Unix —pequeños programas que hacen una sola cosa y se combinan entre sí mediante tuberías— junto a la precisión de C, estableció el contrato arquitectónico que gobierna la infraestructura de la civilización.';
    case 'ch-06-oop':
      return 'En Xerox PARC, Alan Kay y su equipo concibieron el software como una biología digital de células autónomas que se comunican intercambiando mensajes. De este salto nacieron las ventanas, el ratón, los iconos y el paradigma de objetos que modeló el software moderno.';
    case 'ch-07-modern':
      return 'La década de 1990 presenció la explosión cámbrica del código: lenguajes diseñados para la productividad humana, la portabilidad absoluta entre arquitecturas (la JVM de Java) y la expresividad elegante (Python, Ruby) democratizaron la creación de software en todo el mundo.';
    case 'ch-08-web':
      return 'Concebida en el CERN para enlazar documentos científicos estáticos, la World Wide Web mutó en el sistema operativo global de la humanidad. JavaScript, creado por Brendan Eich en apenas diez días de mayo de 1995, se convirtió en el lenguaje más ejecutado del planeta.';
    case 'ch-09-systems':
      return 'Frente a centros de datos a escala planetaria y procesadores con decenas de núcleos, la industria demandó un nuevo rigor: Go simplificó la concurrencia en la nube con goroutines ligeras, mientras Rust erradicó las vulnerabilidades de memoria sin necesidad de un recolector de basura.';
    case 'ch-10-ai':
      return 'El código ha dejado de ser exclusivamente una redacción humana artesanal. Las redes neuronales profundas y la arquitectura Transformer comprenden patrones semánticos complejos, permitiendo que humanos y máquinas dialoguen en lenguaje natural para sintetizar software en tiempo real.';
    case 'ch-11-future':
      return 'Desde procesadores cuánticos que operan en superposición y entrelazamiento hasta la verificación formal de software crítico y la computación biológica, la frontera del código se prepara para resolver preguntas que hasta hoy considerábamos imposibles.';
    default:
      return 'Cada avance en los lenguajes de programación ha sido un paso más para acercar la intención humana a la ejecución del silicio.';
  }
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
  return sections.join('\n');
}