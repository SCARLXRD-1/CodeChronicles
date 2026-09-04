import { renderChronicles } from '../content/ChroniclesContent';
import { chapters, getChapter, getChapterByNumber } from '../data/chapters';
import type { ChapterMeta } from '../data/chapters';
import { bindMomentInteractions } from '../content/MomentRenderer';
import { getChronosLogoSvg } from './logo';
import {
  tr,
  LANGUAGE_NAMES,
  LANGUAGE_SHORT,
  setLanguage,
  getLanguage,
  onLanguageChange,
} from '../i18n';
import type { Language } from '../i18n';

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
  private disposeLang?: () => void;

  /** Se llama cuando cambia la sección/capítulo activo. */
  onActiveSection?: (active: ActiveSection) => void;

  constructor() {
    this.overlay = document.querySelector<HTMLElement>('#overlay')!;
    this.buildChromeless();
    this.disposeLang = onLanguageChange(() => this.refreshChrome());
  }

  private refreshChrome() {
    document.documentElement.lang = getLanguage();
    document
      .querySelectorAll<HTMLElement>('[data-i18n]')
      .forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (key) el.textContent = tr(key);
      });
    document
      .querySelectorAll<HTMLElement>('[data-i18n-short]')
      .forEach((el) => {
        el.textContent = LANGUAGE_SHORT[getLanguage()];
      });
    const toggle = document.querySelector<HTMLElement>('#lang-toggle');
    if (toggle) {
      toggle.setAttribute('aria-label', tr('ui.language.label'));
      toggle.title = tr('ui.language.title');
    }
    const soundBtn = document.querySelector<HTMLElement>('#sound-toggle');
    if (soundBtn) {
      soundBtn.setAttribute('aria-label', tr('ui.sound.mute'));
      soundBtn.title = tr('ui.sound.title');
    }
    if (this.burger) {
      this.burger.setAttribute('aria-label', this.mNav?.classList.contains('is-open') ? tr('ui.menu.close') : tr('ui.menu.open'));
    }
    if (this.rail) {
      this.rail.setAttribute('aria-label', tr('ui.chapters.label'));
      this.rail.querySelectorAll<HTMLElement>('.rail__item').forEach((el) => {
        const num = Number(el.getAttribute('data-number'));
        const ch = getChapterByNumber(num);
        if (ch) {
          el.setAttribute('aria-label', tr('ui.chapter.number').replace('{n}', String(ch.number)).replace('{title}', tr(`ch.${ch.id}.title`)));
        }
      });
    }
    this.syncLangMenu();
    this.rebuildMobileNav();
    if (this.currentChapter > 0) {
      const ch = getChapterByNumber(this.currentChapter);
      if (ch) this.highlight(ch, true);
    } else {
      this.chapterLabel.textContent = tr('ui.welcome');
      const hudYear = document.getElementById('chrono-hud-year');
      if (hudYear) hudYear.textContent = tr('ui.origin.year');
    }
  }

  private syncLangMenu() {
    document
      .querySelectorAll<HTMLElement>('.lang-menu__item')
      .forEach((el) => {
        const l = el.getAttribute('data-lang');
        el.classList.toggle('is-active', l === getLanguage());
      });
  }

  private buildChromeless() {
    // Header
    const chrome = document.createElement('header');
    chrome.className = 'chrome';
    chrome.innerHTML = `
      <div class="chrome__left">
        <a class="chrome__brand" href="#hero" title="CodeChronicles">
          <span class="chrome__brand-emblem" aria-hidden="true">${getChronosLogoSvg(26, 'chrome__brand-svg')}</span>
          <span class="chrome__brand-text">CodeChronicles</span>
        </a>
        <div class="chrono-hud" id="chrono-hud" aria-label="${tr('ui.motor.temporal')}">
          <span class="chrono-hud__pulse"></span>
          <span class="chrono-hud__tag" data-i18n="ui.motor.temporal">${tr('ui.motor.temporal')}</span>
          <span class="chrono-hud__year" id="chrono-hud-year" data-i18n="ui.origin.year">${tr('ui.origin.year')}</span>
        </div>
      </div>
      <div class="chrome__meta">
        <span class="chrome__chapter" data-i18n="ui.welcome" aria-live="polite">${tr('ui.welcome')}</span>
        <div class="lang-switcher">
          <button class="lang-btn" id="lang-toggle" aria-label="${tr('ui.language.label')}" aria-haspopup="true" aria-expanded="false" title="${tr('ui.language.title')}">
            <span class="lang-btn__code" data-i18n-short>${LANGUAGE_SHORT[getLanguage()]}</span>
            <svg class="lang-btn__chev" width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <ul class="lang-menu" id="lang-menu" role="menu" aria-label="${tr('ui.language.title')}">
            ${(Object.keys(LANGUAGE_NAMES) as Language[])
              .map(
                (l) => `
              <li role="none">
                <button class="lang-menu__item ${l === getLanguage() ? 'is-active' : ''}" role="menuitem" data-lang="${l}">
                  <span class="lang-menu__code">${LANGUAGE_SHORT[l]}</span>
                  <span class="lang-menu__name">${LANGUAGE_NAMES[l]}</span>
                </button>
              </li>`,
              )
              .join('')}
          </ul>
        </div>
        <button class="icon-btn" id="sound-toggle" aria-label="${tr('ui.sound.mute')}" title="${tr('ui.sound.title')}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 10v4h4l5 4V6l-5 4H4z" fill="currentColor"/>
            <path d="M16 9a4 4 0 0 1 0 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
          </svg>
        </button>
        <button class="burger" id="burger" aria-label="${tr('ui.menu.open')}" aria-expanded="false" aria-controls="m-nav">
          <span class="burger__line"></span>
          <span class="burger__line"></span>
        </button>
      </div>`;
    document.body.appendChild(chrome);
    this.chapterLabel = chrome.querySelector('.chrome__chapter')!;

    // Language selector
    const langToggle = chrome.querySelector<HTMLButtonElement>('#lang-toggle')!;
    const langMenu = chrome.querySelector<HTMLElement>('#lang-menu')!;
    langToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = langMenu.classList.toggle('is-open');
      langToggle.setAttribute('aria-expanded', String(open));
    });
    langMenu.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-lang]');
      if (!btn) return;
      const next = btn.getAttribute('data-lang') as Language;
      if (next && next in LANGUAGE_NAMES) {
        setLanguage(next);
        langMenu.classList.remove('is-open');
        langToggle.setAttribute('aria-expanded', 'false');
      }
      e.stopPropagation();
    });
    document.addEventListener('click', () => {
      langMenu.classList.remove('is-open');
      langToggle.setAttribute('aria-expanded', 'false');
    });

    // Chapter rail
    this.rail = document.createElement('nav');
    this.rail.className = 'rail';
    this.rail.setAttribute('aria-label', tr('ui.chapters.label'));
    this.rail.innerHTML = chapters
      .filter((c) => c.number > 0)
      .map(
        (c) => `
        <a class="rail__item" href="#" data-target="${c.id}" data-number="${c.number}" aria-label="${tr('ui.chapter.number').replace('{n}', String(c.number)).replace('{title}', tr(`ch.${c.id}.title`))}">
          <span class="rail__index">${String(c.number).padStart(2, '0')}</span>
          <span class="rail__track"><span class="rail__dot"></span></span>
        </a>`,
      )
      .join('');
    document.body.appendChild(this.rail);

    // Nav móvil
    this.buildMobileNav();

    const burger = document.querySelector<HTMLButtonElement>('#burger')!;
    burger.addEventListener('click', () => {
      const open = this.mNav.classList.contains('is-open');
      if (!open) {
        this.mNav.classList.add('is-open');
        document.documentElement.classList.add('nav-open');
        burger.setAttribute('aria-expanded', 'true');
        burger.setAttribute('aria-label', tr('ui.menu.close'));
      } else {
        this.closeMobile();
        burger.setAttribute('aria-label', tr('ui.menu.open'));
      }
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
    this.observer?.disconnect();
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

  private mobileNavHTML(): string {
    return [
      `<a class="m-nav__item" href="#hero" data-target="hero"><span>${tr('ui.index')}</span>CodeChronicles</a>`,
      ...chapters
        .filter((c) => c.number > 0)
        .map(
          (c) =>
            `<a class="m-nav__item" href="#${c.id}" data-target="${c.id}"><span>${c.yearLabel}</span>${tr(`ch.${c.id}.title`)}</a>`,
        ),
      `<a class="m-nav__item" href="#epilogue" data-target="epilogue"><span>${tr('ui.end')}</span>${tr('ui.epilogue')}</a>`,
    ].join('');
  }

  private buildMobileNav() {
    this.mNav = document.createElement('nav');
    this.mNav.className = 'm-nav';
    this.mNav.id = 'm-nav';
    this.mNav.setAttribute('aria-label', tr('ui.chapters.label'));
    this.mNav.innerHTML = this.mobileNavHTML();
    document.body.appendChild(this.mNav);
  }

  private rebuildMobileNav() {
    if (!this.mNav) return;
    const wasOpen = this.mNav.classList.contains('is-open');
    this.mNav.innerHTML = this.mobileNavHTML();
    this.mNav.setAttribute('aria-label', tr('ui.chapters.label'));
    if (wasOpen) this.mNav.classList.add('is-open');
  }

  highlight(ch: ChapterMeta | undefined, force = false) {
    this.closeMobile();
    const hudYear = document.getElementById('chrono-hud-year');
    if (!ch || ch.number === 0) {
      this.chapterLabel.textContent = tr('ui.welcome');
      if (hudYear) hudYear.textContent = tr('ui.origin.year');
      this.rail
        .querySelectorAll('.rail__item')
        .forEach((el) => el.classList.remove('is-active'));
      this.currentChapter = 0;
      return;
    }
    if (this.currentChapter !== ch.number || force) {
      this.currentChapter = ch.number;
      this.chapterLabel.textContent = `${ch.yearLabel} · ${tr(`ch.${ch.id}.title`)}`;
      if (hudYear) hudYear.textContent = tr('ui.origin.chap').replace('{year}', ch.yearLabel).replace('{n}', String(ch.number).padStart(2, '0'));
      this.rail.querySelectorAll('.rail__item').forEach((el) => {
        const on = Number(el.getAttribute('data-number')) === ch.number;
        el.classList.toggle('is-active', on);
      });
    }
  }

  private onJump?: (chapterId: string) => void;

  bindRail(jumpTo: (chapterId: string) => void) {
    this.onJump = jumpTo;
    const handler = (e: MouseEvent) => {
      const item = (e.target as HTMLElement).closest<HTMLElement>('[data-target]');
      if (!item) return;
      e.preventDefault();
      const id = item.getAttribute('data-target');
      if (id && this.onJump) this.onJump(id);
      this.closeMobile();
    };
    this.rail.addEventListener('click', handler);
    this.mNav.addEventListener('click', handler);
  }

  dispose() {
    this.observer?.disconnect();
    this.disposeLang?.();
    this.overlay.innerHTML = '';
    document
      .querySelectorAll('.chrome, .rail, .progress, .m-nav, #burger, #sound-toggle')
      .forEach((el) => el.remove());
  }
}
