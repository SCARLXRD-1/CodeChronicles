export interface ChronicleState {
  chaptersVisited: string[];
  chaptersCompleted: string[];
  discovered: string[];
  languagesExplored: string[];
  charactersExplored: string[];
  savedArticles: string[];
  preferences: {
    reducedMotion: boolean;
    sound: boolean;
  };
  lastChapterId: string | null;
  lastScroll: number;
  updatedAt: number;
}

const STORAGE_KEY = 'codechronicles:v1:state';

export const defaultState = (): ChronicleState => ({
  chaptersVisited: [],
  chaptersCompleted: [],
  discovered: [],
  languagesExplored: [],
  charactersExplored: [],
  savedArticles: [],
  preferences: {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    sound: false,
  },
  lastChapterId: null,
  lastScroll: 0,
  updatedAt: Date.now(),
});

/**
 * PersistenceStore — FASE 7
 * Guarda el estado del usuario en localStorage (suficiente para el MVP).
 * Diseñado para poder migrarse a IndexedDB o a un backend (Neon) más adelante.
 */
export class PersistenceStore {
  private state: ChronicleState;

  constructor() {
    this.state = this.load();
  }

  private load(): ChronicleState {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw) as Partial<ChronicleState>;
      return {
        ...defaultState(),
        ...parsed,
        preferences: {
          ...defaultState().preferences,
          ...(parsed.preferences ?? {}),
        },
      };
    } catch {
      return defaultState();
    }
  }

  private save() {
    this.state.updatedAt = Date.now();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch {
      /* almacenamiento no disponible */
    }
  }

  getState() {
    return this.state;
  }

  markChapterVisited(chapterId: string, completed = false) {
    if (!this.state.chaptersVisited.includes(chapterId)) {
      this.state.chaptersVisited.push(chapterId);
    }
    if (completed && !this.state.chaptersCompleted.includes(chapterId)) {
      this.state.chaptersCompleted.push(chapterId);
    }
    this.state.lastChapterId = chapterId;
    this.save();
  }

  markDiscovered(id: string, kind: 'discovered' | 'languagesExplored' | 'charactersExplored') {
    const arr = this.state[kind];
    if (!arr.includes(id)) {
      arr.push(id);
      if (kind !== 'discovered') this.state.discovered.push(id);
      this.save();
    }
  }

  toggleSaved(id: string) {
    const arr = this.state.savedArticles;
    const idx = arr.indexOf(id);
    if (idx >= 0) arr.splice(idx, 1);
    else arr.push(id);
    this.save();
  }

  setPreferences(patch: Partial<ChronicleState['preferences']>) {
    this.state.preferences = { ...this.state.preferences, ...patch };
    this.save();
  }

  restoreScroll(): number {
    return this.state.lastScroll ?? 0;
  }

  saveScroll(scrollY: number) {
    this.state.lastScroll = scrollY;
    this.save();
  }

  hasVisited(chapterId?: string) {
    return chapterId ? this.state.chaptersVisited.includes(chapterId) : false;
  }

  isCompleted(chapterId: string) {
    return this.state.chaptersCompleted.includes(chapterId);
  }

  clear() {
    this.state = defaultState();
    localStorage.removeItem(STORAGE_KEY);
  }
}