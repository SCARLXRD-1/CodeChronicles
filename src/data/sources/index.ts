import type { Source } from '../types';
import { timeline } from '../timeline';
import { languages } from '../languages';
import { characters } from '../characters';
import { machines } from '../machines';

export interface SourceRegistryEntry {
  id: string;
  title: string;
  kind: 'event' | 'language' | 'character' | 'machine';
  sources: Source[];
}

export const sourceRegistry: SourceRegistryEntry[] = [
  ...timeline.map((evt) => ({
    id: evt.id,
    title: evt.title,
    kind: 'event' as const,
    sources: evt.sources,
  })),
  ...languages.map((lang) => ({
    id: lang.id,
    title: lang.name,
    kind: 'language' as const,
    sources: lang.sources,
  })),
  ...characters.map((char) => ({
    id: char.id,
    title: char.name,
    kind: 'character' as const,
    sources: char.sources,
  })),
  ...machines.map((mach) => ({
    id: mach.id,
    title: mach.name,
    kind: 'machine' as const,
    sources: mach.sources,
  })),
];

export const getSourcesFor = (id: string): Source[] =>
  sourceRegistry.find((entry) => entry.id === id)?.sources ?? [];