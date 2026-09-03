import { getSourcesFor } from '../data/sources';
import { getCharacter } from '../data/characters';
import { getLanguage } from '../data/languages';
import { getMachine } from '../data/machines';
import { getArtifact } from '../data/artifacts';
import { getEvent } from '../data/events';
import { sourceRegistry } from '../data/sources';
import { esc } from '../content/ChroniclesContent';

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
    this.overlay.className = 'discovery';
    this.overlay.setAttribute('role', 'dialog');
    this.overlay.setAttribute('aria-modal', 'true');
    this.overlay.setAttribute('aria-label', 'Ficha histórica');
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
      <div class="discovery__panel">
        <button class="discovery__close" aria-label="Cerrar">✕</button>
        <div class="discovery__content">
          ${data.content}
          ${data.sourcesHtml}
        </div>
      </div>`;
    this.overlay.classList.add('is-open');
    this.onDiscover?.(refId, data.kind);
  }

  close() {
    this.overlay.classList.remove('is-open');
  }

  private sourcesHtml(refId: string): string {
    const sources = getSourcesFor(refId);
    if (sources.length === 0) return '';
    return `
      <div class="sources">
        <p class="sources__label">Fuentes</p>
        ${sources
          .map(
            (s) => `
            <div class="source-item">
              <span>${esc(s.title)}</span>
              ${s.url ? `<a href="${esc(s.url)}" target="_blank" rel="noopener">visitar</a>` : ''}
            </div>`,
          )
          .join('\n')}
      </div>`;
  }

  private resolve(refId: string): { content: string; sourcesHtml: string; kind: DiscoverKind } | null {
    const registryEntry = sourceRegistry.find((r) => r.id === refId);
    if (registryEntry) {
      if (registryEntry.kind === 'character') {
        const c = getCharacter(refId)!;
        return {
          kind: 'character',
          content: `
            <p class="eyebrow eyebrow--accent">Figura histórica ${esc(c.representation)}</p>
            <h2 class="display display--lg discovery__title">${esc(c.name)}</h2>
            <p class="discovery__meta">${esc(c.years)}</p>
            <span class="rule rule--short" aria-hidden="true"></span>
            <p class="lede">${esc(c.contribution)}</p>
            <p class="discovery__body">${esc(c.description)}</p>
            ${c.quote ? `<blockquote class="scene__quote">“${esc(c.quote)}”</blockquote>` : ''}
            <div class="tags">${c.related.map((r) => `<span class="tag">${esc(r)}</span>`).join('')}</div>`,
          sourcesHtml: this.sourcesHtml(refId),
        };
      }
      if (registryEntry.kind === 'language') {
        const l = getLanguage(refId)!;
        return {
          kind: 'language',
          content: `
            <p class="eyebrow eyebrow--accent">Lenguaje · ${l.year}</p>
            <h2 class="display display--lg discovery__title">${esc(l.name)}</h2>
            <p class="discovery__meta">${esc(l.creators.join(', '))}</p>
            <span class="rule rule--short" aria-hidden="true"></span>
            <p class="lede">${esc(l.problemSolved)}</p>
            <p class="discovery__body">${esc(l.historicalContext)}</p>
            <div class="tags">
              ${l.paradigms.map((p) => `<span class="tag">${esc(p)}</span>`).join('')}
            </div>
            ${l.influences.length ? `<div class="tags"><p class="sources__label">Influencias</p>${l.influences.map((i) => `<span class="tag">${esc(i)}</span>`).join('')}</div>` : ''}
            ${l.influenced.length ? `<div class="tags"><p class="sources__label">Influyó en</p>${l.influenced.map((i) => `<span class="tag">${esc(i)}</span>`).join('')}</div>` : ''}`,
          sourcesHtml: this.sourcesHtml(refId),
        };
      }
      if (registryEntry.kind === 'machine') {
        const m = getMachine(refId)!;
        return {
          kind: 'machine',
          content: `
            <p class="eyebrow eyebrow--accent">Máquina · ${m.year}</p>
            <h2 class="display display--lg discovery__title">${esc(m.name)}</h2>
            <p class="discovery__meta">${esc(m.creator)} · ${esc(m.type)}</p>
            <span class="rule rule--short" aria-hidden="true"></span>
            <p class="discovery__body">${esc(m.description)}</p>
            <ul class="discovery__body">
              ${m.technicalNotes.map((n) => `<li>${esc(n)}</li>`).join('')}
            </ul>`,
          sourcesHtml: this.sourcesHtml(refId),
        };
      }
      return null;
    }

    // Eventos y artefactos (no indexados por kind, resolvemos directamente)
    const event = getEvent(refId);
    if (event) {
      return {
        kind: 'event',
        content: `
          <p class="eyebrow eyebrow--accent">Acontecimiento · ${event.year}</p>
          <h2 class="display display--lg discovery__title">${esc(event.title)}</h2>
          <span class="rule rule--short" aria-hidden="true"></span>
          <p class="discovery__body">${esc(event.description)}</p>`,
        sourcesHtml: this.sourcesHtml(refId),
      };
    }
    const artifact = getArtifact(refId);
    if (artifact) {
      return {
        kind: 'artifact',
        content: `
          <p class="eyebrow eyebrow--accent">Artefacto · ${artifact.year ?? ''} ${esc(artifact.type)}</p>
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