import type { MasterDict } from '../index';
import { uiDict } from './ui';
import { heroDict } from './hero';
import { chaptersDict } from './chapters';
import { narrativesDict } from './narratives';
import { extrasDict } from './extras';
import { workbenchDict } from './workbench';
import { dataLocalesDict } from './dataLocales';
import { timelineLocalesDict } from './timelineLocales';

/**
 * Diccionario maestro unificado de CodeChronicles.
 * Agrupa todas las traducciones en los 7 idiomas soportados:
 * ES (Español), EN (English), FR (Français), PT (Português), ZH (中文), JA (日本語), DE (Deutsch).
 */
export const masterDict: MasterDict = {
  ...uiDict,
  ...heroDict,
  ...chaptersDict,
  ...narrativesDict,
  ...extrasDict,
  ...workbenchDict,
  ...dataLocalesDict,
  ...timelineLocalesDict,
};

export {
  uiDict,
  heroDict,
  chaptersDict,
  narrativesDict,
  extrasDict,
  workbenchDict,
  dataLocalesDict,
  timelineLocalesDict,
};
