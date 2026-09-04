import type { ChapterMeta } from '../data/chapters';

/**
 * CRTOverlay
 * Líneas de escaneo y aberración tipo monitor de fósforo/CRT
 * que aparecen sutilmente en las eras tempranas (1800s - 1970s)
 * y se desvanecen por completo en las eras modernas y cuánticas.
 */
export class CRTOverlay {
  private el: HTMLElement | null = null;
  private readonly reduceMotion: boolean;

  constructor() {
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.reduceMotion) return;

    this.el = document.createElement('div');
    this.el.id = 'crt-overlay';
    this.el.setAttribute('aria-hidden', 'true');
    document.body.appendChild(this.el);
  }

  setChapter(chapter: ChapterMeta) {
    if (!this.el || this.reduceMotion) return;

    // Escalonamiento de opacidad según era tecnológica
    let opacity = 0;
    const num = chapter.number;

    if (num <= 2) {
      // Orígenes mecánicos y primeras máquinas
      opacity = 0.085;
    } else if (num <= 4) {
      // Tubos de vacío y primeros compiladores
      opacity = 0.055;
    } else if (num <= 6) {
      // Unix, C y primeros microprocesadores
      opacity = 0.03;
    } else {
      // Era moderna, internet, IA y cuántica: nítido
      opacity = 0;
    }

    this.el.style.opacity = String(opacity);
  }

  dispose() {
    this.el?.remove();
    this.el = null;
  }
}
