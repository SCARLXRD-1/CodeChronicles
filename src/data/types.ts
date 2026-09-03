export type Era =
  | 'pre-code'
  | 'algorithms'
  | 'machines'
  | 'computers'
  | 'machine-language'
  | 'assembly'
  | 'first-languages'
  | 'enterprise'
  | 'structured'
  | 'c'
  | 'oop'
  | 'internet'
  | 'web'
  | 'modern'
  | 'mobile'
  | 'systems'
  | 'ai'
  | 'future';

export interface Source {
  title: string;
  url?: string;
  type: 'primary' | 'secondary' | 'book' | 'paper' | 'archive' | 'web';
  note?: string;
}

export interface TimelineEvent {
  id: string;
  year: number | string;
  dateLabel?: string;
  title: string;
  description: string;
  era: Era;
  category: 'algorithm' | 'machine' | 'computer' | 'language' | 'system' | 'internet' | 'web' | 'ai' | 'person' | 'concept';
  related: string[];
  sources: Source[];
}

export interface LanguageEntry {
  id: string;
  name: string;
  year: number;
  creators: string[];
  era: Era;
  chapterId?: string;
  problemSolved: string;
  historicalContext: string;
  influences: string[];
  influenced: string[];
  paradigms: string[];
  currentStatus: string;
  history: string;
  curiosities: string[];
  codeSample?: string;
  sources: Source[];
}

export interface CharacterEntry {
  id: string;
  name: string;
  years: string;
  era: Era;
  profession: string;
  contribution: string;
  description: string;
  quote?: string;
  /** Texto original de la cita (si no está en español), para el futuro i18n. */
  quoteOriginal?: string;
  related: string[];
  representation: 'historical' | 'artistic';
  sources: Source[];
}

export interface MachineEntry {
  id: string;
  name: string;
  year: number;
  creator: string;
  era: Era;
  type: string;
  description: string;
  technicalNotes: string[];
  artifacts: string[];
  sources: Source[];
}

export interface ArtifactEntry {
  id: string;
  name: string;
  year?: number;
  era: Era;
  type: 'manuscript' | 'photograph' | 'punch-card' | 'diagram' | 'code-fragment' | 'document' | 'manual' | 'interface' | 'catalog';
  description: string;
  context: string;
  related: string[];
  sources: Source[];
}

export interface QuoteEntry {
  id: string;
  text: string;
  /** Texto original de la cita (si no está en español), para el futuro i18n. */
  textOriginal?: string;
  author: string;
  year?: number;
  era: Era;
  context?: string;
  source?: Source;
}
