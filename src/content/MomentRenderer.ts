import { esc } from './ChroniclesContent';
import type { Moment } from '../chapters/Moments';
import { getCharacter } from '../data/characters';
import { getMachine } from '../data/machines';
import { getArtifact } from '../data/artifacts';
import { getEvent } from '../data/events';
import { getLanguage } from '../data/languages';
import { getCodeSample } from '../data/code';
import type { CharacterEntry } from '../data/types';
import { influenceTreeSVG } from '../history/InfluenceSVG';
import { interactiveTimelineMarkup, bindInteractiveTimeline } from '../history/InteractiveTimeline';
import { comparisonMarkup, bindComparison } from '../interactions/LanguageComparison';

function layoutClass(m: Moment): string {
  switch (m.layout) {
    case 'center':
      return 'scene scene--center';
    case 'right':
      return 'scene scene--right';
    default:
      return 'scene scene--left';
  }
}

function dataCard(m: Moment): string {
  const ref = m.dataRef;
  if (!ref) return '';
  const char = getCharacter(ref);
  const machine = getMachine(ref);
  const artifact = getArtifact(ref);
  const event = getEvent(ref);

  const arIcon = `<span class="card-ar" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" width="13" height="13"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg></span>`;

  if (char) return characterCard(char, m);
  if (machine) {
    return `
      <aside class="scene__aside card" data-card="${m.id}" data-rv="up">
        ${arIcon}
        <p class="eyebrow eyebrow--accent">Máquina</p>
        <h3 class="display display--md">${esc(machine.name)}</h3>
        <p class="meta">${esc(machine.creator)} · ${machine.year}</p>
        <p class="body-text">${esc(machine.description)}</p>
        <div class="card-meta"><span>Máquina histórica</span><span>${machine.year}</span></div>
      </aside>`;
  }
  if (artifact) {
    return `
      <aside class="scene__aside card" data-card="${m.id}" data-rv="up">
        ${arIcon}
        <p class="eyebrow eyebrow--accent">Artefacto</p>
        <h3 class="display display--md">${esc(artifact.name)}</h3>
        <p class="meta">${artifact.year ? `${artifact.year} · ` : ''}${esc(artifact.type)}</p>
        <p class="body-text">${esc(artifact.context)}</p>
        <div class="card-meta"><span>${esc(artifact.type)}</span><span>${artifact.year ?? '—'}</span></div>
      </aside>`;
  }
  if (event) {
    return `
      <aside class="scene__aside card" data-card="${m.id}" data-rv="up">
        ${arIcon}
        <p class="eyebrow eyebrow--accent">Acontecimiento</p>
        <h3 class="display display--md">${esc(event.title)}</h3>
        <p class="meta">${event.year ?? ''}</p>
        <p class="body-text">${esc(event.description)}</p>
        <div class="card-meta"><span>Hito temporal</span><span>${event.year ?? '—'}</span></div>
      </aside>`;
  }
  return '';
}

function characterCard(char: CharacterEntry, m: Moment): string {
  const arIcon = `<span class="card-ar" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" width="13" height="13"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg></span>`;
  return `
    <aside class="scene__aside card scene__character" data-card="${m.id}" data-rv="up">
      ${arIcon}
      <div class="character__eyebrow">
        <p class="eyebrow eyebrow--accent">Figura histórica</p>
        <p class="meta">${esc(char.representation)}</p>
      </div>
      <h3 class="display display--md character__name">${esc(char.name)}</h3>
      <p class="meta character__years">${esc(char.years)}</p>
      <span class="rule rule--short" aria-hidden="true"></span>
      <p class="character__tags meta">${esc(char.profession)}</p>
      ${char.quote ? `<blockquote class="scene__quote character__quote"><p>“${esc(char.quote)}”</p></blockquote>` : ''}
      <div class="card-meta"><span>${esc(char.profession.split('·')[0].trim())}</span><span>${esc(char.years)}</span></div>
    </aside>`;
}

function quoteMoment(m: Moment): string {
  return `
    <div class="scene__content scene--center__inner" data-reveal>
      <blockquote class="scene__quote" data-rv>
        “${esc(m.title ?? '')}”
        ${m.subtitle ? `<footer data-rv>${esc(m.subtitle)}</footer>` : ''}
      </blockquote>
    </div>`;
}

function resolveCode(m: Moment): { code: string; file: string; note: string } {
  const fallback = {
    code: bernoulliSketch(),
    file: 'algoritmo · 1843',
    note: 'Reconstrucción esquemática — interpretación histórica',
  };
  if (!m.dataRef) return fallback;

  const sample = getCodeSample(m.dataRef);
  if (sample) {
    return {
      code: sample.code
        .split('\n')
        .map((l) => `<span class="blink">${esc(l)}</span>`)
        .join('<br/>'),
      file: `${sample.language} · ${sample.year}`,
      note: sample.explanation,
    };
  }

  const lang = getLanguage(m.dataRef);
  if (lang?.codeSample) {
    return {
      code: lang.codeSample
        .split('\n')
        .map((l) => `<span class="blink">${esc(l)}</span>`)
        .join('<br/>'),
      file: `${lang.name} · ${lang.year}`,
      note: lang.historicalContext,
    };
  }

  return fallback;
}

