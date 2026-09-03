import { renderChronicles } from '../content/ChroniclesContent';
import { chapters, getChapter } from '../data/chapters';
import type { ChapterMeta } from '../data/chapters';
import { bindMomentInteractions } from '../content/MomentRenderer';
import { getChronosLogoSvg } from './logo';

export interface ActiveSection {
  /** id de la sección en el DOM (hero, epilogue, ch-xx) */
  sectionId: string;
  /** capítulo, si la sección pertenece a uno */
  chapter?: ChapterMeta;
  /** progreso 0..1 de desplazamiento del documento */
  progress: number;
}

export class ChroniclesUI {
  private overlay!: HTMLElement;
  private rail!: HTMLElement;
  private progressBar!: HTMLElement;
  private chapterLabel!: HTMLElement;
  private mNav!: HTMLElement;
  private burger!: HTMLButtonElement;
  private currentChapter = 0;
  private observer?: IntersectionObserver;
  private sections = new Map<string, { chapter?: ChapterMeta }>();

  /** Se llama cuando cambia la sección/capítulo activo. */
  onActiveSection?: (active: ActiveSection) => void;

  constructor() {
    this.overlay = document.querySelector<HTMLElement>('#overlay')!;
    this.buildChromeless();
  }

  private buildChromeless() {
    // Header
    const chrome = document.createElement('header');
    chrome.className = 'chrome';
    chrome.innerHTML = `
      <div class="chrome__left">
        <a class="chrome__brand" href="#hero" title="CodeChronicles — Inicio">
          <span class="chrome__brand-emblem" aria-hidden="true">${getChronosLogoSvg(26, 'chrome__brand-svg')}</span>
          <span class="chrome__brand-text">CodeChronicles</span>
        </a>
        <div class="chrono-hud" id="chrono-hud" aria-label="Motor temporal activo">
          <span class="chrono-hud__pulse"></span>
          <span class="chrono-hud__tag">MOTOR TEMPORAL</span>
          <span class="chrono-hud__year" id="chrono-hud-year">ORIGEN · 1843</span>
        </div>
      </div>
      <div class="chrome__meta">
        <span class="chrome__chapter" aria-live="polite">Bienvenida</span>
        <button class="icon-btn" id="sound-toggle" aria-label="Silenciar sonido" title="Sonido">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 10v4h4l5 4V6l-5 4H4z" fill="currentColor"/>
            <path d="M16 9a4 4 0 0 1 0 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
          </svg>
        </button>
        <button class="burger" id="burger" aria-label="Abrir menú" aria-expanded="false" aria-controls="m-nav">
          <span class="burger__line"></span>
          <span class="burger__line"></span>
        </button>
      </div>`;
    document.body.appendChild(chrome);
    this.chapterLabel = chrome.querySelector('.chrome__chapter')!;

    // Chapter rail
    this.rail = document.createElement('nav');
    this.rail.className = 'rail';
    this.rail.setAttribute('aria-label', 'Capítulos');
    this.rail.innerHTML = chapters
      .filter((c) => c.number > 0)
      .map(
        (c) => `
        <a class="rail__item" href="#" data-target="${c.id}" data-number="${c.number}" aria-label="Capítulo ${c.number}: ${c.title}">
          <span class="rail__index">${String(c.number).padStart(2, '0')}</span>
          <span class="rail__track"><span class="rail__dot"></span></span>
        </a>`,
      )
      .join('');
    document.body.appendChild(this.rail);

    // Nav móvil
    const mNav = document.createElement('nav');
    mNav.className = 'm-nav';
    mNav.id = 'm-nav';
    mNav.setAttribute('aria-label', 'Capítulos');
    mNav.innerHTML = [
      `<a class="m-nav__item" href="#hero" data-target="hero"><span>Índice</span>CodeChronicles</a>`,
      ...chapters
        .filter((c) => c.number > 0)
        .map(
          (c) =>
            `<a class="m-nav__item" href="#${c.id}" data-target="${c.id}"><span>${c.yearLabel}</span>${c.title}</a>`,
        ),
      `<a class="m-nav__item" href="#epilogue" data-target="epilogue"><span>Fin</span>Epílogo</a>`,
    ].join('');
    document.body.appendChild(mNav);
    this.mNav = mNav;

    const burger = document.querySelector<HTMLButtonElement>('#burger')!;
    burger.addEventListener('click', () => {
      const open = mNav.classList.toggle('is-open');
      document.documentElement.classList.toggle('nav-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
    this.burger = burger;

    // Progress bar
    const progress = document.createElement('div');
    progress.className = 'progress';
    progress.innerHTML = '<div class="progress__bar"></div>';
    document.body.appendChild(progress);
    this.progressBar = progress.querySelector('.progress__bar')!;
  }

  mount() {
    this.overlay.innerHTML = renderChronicles();
    bindMomentInteractions(this.overlay);
    this.observeSections();
  }

  /**
   * Observa las secciones del libro y emite la sección activa
   * (la más visible en el viewport), sincronizando rail + label
   * y notificando a la experiencia por el callback.
   */
  private observeSections() {
    // Registrar secciones: hero, epílogo y capítulos.
    // Las secciones relevantes tienen data-section o data-chapter.
    this.sections.clear();
    this.overlay
      .querySelectorAll<HTMLElement>('[data-section], [data-chapter]')
      .forEach((el) => {
        const sectionId = el.getAttribute('data-section');
        const chapterId = el.getAttribute('data-chapter') ?? sectionId;
        const chapter = chapterId ? getChapter(chapterId) : undefined;
        if (sectionId || chapter) {
          const id = el.getAttribute('id');
          if (id) this.sections.set(id, { chapter });
          if (sectionId) this.sections.set(sectionId, { chapter });
          if (chapterId) this.sections.set(chapterId, { chapter });
        }
      });

    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        // Sección con la mayor proporción visible
        const best = visible.sort(
          (a, b) => b.intersectionRatio - a.intersectionRatio,
        )[0];
        const targetId = best.target.getAttribute('id') ?? '';
        const sectionId = best.target.getAttribute('data-section') ?? best.target.getAttribute('data-chapter') ?? targetId;
        const chapter = this.sections.get(sectionId)?.chapter ?? this.sections.get(targetId)?.chapter;

        if (chapter) {
          this.highlight(chapter);
          this.onActiveSection?.({
            sectionId,
            chapter,
            progress: this.scrollProgress(),
          });
        }
      },
      { threshold: [0.15, 0.35, 0.6, 0.85] },
    );

    this.overlay
      .querySelectorAll<HTMLElement>('[data-section], [data-chapter]')
      .forEach((el) => this.observer?.observe(el));
  }

  private scrollProgress(): number {
    const max = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight,
    );
    return Math.min(1, window.scrollY / max);
  }

