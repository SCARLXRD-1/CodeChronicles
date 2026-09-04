import { chapters, type ChapterMeta, getChapter } from '../data/chapters';

export interface TimelineRibbonOptions {
  container: HTMLElement;
  onProgress?: (progress: number, velocity: number, currentX: number) => void;
  onActiveChapter?: (chapter: ChapterMeta) => void;
}

export class TimelineRibbon {
  private container: HTMLElement;
  private track: HTMLElement | null = null;
  private cursor: HTMLElement | null = null;

  private currentX = 0;
  private targetX = 0;
  private maxScrollX = 1;
  private velocity = 0;
  private lastX = 0;

  private rafId = 0;
  private isTouching = false;
  private touchStartX = 0;
  private touchStartY = 0;
  private touchLastX = 0;
  private touchVelocity = 0;

  private stations: Array<{
    element: HTMLElement;
    id: string;
    chapter?: ChapterMeta;
    left: number;
    width: number;
  }> = [];

  private activeChapterId: string | null = null;
  private onProgressCb?: (progress: number, velocity: number, currentX: number) => void;
  private onActiveChapterCb?: (chapter: ChapterMeta) => void;

  constructor(options: TimelineRibbonOptions) {
    this.container = options.container;
    this.onProgressCb = options.onProgress;
    this.onActiveChapterCb = options.onActiveChapter;

    this.onWheel = this.onWheel.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onResize = this.onResize.bind(this);
    this.tick = this.tick.bind(this);

    this.mount();
  }

  public mount() {
    this.track = this.container.querySelector<HTMLElement>('#timeline-ribbon-track');
    this.cursor = this.container.querySelector<HTMLElement>('#timeline-ribbon-cursor');

    this.measure();
    this.attachEvents();
    this.rafId = requestAnimationFrame(this.tick);
  }

  public measure() {
    if (!this.track) return;
    const viewportW = window.innerWidth;
    const totalW = this.track.scrollWidth;
    this.maxScrollX = Math.max(1, totalW - viewportW);

    const stationEls = [
      ...this.track.querySelectorAll<HTMLElement>('.hero, .scene, .epilogue'),
    ];

    this.stations = stationEls.map((el) => {
      const id =
        el.getAttribute('data-section') ||
        el.getAttribute('data-chapter') ||
        el.getAttribute('id') ||
        '';
      const chapter = getChapter(id);
      return {
        element: el,
        id,
        chapter,
        left: el.offsetLeft,
        width: el.offsetWidth,
      };
    });
  }