function codeMoment(m: Moment): string {
  const resolved = resolveCode(m);
  const code = resolved.code;
  const explore =
    m.dataRef && m.type === 'code'
      ? `<a class="discover-link" href="#" data-discover="${esc(m.dataRef)}" data-rv><span class="plus">+</span>¿Qué significa?</a>`
      : '';
  return `
    <div class="scene__content" data-reveal>
      <p class="eyebrow eyebrow--accent" data-rv>${esc(m.eyebrow ?? '')}</p>
      <h3 class="display display--md" data-rv>${esc(m.title ?? '')}</h3>
      ${m.body ? `<p class="body-text" data-rv>${esc(m.body)}</p>` : ''}
      <div class="tcode" data-rv>
        <div class="tcode__bar">
          <span class="tcode__dots" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="tcode__file">${esc(resolved.file)}</span>
          <button class="tcode__copy" data-copy type="button" aria-label="Copiar el código">Copiar</button>
        </div>
        <pre class="tcode__body" aria-label="${esc(resolved.file)}">${code}<span class="tcode__caret" aria-hidden="true"></span></pre>
      </div>
      <p class="meta" data-rv>${esc(resolved.note)}</p>
      ${explore}
    </div>`;
}

function bernoulliSketch(): string {
  const lines = [
    '  v0  ← n            // variable 1',
    '  v1  ← m            // variable 2',
    '  v2  ← 2            // index counter',
    '  v3  ← 0            // sum accumulator',
    '  ',
    '  # Loop: compute next Bernoulli term',
    '  T ← 1 / (v2 + 1)',
    '  A ← 0',
    '  B ← v2 / 2',
    '  ...',
    '  result ← v3        // Bernoulli number B(n)',
  ];
  return lines.map((l) => `<span class="blink">${esc(l)}</span><br/>`).join('\n');
}

function transitionMoment(m: Moment): string {
  return `
    <div class="scene__transition" data-reveal>
      <p class="eyebrow eyebrow--accent" data-rv>${esc(m.eyebrow ?? '')}</p>
      <h3 class="display display--md" data-rv>${esc(m.title ?? '')}</h3>
      <p class="body-text" data-rv>${esc(m.body ?? '')}</p>
      <span class="rule rule--short" aria-hidden="true"></span>
      <p class="meta" data-rv>Desplázate →</p>
    </div>`;
}

function defaultMoment(m: Moment, extraHTML: string = ''): string {
  const inner = `
    <div class="scene__content" data-reveal>
      ${m.eyebrow ? `<p class="eyebrow eyebrow--accent" data-rv>${esc(m.eyebrow)}</p>` : ''}
      ${m.title ? `<h3 class="display display--md" data-rv>${esc(m.title)}</h3>` : ''}
      ${m.subtitle ? `<p class="lede" data-rv>${esc(m.subtitle)}</p>` : ''}
      ${m.body ? `<p class="body-text" data-rv>${esc(m.body)}</p>` : ''}
      ${dataCard(m)}
      ${m.dataRef ? `<a class="discover-link" href="#" data-discover="${esc(m.dataRef)}" data-rv><span class="plus">+</span>Explorar</a>` : ''}
      ${extraHTML}
    </div>`;
  return inner;
}

function rendererSwitch(m: Moment): string {
  switch (m.type) {
    case 'quote':
      return quoteMoment(m);
    case 'code':
      return codeMoment(m);
    case 'timeline':
      return defaultMoment(m, interactiveTimelineMarkup());
    case 'influences':
      return influencesMoment(m);
    case 'comparison':
      return comparisonMoment(m);
    case 'transition':
      return transitionMoment(m);
    default:
      return defaultMoment(m);
  }
}

function comparisonMoment(m: Moment): string {
  return `
    <div class="scene__content scene__content--compare" data-reveal>
      ${m.eyebrow ? `<p class="eyebrow eyebrow--accent" data-rv>${esc(m.eyebrow)}</p>` : ''}
      ${m.title ? `<h3 class="display display--md" data-rv>${esc(m.title)}</h3>` : ''}
      ${m.body ? `<p class="body-text lede" data-rv>${esc(m.body)}</p>` : ''}
      ${comparisonMarkup()}
    </div>`;
}

function influencesMoment(m: Moment): string {
  return `
    <div class="scene__content scene__content--wide" data-reveal>
      ${m.eyebrow ? `<p class="eyebrow eyebrow--accent" data-rv>${esc(m.eyebrow)}</p>` : ''}
      ${m.title ? `<h3 class="display display--md" data-rv>${esc(m.title)}</h3>` : ''}
      ${m.body ? `<p class="body-text" data-rv>${esc(m.body)}</p>` : ''}
      ${influenceTreeSVG()}
      <p class="meta" data-rv>Conexiones según influencia histórica documentada</p>
    </div>`;
}

export function renderMoment(m: Moment): string {
  const inner = rendererSwitch(m);
  return `<section class="${layoutClass(m)} scene--moment" data-moment="${m.id}" data-chapter="${m.chapterId}" id="${m.id}">${inner}</section>`;
}

export function renderMoments(chapterId: string, moments: Moment[]): string {
  return moments
    .filter((m) => m.chapterId === chapterId)
    .map(renderMoment)
    .join('\n');
}

/** Conecta timelines interactivos dentro del DOM ya montado. */
export function bindMomentInteractions(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('[data-timeline]').forEach((el) => {
    bindInteractiveTimeline(el.closest('.timeline-panel') ?? el);
  });
  root.querySelectorAll<HTMLElement>('[data-compare]').forEach((el) => {
    bindComparison(el.closest('.compare') ?? el);
  });
  root.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const pre = btn.closest('.tcode')?.querySelector<HTMLElement>('.tcode__body');
      const text = pre?.textContent?.replace(/\s+$/g, '') ?? '';
      void navigator.clipboard?.writeText(text);
      btn.classList.add('is-copied');
      btn.textContent = 'Copiado';
      window.setTimeout(() => {
        btn.classList.remove('is-copied');
        btn.textContent = 'Copiar';
      }, 1800);
    });
  });
}