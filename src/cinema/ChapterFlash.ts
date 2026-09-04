import type { ChapterMeta } from '../data/chapters';
import { tr } from '../i18n';

/**
 * ChapterFlash
 * Transición cinematográfica de capítulo: sobre un velo con acento del
 * capítulo aparecen el número (silueta) + título + año, mientras unas
 * barras de letterbox se cierran y reabren. Se desactiva con
 * prefers-reduced-motion (no se crea ni se anima).
 */
export class ChapterFlash {
  private el: HTMLElement | null = null;
  private timer = 0;
  private readonly reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  public onFlash?: (chapter: ChapterMeta) => void;

  constructor() {
    if (this.reduce) return;
    this.el = document.createElement('div');
    this.el.className = 'flash';
    this.el.innerHTML = `
      <div class="lb lb--top" aria-hidden="true"></div>
      <div class="lb lb--bottom" aria-hidden="true"></div>
      <div class="flash__veil" aria-hidden="true"></div>
      <span class="flash__num" aria-hidden="true"></span>
      <span class="flash__label" aria-hidden="true"></span>
      <span class="flash__year" aria-hidden="true"></span>`;
    document.body.appendChild(this.el);
  }

  show(chapter: ChapterMeta) {
    if (!this.el || this.reduce) return;
    this.onFlash?.(chapter);
    const num = this.el.querySelector<HTMLElement>('.flash__num')!;
    const label = this.el.querySelector<HTMLElement>('.flash__label')!;
    const year = this.el.querySelector<HTMLElement>('.flash__year')!;
    num.textContent = String(chapter.number).padStart(2, '0');
    label.textContent = tr(`ch.${chapter.id}.title`) || chapter.title;
    year.textContent = chapter.yearLabel ?? '';
    this.el.style.setProperty('--flash-accent', chapter.color);
    this.el.classList.remove('is-on');
    void this.el.offsetWidth; // reiniciar animaciones
    this.el.classList.add('is-on');
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      this.el?.classList.remove('is-on');
    }, 1150);
  }

  dispose() {
    window.clearTimeout(this.timer);
    this.el?.remove();
  }
}