  private attachEvents() {
    window.addEventListener('wheel', this.onWheel, { passive: false });
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('touchstart', this.onTouchStart, { passive: true });
    window.addEventListener('touchmove', this.onTouchMove, { passive: false });
    window.addEventListener('touchend', this.onTouchEnd, { passive: true });
    window.addEventListener('resize', this.onResize, { passive: true });

    // Delegación de clics en enlaces de navegación interna hacia estaciones
    document.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.length > 1) {
        const id = href.slice(1);
        if (this.scrollToSection(id)) {
          e.preventDefault();
        }
      }
    });
  }

  private onWheel(e: WheelEvent) {
    // Si el usuario está scrolleando dentro de un elemento con scroll vertical activo
    const targetEl = e.target as HTMLElement | null;
    const scrollableParent = targetEl?.closest<HTMLElement>(
      '.modal__body, .discovery-drawer__body, pre, .tcode__body',
    );

    if (scrollableParent && scrollableParent.scrollHeight > scrollableParent.clientHeight) {
      const isAtTop = scrollableParent.scrollTop <= 0 && e.deltaY < 0;
      const isAtBottom =
        scrollableParent.scrollTop + scrollableParent.clientHeight >=
          scrollableParent.scrollHeight - 1 && e.deltaY > 0;

      // Si aún hay contenido vertical que recorrer en ese contenedor, no capturamos el wheel
      if (!isAtTop && !isAtBottom) {
        return;
      }
    }

    e.preventDefault();
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    const speedMultiplier = e.deltaMode === 1 ? 26 : 1.12;
    this.targetX = Math.max(
      0,
      Math.min(this.maxScrollX, this.targetX + delta * speedMultiplier),
    );
  }

  private onKeyDown(e: KeyboardEvent) {
    const activeEl = document.activeElement;
    if (activeEl && ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeEl.tagName)) {
      return;
    }

    const step = window.innerWidth * 0.45;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      this.targetX = Math.min(this.maxScrollX, this.targetX + step);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      this.targetX = Math.max(0, this.targetX - step);
    } else if (e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      this.targetX = Math.min(this.maxScrollX, this.targetX + window.innerWidth * 0.85);
    } else if (e.key === 'PageUp') {
      e.preventDefault();
      this.targetX = Math.max(0, this.targetX - window.innerWidth * 0.85);
    } else if (e.key === 'Home') {
      e.preventDefault();
      this.targetX = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      this.targetX = this.maxScrollX;
    }
  }

  private onTouchStart(e: TouchEvent) {
    if (e.touches.length !== 1) return;
    this.isTouching = true;
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
    this.touchLastX = this.touchStartX;
    this.touchVelocity = 0;
  }

  private onTouchMove(e: TouchEvent) {
    if (!this.isTouching || e.touches.length !== 1) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = this.touchLastX - currentX;
    const totalDeltaY = Math.abs(currentY - this.touchStartY);
    const totalDeltaX = Math.abs(currentX - this.touchStartX);

    if (totalDeltaX > totalDeltaY) {
      e.preventDefault();
      this.targetX = Math.max(0, Math.min(this.maxScrollX, this.targetX + deltaX * 1.3));
      this.touchVelocity = deltaX;
      this.touchLastX = currentX;
    }
  }

  private onTouchEnd() {
    this.isTouching = false;
    // Inercia táctil suave
    this.targetX = Math.max(
      0,
      Math.min(this.maxScrollX, this.targetX + this.touchVelocity * 8),
    );
  }

  private onResize() {
    this.measure();
  }

  public scrollToSection(id: string): boolean {
    if (!this.track) return false;
    const cleanId = id.replace(/^#/, '');
    const station = this.stations.find(
      (s) => s.id === cleanId || s.element.id === cleanId,
    );

    if (station) {
      const centerOffset = station.left - (window.innerWidth - station.width) / 2;
      this.targetX = Math.max(0, Math.min(this.maxScrollX, centerOffset));
      return true;
    }
    return false;
  }

  public scrollToChapter(number: number): boolean {
    const ch = chapters.find((c) => c.number === number);
    if (ch) return this.scrollToSection(ch.id);
    return false;
  }

  public scrollToProgress(p: number) {
    this.targetX = Math.max(0, Math.min(this.maxScrollX, p * this.maxScrollX));
  }

  public getProgress(): number {
    return this.maxScrollX > 0 ? this.currentX / this.maxScrollX : 0;
  }

  public getVelocity(): number {
    return this.velocity;
  }

  public getCurrentX(): number {
    return this.currentX;
  }

  public getMaxScrollX(): number {
    return this.maxScrollX;
  }

  private tick() {
    // Lerp suave (amortiguación cinemática)
    const factor = 0.082;
    this.currentX += (this.targetX - this.currentX) * factor;

    this.velocity = Math.abs(this.currentX - this.lastX);
    this.lastX = this.currentX;

    if (this.track) {
      this.track.style.transform = `translate3d(${-this.currentX.toFixed(2)}px, 0, 0)`;
    }

    const progress = this.getProgress();

    if (this.cursor) {
      this.cursor.style.left = `${(progress * 100).toFixed(2)}%`;
    }

    this.onProgressCb?.(progress, this.velocity, this.currentX);
    this.updateActiveStation();

    this.rafId = requestAnimationFrame(this.tick);
  }

  private updateActiveStation() {
    if (this.stations.length === 0) return;
    const vw = window.innerWidth;
    const viewCenter = this.currentX + vw / 2;

    let bestStation = this.stations[0];
    let minDistance = Infinity;

    for (const station of this.stations) {
      const stationCenter = station.left + station.width / 2;
      const rawDist = stationCenter - viewCenter;
      const normDist = rawDist / (vw * 0.88);
      const clampedDist = Math.max(-2.2, Math.min(2.2, normDist));
      const absDist = Math.abs(clampedDist);
      const sign = Math.sign(normDist);

      // Inyectar variables para el portal tridimensional y paralaje diferencial
      station.element.style.setProperty('--dist', clampedDist.toFixed(4));
      station.element.style.setProperty('--abs-dist', absDist.toFixed(4));
      station.element.style.setProperty('--dir', String(sign));

      // Marca visual activa/inactiva en la cinta
      const isActive = absDist < 0.55;
      station.element.classList.toggle('is-ribbon-active', isActive);
      if (absDist < 1.35) {
        station.element.classList.add('sec-visible', 'rv-in');
        station.element.querySelectorAll<HTMLElement>('[data-rv]').forEach((el) => {
          el.classList.add('rv-in');
        });
      }

      if (Math.abs(rawDist) < minDistance) {
        minDistance = Math.abs(rawDist);
        bestStation = station;
      }
    }

    if (bestStation && bestStation.id !== this.activeChapterId) {
      this.activeChapterId = bestStation.id;
      if (bestStation.chapter) {
        this.onActiveChapterCb?.(bestStation.chapter);
      }
    }
  }

  public destroy() {
    cancelAnimationFrame(this.rafId);
    window.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('touchstart', this.onTouchStart);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchEnd);
    window.removeEventListener('resize', this.onResize);
  }
}
