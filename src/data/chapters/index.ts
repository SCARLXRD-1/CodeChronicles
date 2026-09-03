import type { Era } from '../types';

export interface ChapterMeta {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  era: Era;
  yearLabel: string;
  tagline: string;
  summary: string;
  color: string;
  backgroundTheme: 'dark' | 'warm' | 'cold' | 'tech' | 'clean' | 'abstract';
  nextChapterId?: string;
}

export const chapters: ChapterMeta[] = [
  {
    id: 'ch-00-hero',
    number: 0,
    title: 'CodeChronicles',
    subtitle: 'La historia de la programación, vivida.',
    era: 'pre-code',
    yearLabel: 'NOW',
    tagline: 'La historia de la programación todavía se está escribiendo.',
    summary:
      'Una invitación a viajar hasta el origen del código y recorrer, en reversa y luego hacia el futuro, toda la evolución de la programación.',
    color: '#e8e6e1',
    backgroundTheme: 'dark',
    nextChapterId: 'ch-01-before-code',
  },
  {
    id: 'ch-01-before-code',
    number: 1,
    title: 'Antes del Código',
    subtitle: 'Ideas, algoritmos, máquinas',
    era: 'pre-code',
    yearLabel: '1800s',
    tagline: 'Antes de las computadoras, existían los algoritmos.',
    summary:
      'En un espacio oscuro aparecen máquinas mecánicas, documentos y la figura de Ada Lovelace. La idea de programar nace antes que cualquier computadora.',
    color: '#c9a24a',
    backgroundTheme: 'warm',
    nextChapterId: 'ch-02-machines',
  },
  {
    id: 'ch-02-machines',
    number: 2,
    title: 'Las Máquinas',
    subtitle: 'Mecánicas y electrónicas primitivas',
    era: 'machines',
    yearLabel: '1930s — 1940s',
    tagline: 'La máquina aprendió a seguir instrucciones.',
    summary:
      'De los relés y las tarjetas perforadas a la Z3 y las máquinas programables. La computación se vuelve física y programable.',
    color: '#b58a4c',
    backgroundTheme: 'warm',
    nextChapterId: 'ch-03-computers',
  },
  {
    id: 'ch-03-computers',
    number: 3,
    title: 'Las Computadoras',
    subtitle: 'Nace la computación electrónica',
    era: 'computers',
    yearLabel: '1945 — 1951',
    tagline: 'El cálculo se volvió programable.',
    summary:
      'Tubos de vacío, ENIAC, UNIVAC y la arquitectura de von Neumann. La programación electrónica deja de ser un concepto y se vuelve industria.',
    color: '#8aa8c4',
    backgroundTheme: 'cold',
    nextChapterId: 'ch-04-languages',
  },
  {
    id: 'ch-04-languages',
    number: 4,
    title: 'Los Primeros Lenguajes',
    subtitle: 'Del código máquina a los compiladores',
    era: 'first-languages',
    yearLabel: '1950s — 1960s',
    tagline: 'Los humanos empezamos a hablar con las máquinas.',
    summary:
      'FORTRAN, LISP, COBOL y los primeros compiladores. Nace el concepto de lenguaje de programación como lo conocemos.',
    color: '#b58a4c',
    backgroundTheme: 'cold',
    nextChapterId: 'ch-05-systems',
  },
  {
    id: 'ch-05-systems',
    number: 5,
    title: 'Sistemas y Estructura',
    subtitle: 'C, UNIX, programación estructurada',
    era: 'systems',
    yearLabel: '1969 — 1978',
    tagline: 'La era de los sistemas y la estructura.',
    summary:
      'C y UNIX transforman la programación: sistemas operativos, programación estructurada y la base de todo lo que vendrá.',
    color: '#6f86a3',
    backgroundTheme: 'cold',
    nextChapterId: 'ch-06-oop',
  },
  {
    id: 'ch-06-oop',
    number: 6,
    title: 'Los Objetos',
    subtitle: 'Programación orientada a objetos',
    era: 'oop',
    yearLabel: '1972 — 1985',
    tagline: 'Todo se convirtió en un objeto.',
    summary:
      'Smalltalk y C++ popularizan la programación orientada a objetos, cambiando la forma de modelar el software.',
    color: '#a2533f',
    backgroundTheme: 'cold',
    nextChapterId: 'ch-07-modern',
  },
  {
    id: 'ch-07-modern',
    number: 7,
    title: 'La Era Moderna',
    subtitle: 'Python, Java, Ruby',
    era: 'modern',
    yearLabel: '1991 — 2000',
    tagline: 'Los lenguajes se multiplicaron; cada uno resolvía un problema.',
    summary:
      'La explosión de lenguajes modernos: cada uno nació resolviendo un problema concreto. La programación se vuelve diversa y accesible.',
    color: '#c9a24a',
    backgroundTheme: 'tech',
    nextChapterId: 'ch-08-web',
  },
  {
    id: 'ch-08-web',
    number: 8,
    title: 'La Web',
    subtitle: 'JavaScript y el internet abierto',
    era: 'web',
    yearLabel: '1995 — 2012',
    tagline: 'El internet se convirtió en la Web.',
    summary:
      'JavaScript, TypeScript y la Web transforman todo: la programación ya no vive solo en las máquinas, vive en el navegador.',
    color: '#e0231c',
    backgroundTheme: 'tech',
    nextChapterId: 'ch-09-systems',
  },
  {
    id: 'ch-09-systems',
    number: 9,
    title: 'Sistemas Modernos',
    subtitle: 'Go, Rust, escala y seguridad',
    era: 'systems',
    yearLabel: '2009 — ahora',
    tagline: 'Nuevos sistemas para un mundo conectado.',
    summary:
      'Go y Rust responden a los desafíos de una internet masiva: concurrencia, seguridad de memoria y simplicidad.',
    color: '#7b8fa3',
    backgroundTheme: 'tech',
    nextChapterId: 'ch-10-ai',
  },
  {
    id: 'ch-10-ai',
    number: 10,
    title: 'IA y Programación Asistida',
    subtitle: 'Máquinas que escriben código',
    era: 'ai',
    yearLabel: '2012 — ahora',
    tagline: 'La inteligencia se volvió parte del stack.',
    summary:
      'El aprendizaje profundo y los grandes modelos de lenguaje transforman la forma de escribir y entender código: la programación asistida por IA.',
    color: '#c8392a',
    backgroundTheme: 'abstract',
    nextChapterId: 'ch-11-future',
  },
  {
    id: 'ch-11-future',
    number: 11,
    title: 'El Futuro del Código',
    subtitle: 'Cuántico, sistemas generativos, nuevos paradigmas',
    era: 'future',
    yearLabel: 'FUTURO',
    tagline: '¿Qué será programar cuando las máquinas también creen código?',
    summary:
      'Un viaje especulativo y responsable hacia lo que vendrá: computación cuántica, sistemas generativos e interfaces naturales.',
    color: '#e35a3c',
    backgroundTheme: 'abstract',
  },
];

export const getChapter = (id: string) => chapters.find((c) => c.id === id);
export const getChapterByNumber = (n: number) => chapters.find((c) => c.number === n);