import { damp } from '../lib/math';

export interface SpatialPresenterOptions {
  scope?: HTMLElement;
}

interface SceneItem {
  element: HTMLElement;
  cards: HTMLElement[];
  rect: DOMRect;
  inView: boolean;
  distCenter: number;
}

/**
 * SpatialPresenter (Editorial Motion Director)
 * Las tarjetas de información no se deforman ni giran con el cursor,
 * sino que mantienen una compostura editorial pura, nítida y solemne.
 * Gestiona el foco de sección activa y la salida suave del hero sin rotaciones artificiales.
 */
export class SpatialPresenter {
  private scope: HTMLElement;
  private scenes: SceneItem[] = [];
  private rafId = 0;
  private lastTime = 0;
  private lastScrollY = 0;
  private scrollVelocity = 0;

  private readonly reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  private io?: IntersectionObserver;

  constructor(options: SpatialPresenterOptions = {}) {
    this.scope = options.scope ?? (document.getElementById('overlay') || document.body);
    if (this.reduceMotion) return;

    this.onResize = this.onResize.bind(this);
    this.loop = this.loop.bind(this);

    this.init();
  }

  private init() {
    this.collectScenes();

    this.io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const item = this.scenes.find((s) => s.element === entry.target);
          if (item) {
            item.inView = entry.isIntersecting;
            if (entry.isIntersecting) {
              item.element.classList.add('sec-visible');
            } else {
              item.element.classList.remove('sec-visible');
            }
          }
        });
      },
      { rootMargin: '-8% 0px -8% 0px', threshold: [0, 0.2, 0.5, 0.8] },
    );

    this.scenes.forEach((s) => this.io?.observe(s.element));
    window.addEventListener('resize', this.onResize, { passive: true });

    this.lastScrollY = window.scrollY;
    this.lastTime = performance.now();
    this.rafId = requestAnimationFrame(this.loop);
  }

  private collectScenes() {
    const sceneEls = [...this.scope.querySelectorAll<HTMLElement>('.scene, .hero, .epilogue')];
    this.scenes = sceneEls.map((el) => {
      const cards = [
        ...el.querySelectorAll<HTMLElement>(
          '.card, .tcode, .timeline-panel, .compare__card',
        ),
      ];

      return {
        element: el,
        cards,
        rect: el.getBoundingClientRect(),
        inView: false,
        distCenter: 0,
      };
    });
  }

  private onResize() {
    this.collectScenes();
  }

  public triggerWarpImpulse(_intensity = 1) {
    // No-op visual sutil para evitar sacudidas bruscas no deseadas
  }

  private loop(time: number) {
    const dt = Math.min(0.1, Math.max(0.001, (time - this.lastTime) / 1000));
    this.lastTime = time;

    const currentScrollY = window.scrollY;
    const scrollDelta = Math.abs(currentScrollY - this.lastScrollY);
    this.lastScrollY = currentScrollY;

    const rawVelocity = scrollDelta / (window.innerHeight * dt);
    this.scrollVelocity = damp(this.scrollVelocity, Math.min(2.0, rawVelocity * 0.3), 4.0, dt);

    const vh = window.innerHeight;
    const vCenter = vh / 2;

    for (let i = 0; i < this.scenes.length; i++) {
      const scene = this.scenes[i];
      const rect = scene.element.getBoundingClientRect();
      scene.rect = rect;

      if (rect.bottom < -100 || rect.top > vh + 100) {
        continue;
      }

      const sceneCenter = rect.top + rect.height / 2;
      const normDist = (sceneCenter - vCenter) / (vh * 0.75);
      const clampedDist = Math.max(-1.5, Math.min(1.5, normDist));
      scene.distCenter = clampedDist;

      // Sección en foco principal de lectura
      const isPrimary = Math.abs(clampedDist) < 0.42;
      if (isPrimary) {
        scene.element.classList.add('sec-focused');
      } else {
        scene.element.classList.remove('sec-focused');
      }
    }

    this.rafId = requestAnimationFrame(this.loop);
  }

  public dispose() {
    cancelAnimationFrame(this.rafId);
    window.removeEventListener('resize', this.onResize);
    this.io?.disconnect();
    this.scenes.forEach((s) => {
      s.element.classList.remove('sec-visible', 'sec-focused');
    });
  }
}
