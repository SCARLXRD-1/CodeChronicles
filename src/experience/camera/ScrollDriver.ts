/**
 * ScrollDriver
 * Normaliza el progreso global del scroll (0..1) y expone segmentos (0..totalSections)
 * para que la cámara y las escenas avancen por tramos lineales.
 */

export interface ScrollSnapshot {
  /** Progreso global 0..1 */
  progress: number;
  /** Índice de segmento actual (0..sections-1) */
  section: number;
  /** Progreso dentro del segmento 0..1 */
  sectionProgress: number;
  /** Valor crudo del scroll en píxeles */
  scrollY: number;
  /** Altura del documento */
  scrollHeight: number;
  /** Altura del viewport */
  viewportHeight: number;
}

export class ScrollDriver {
  private scrollY = 0;
  private viewportHeight = window.innerHeight;
  private documentHeight = 0;
  private reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  constructor(private readonly sections = 12) {
    this.onScroll = this.onScroll.bind(this);
    this.onResize = this.onResize.bind(this);
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onResize);
    document.addEventListener('DOMContentLoaded', () => this.measure());
    this.measure();
  }

  private measure() {
    this.documentHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.getElementById('overlay')?.scrollHeight || 0,
      document.getElementById('app')?.scrollHeight || 0,
    );
  }

  private onScroll() {
    this.scrollY =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (this.reduceMotion) {
      window.scrollTo({ top: 0 });
    }
  }

  private onResize() {
    this.viewportHeight = window.innerHeight;
    this.measure();
  }

  private manualProgress: number | null = null;
  private manualPixels = 0;

  public setProgress(progress: number, rawPixels = 0) {
    this.manualProgress = Math.max(0, Math.min(1, progress));
    this.manualPixels = rawPixels;
  }

  snapshot(): ScrollSnapshot {
    if (this.documentHeight <= this.viewportHeight) {
      this.measure();
    }
    const max = Math.max(1, this.documentHeight - this.viewportHeight);
    const currY =
      this.manualProgress !== null
        ? this.manualPixels
        : window.scrollY ||
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          this.scrollY;
    const progress = this.reduceMotion
      ? 0
      : this.manualProgress !== null
        ? this.manualProgress
        : Math.min(1, Math.max(0, currY / max));
    const scaled = progress * this.sections;
    const section = Math.min(this.sections - 1, Math.floor(scaled));
    const sectionProgress = scaled - Math.floor(scaled);

    return {
      progress,
      section,
      sectionProgress,
      scrollY: currY,
      scrollHeight: this.documentHeight,
      viewportHeight: this.viewportHeight,
    };
  }

  getSections() {
    return this.sections;
  }

  setScrollY(v: number) {
    this.scrollY = v;
  }

  dispose() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }
}