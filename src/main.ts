import './styles/index.css';
import type { Experience } from './experience/Experience';
import { ChroniclesUI } from './ui/ChroniclesUI';
import { initI18n, onLanguageChange, loadSavedLanguage } from './i18n';
import { masterDict } from './i18n/dicts';
import { DiscoverySystem } from './interactions/DiscoverySystem';
import { PersistenceStore } from './persistence/PersistenceStore';
import { PerfMonitor } from './perf/PerfMonitor';
import { RevealFx } from './cinema/RevealFx';
import { ForegroundSystem } from './cinema/ForegroundSystem';
import { CursorFX } from './cinema/CursorFX';
import { ChapterFlash } from './cinema/ChapterFlash';
import { SpatialPresenter } from './cinema/SpatialPresenter';
import { TimelineRibbon } from './cinema/TimelineRibbon';
import type { ChapterMeta } from './data/chapters';

function init() {
  // Idioma guardado (por defecto español)
  initI18n(masterDict, loadSavedLanguage());

  const store = new PersistenceStore();

  const ui = new ChroniclesUI();
  ui.mount();

  // Capa cinematográfica: reveals, foreground, cursor, spatial 3D
  const mainCanvas = document.querySelector('#overlay') as HTMLElement;
  const revealFx = new RevealFx(mainCanvas);
  void new ForegroundSystem(mainCanvas);
  void new CursorFX();
  const flash = new ChapterFlash();
  const spatialPresenter = new SpatialPresenter({ scope: mainCanvas });
  flash.onFlash = () => {
    spatialPresenter.triggerWarpImpulse(0.85);
  };

  // Experiencia WebGL (three) cargada de forma diferida
  let experience: Experience | null = null;
  void import('./experience/Experience').then(({ Experience: ExperienceCls }) => {
    experience = new ExperienceCls();
    experience.start();
  });

  let activeChapter: ChapterMeta | null = null;
  let lastFlashTime = 0;

  // Controlador de Cinta Temporal Horizontal (Timeline Ribbon)
  const ribbon = new TimelineRibbon({
    container: mainCanvas,
    onProgress: (progress, velocity, currentX) => {
      ui.onScroll(progress);
      experience?.setRibbonProgress(progress, currentX, velocity);
      store.saveScroll(progress);

      const hero = document.getElementById('hero');
      if (hero) {
        const ph = Math.min(1, Math.max(0, progress * 5));
        hero.style.setProperty('--p', ph.toFixed(3));
      }
    },
    onActiveChapter: (chapter) => {
      const now = Date.now();
      if (chapter && chapter.number > 0 && chapter.id !== activeChapter?.id) {
        activeChapter = chapter;
        if (now - lastFlashTime > 2500) {
          lastFlashTime = now;
          flash.show(chapter);
        }
      }
      if (chapter) {
        experience?.setActiveChapter(chapter);
        store.markChapterVisited(chapter.id);
        ui.highlight(chapter, true);
      }
    },
  });

  ui.onActiveSection = ({ chapter }) => {
    if (chapter) {
      experience?.setActiveChapter(chapter);
      store.markChapterVisited(chapter.id);
    }
  };

  // Al cambiar el idioma, re-renderiza el contenido editorial conservando la posición de la cinta
  onLanguageChange(() => {
    const currentProgress = ribbon.getProgress();
    ui.mount();
    ribbon.mount();
    ribbon.scrollToProgress(currentProgress);
    revealFx.rescan();
    spatialPresenter.refresh();
    discovery.bind();
  });

  ui.bindRail((chapterId) => {
    spatialPresenter.triggerWarpImpulse(0.7);
    ribbon.scrollToSection(chapterId);
  });

  // Persistencia: restaurar posición al volver (si se recarga la página)
  const savedScroll = store.getState().lastScroll;
  if (savedScroll > 0) {
    window.requestAnimationFrame(() => {
      ribbon.scrollToProgress(Math.min(1, savedScroll));
    });
  }

  // Preferencias guardadas
  const prefs = store.getState().preferences;
  if (prefs.reducedMotion) {
    document.documentElement.classList.add('reduce-motion');
  }

  const soundBtn = document.querySelector<HTMLElement>('#sound-toggle');
  if (prefs.sound) {
    soundBtn?.classList.add('is-on');
  }
  soundBtn?.addEventListener('click', () => {
    const on = !soundBtn.classList.contains('is-on');
    soundBtn.classList.toggle('is-on', on);
    store.setPreferences({ sound: on });
  });

  // Descubrimiento editorial (FASE 3/6)
  const discovery = new DiscoverySystem();
  discovery.onDiscover = (id, kind) => {
    if (kind === 'language') store.markDiscovered(id, 'languagesExplored');
    else if (kind === 'character') store.markDiscovered(id, 'charactersExplored');
    else store.markDiscovered(id, 'discovered');
  };
  discovery.bind();

  // Escuchadores globales de clic y toque para abrir Discovery modal
  document.addEventListener('click', (e) => {
    const link = (e.target as HTMLElement).closest<HTMLElement>('[data-discover]');
    if (link) {
      e.preventDefault();
      const id = link.getAttribute('data-discover');
      if (id) discovery.open(id);
    }
  });

  let globalTouchX = 0;
  let globalTouchY = 0;
  let globalTouchMoved = false;

  document.addEventListener(
    'touchstart',
    (e) => {
      if (e.touches.length === 1) {
        globalTouchX = e.touches[0].clientX;
        globalTouchY = e.touches[0].clientY;
        globalTouchMoved = false;
      }
    },
    { passive: true },
  );

  document.addEventListener(
    'touchmove',
    (e) => {
      if (e.touches.length === 1) {
        const dx = Math.abs(e.touches[0].clientX - globalTouchX);
        const dy = Math.abs(e.touches[0].clientY - globalTouchY);
        if (dx > 12 || dy > 12) {
          globalTouchMoved = true;
        }
      }
    },
    { passive: true },
  );

  document.addEventListener('touchend', (e) => {
    if (globalTouchMoved) return;
    const target = (e.target as HTMLElement).closest<HTMLElement>('[data-discover]');
    if (target) {
      e.preventDefault();
      const id = target.getAttribute('data-discover');
      if (id) discovery.open(id);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const active = document.activeElement as HTMLElement | null;
      const target = active?.closest<HTMLElement>('[data-discover]');
      if (target) {
        e.preventDefault();
        const id = target.getAttribute('data-discover');
        if (id) discovery.open(id);
      }
    }
  });

  // Loader
  const loader = document.createElement('div');
  loader.className = 'loader';
  loader.innerHTML = `<div class="loader__mark">CODECHRONICLES</div><div class="loader__bar"></div>`;
  document.body.appendChild(loader);

  setTimeout(() => {
    loader.classList.add('is-hidden');
    setTimeout(() => loader.remove(), 900);
  }, 800);

  // Métricas de rendimiento (FASE 10) — solo con ?perf=1 o #perf
  if (PerfMonitor.fromLocation()) {
    const perf = new PerfMonitor();
    perf.start();
  }
}

document.addEventListener('DOMContentLoaded', init);