  onScroll(progress: number) {
    this.progressBar.style.width = `${Math.min(100, progress * 100)}%`;
    document.querySelector('.chrome')?.classList.toggle('is-scrolled', progress > 0.008);
    // El capítulo activo se resuelve por IntersectionObserver, no aquí.
  }

  private closeMobile() {
    this.mNav.classList.remove('is-open');
    document.documentElement.classList.remove('nav-open');
    this.burger?.setAttribute('aria-expanded', 'false');
  }

  highlight(ch: ChapterMeta | undefined) {
    this.closeMobile();
    const hudYear = document.getElementById('chrono-hud-year');
    if (!ch || ch.number === 0) {
      this.chapterLabel.textContent = 'Bienvenida';
      if (hudYear) hudYear.textContent = 'ORIGEN · 1843';
      this.rail
        .querySelectorAll('.rail__item')
        .forEach((el) => el.classList.remove('is-active'));
      this.currentChapter = 0;
      return;
    }
    if (this.currentChapter !== ch.number) {
      this.currentChapter = ch.number;
      this.chapterLabel.textContent = `${ch.yearLabel} · ${ch.title}`;
      if (hudYear) hudYear.textContent = `${ch.yearLabel} · CAP.${String(ch.number).padStart(2, '0')}`;
      this.rail.querySelectorAll('.rail__item').forEach((el) => {
        const on = Number(el.getAttribute('data-number')) === ch.number;
        el.classList.toggle('is-active', on);
      });
    }
  }

  bindRail(jumpTo: (chapterId: string) => void) {
    const bind = (el: Element) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const id = el.getAttribute('data-target');
        if (id) jumpTo(id);
        this.closeMobile();
      });
    };
    this.rail.querySelectorAll('.rail__item').forEach(bind);
    this.mNav.querySelectorAll('.m-nav__item').forEach(bind);
  }

  dispose() {
    this.observer?.disconnect();
    this.overlay.innerHTML = '';
    document
      .querySelectorAll('.chrome, .rail, .progress, .m-nav, #burger, #sound-toggle')
      .forEach((el) => el.remove());
  }
}