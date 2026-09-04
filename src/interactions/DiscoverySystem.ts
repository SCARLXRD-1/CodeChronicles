import { getSourcesFor } from '../data/sources';
import { getCharacter } from '../data/characters';
import { getLanguage } from '../data/languages';
import { getMachine } from '../data/machines';
import { getArtifact } from '../data/artifacts';
import { getEvent } from '../data/events';
import { esc } from '../content/ChroniclesContent';
import { tr } from '../i18n';

export type DiscoverKind =
  | 'character'
  | 'language'
  | 'machine'
  | 'artifact'
  | 'event'
  | 'source';

/**
 * DiscoverySystem
 * Abre un panel editorial con información de un registro histórico
 * (personaje, lenguaje, máquina, artefacto, evento) y sus fuentes verificables.
 */
export class DiscoverySystem {
  private overlay: HTMLElement;

  /** Se invoca cada vez que se abre una ficha, con el id y su tipo. */
  onDiscover?: (refId: string, kind: DiscoverKind) => void;

  constructor() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'discovery-overlay discovery';
    this.overlay.id = 'discovery-overlay';
    this.overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(this.overlay);

    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay || (e.target as HTMLElement).closest('.discovery__close')) {
        this.close();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  }

  open(refId: string) {
    const data = this.resolve(refId);
    if (!data) return;
    this.overlay.innerHTML = `
      <div class="discovery__panel" role="dialog" aria-modal="true">
        <button class="discovery__close" aria-label="${esc(tr('ui.menu.close'))}">✕</button>
        <div class="discovery__content">
          ${data.content}
          ${data.sourcesHtml}
        </div>
      </div>`;
    this.overlay.setAttribute('aria-hidden', 'false');
    this.overlay.classList.add('is-open');
    this.onDiscover?.(refId, data.kind);
  }

  close() {
    this.overlay.classList.remove('is-open');
    this.overlay.setAttribute('aria-hidden', 'true');
  }

  private sourcesHtml(refId: string): string {
    const sources = getSourcesFor(refId);
    if (sources.length === 0) return '';
    return `
      <div class="discovery__sources">
        <p class="sources__label">Fuentes</p>
        ${sources
          .map(
            (s) => `
          <div class="source-item">
            <p class="source-item__title">${esc(s.title)}</p>
            ${s.note ? `<p class="source-item__meta">${esc(s.note)}</p>` : ''}
            ${s.url ? `<a class="source-item__link" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">Ver fuente ↗</a>` : ''}
          </div>`,
          )
          .join('\n')}
      </div>`;
  }

  private resolve(refId: string): { content: string; sourcesHtml: string; kind: DiscoverKind } | null {
    // 1. Personajes históricos
    const c = getCharacter(refId);
    if (c) {
      const prof = tr(`card.char.${c.id}.profession`) || c.profession;
      const quote = tr(`card.char.${c.id}.quote`) || c.quote;
      const desc = tr(`card.char.${c.id}.desc`) || c.description;
      const rep = tr(`ui.representation.${c.representation}`) || c.representation;
      return {
        kind: 'character',
        content: `
          <p class="eyebrow eyebrow--accent">${esc(tr('ui.kind.character'))} · ${esc(rep)}</p>
          <h2 class="display display--lg discovery__title">${esc(c.name)}</h2>
          <p class="discovery__meta">${esc(c.years)} · ${esc(prof)}</p>
          <span class="rule rule--short" aria-hidden="true"></span>
          <p class="lede">${esc(c.contribution)}</p>
          <p class="discovery__body">${esc(desc)}</p>
          ${quote ? `<blockquote class="scene__quote">“${esc(quote)}”</blockquote>` : ''}
          <div class="tags">${c.related.map((r) => `<span class="tag">${esc(r)}</span>`).join('')}</div>`,
        sourcesHtml: this.sourcesHtml(refId),
      };
    }

    // 2. Lenguajes de programación
    const l = getLanguage(refId);
    if (l) {
      const problem = tr(`card.lang.${l.id}.context`) || l.problemSolved;
      const context = tr(`card.lang.${l.id}.desc`) || l.historicalContext;
      return {
        kind: 'language',
        content: `
          <p class="eyebrow eyebrow--accent">${esc(tr('ui.kind.language'))} · ${l.year}</p>
          <h2 class="display display--lg discovery__title">${esc(l.name)}</h2>
          <p class="discovery__meta">${esc(l.creators.join(', '))}</p>
          <span class="rule rule--short" aria-hidden="true"></span>
          <p class="lede">${esc(problem)}</p>
          <p class="discovery__body">${esc(context)}</p>
          <div class="tags">
            ${l.paradigms.map((p) => `<span class="tag">${esc(tr('paradigm.' + p.toLowerCase().replace(/[^a-z0-9]/g, '_'), p))}</span>`).join('')}
          </div>
          ${l.influences.length ? `<div class="tags"><p class="sources__label">${esc(tr('ui.influences'))}</p>${l.influences.map((i) => `<span class="tag">${esc(i)}</span>`).join('')}</div>` : ''}
          ${l.influenced.length ? `<div class="tags"><p class="sources__label">${esc(tr('ui.influenced'))}</p>${l.influenced.map((i) => `<span class="tag">${esc(i)}</span>`).join('')}</div>` : ''}`,
        sourcesHtml: this.sourcesHtml(refId),
      };
    }

    // 3. Máquinas y hardware
    const m = getMachine(refId);
    if (m) {
      const desc = tr(`card.machine.${m.id}.desc`) || m.description;
      return {
        kind: 'machine',
        content: `
          <p class="eyebrow eyebrow--accent">${esc(tr('ui.kind.machine'))} · ${m.year}</p>
          <h2 class="display display--lg discovery__title">${esc(m.name)}</h2>
          <p class="discovery__meta">${esc(m.creator)} · ${esc(m.type)}</p>
          <span class="rule rule--short" aria-hidden="true"></span>
          <p class="discovery__body">${esc(desc)}</p>
          <ul class="discovery__body">
            ${m.technicalNotes.map((n) => `<li>${esc(n)}</li>`).join('')}
          </ul>`,
        sourcesHtml: this.sourcesHtml(refId),
      };
    }

    // 4. Hitos y momentos clave (eventos)
    const event = getEvent(refId);
    if (event) {
      const eTitle = tr(`card.event.${event.id}.title`) || event.title;
      const eDesc = tr(`card.event.${event.id}.desc`) || event.description;
      return {
        kind: 'event',
        content: `
          <p class="eyebrow eyebrow--accent">${esc(tr('ui.kind.event'))} · ${event.year}</p>
          <h2 class="display display--lg discovery__title">${esc(eTitle)}</h2>
          <p class="discovery__meta">${esc(event.dateLabel ?? String(event.year))} · ${esc(event.category)}</p>
          <span class="rule rule--short" aria-hidden="true"></span>
          <p class="discovery__body">${esc(eDesc)}</p>
          ${event.related?.length ? `<div class="tags">${event.related.map((r) => `<span class="tag">${esc(r)}</span>`).join('')}</div>` : ''}`,
        sourcesHtml: this.sourcesHtml(refId),
      };
    }

    // 5. Artefactos históricos
    const artifact = getArtifact(refId);
    if (artifact) {
      return {
        kind: 'artifact',
        content: `
          <p class="eyebrow eyebrow--accent">${esc(tr('ui.kind.artifact'))} · ${artifact.year ?? ''} ${esc(artifact.type)}</p>
          <h2 class="display display--lg discovery__title">${esc(artifact.name)}</h2>
          <span class="rule rule--short" aria-hidden="true"></span>
          <p class="discovery__body">${esc(artifact.context)}</p>`,
        sourcesHtml: this.sourcesHtml(refId),
      };
    }

    return null;
  }

  bind() {
    const links = document.querySelectorAll<HTMLElement>('[data-discover]');
    links.forEach((el) => {
      let touchStartX = 0;
      let touchStartY = 0;
      let touchMoved = false;

      el.addEventListener(
        'touchstart',
        (e) => {
          if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            touchMoved = false;
          }
        },
        { passive: true },
      );

      el.addEventListener(
        'touchmove',
        (e) => {
          if (e.touches.length === 1) {
            const dx = Math.abs(e.touches[0].clientX - touchStartX);
            const dy = Math.abs(e.touches[0].clientY - touchStartY);
            if (dx > 12 || dy > 12) {
              touchMoved = true;
            }
          }
        },
        { passive: true },
      );

      el.addEventListener('touchend', (e) => {
        if (!touchMoved) {
          const id = el.getAttribute('data-discover');
          if (id) {
            e.preventDefault();
            this.open(id);
          }
        }
      });

      el.addEventListener('click', (e) => {
        e.preventDefault();
        const id = el.getAttribute('data-discover');
        if (id) this.open(id);
      });
    });
  }

  dispose() {
    this.overlay.remove();
  }
}