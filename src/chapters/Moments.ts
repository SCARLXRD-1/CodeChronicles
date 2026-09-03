/**
 * Momentos narrativos de un capítulo.
 * Cada momento es una "toma cinematográfica" con su propio contenido
 * editorial, alineado con la cámara scroll-driven.
 */

export type MomentType =
  | 'title'
  | 'text'
  | 'character'
  | 'machine'
  | 'artifact'
  | 'quote'
  | 'code'
  | 'timeline'
  | 'influences'
  | 'comparison'
  | 'discover'
  | 'transition';

export interface Moment {
  id: string;
  type: MomentType;
  /** Capítulo al que pertenece */
  chapterId: string;
  /** % global de scroll donde empieza (0..1) */
  start: number;
  /** % global de scroll donde termina (0..1) */
  end: number;
  layout?: 'left' | 'center' | 'right';
  title?: string;
  subtitle?: string;
  body?: string;
  eyebrow?: string;
  year?: string;
  dataRef?: string;
}

export const firstChapterMoments: Moment[] = [
  {
    id: 'm1-title',
    chapterId: 'ch-01-before-code',
    type: 'title',
    start: 0.005,
    end: 0.035,
    layout: 'center',
    eyebrow: 'Antes de las computadoras, existían los algoritmos.',
    title: 'Antes del Código',
    subtitle: 'Ideas, algoritmos, máquinas',
  },
  {
    id: 'm2-darkness',
    chapterId: 'ch-01-before-code',
    type: 'text',
    start: 0.035,
    end: 0.06,
    layout: 'left',
    eyebrow: '1800s',
    title: 'Una habitación oscura',
    body:
      'Mucho antes de la electricidad, de los transistores y de cualquier cosa llamada "computadora", existía una idea: una máquina que pudiera seguir instrucciones.',
  },
  {
    id: 'm3-jacquard',
    chapterId: 'ch-01-before-code',
    type: 'artifact',
    start: 0.06,
    end: 0.09,
    layout: 'right',
    eyebrow: '1801',
    title: 'Las tarjetas perforadas',
    dataRef: 'tarjetas-perforadas-jacquard',
    body:
      'En Lyon, un telar tejía patrones leyendo agujeros perforados en tarjetas. La tarjeta, no el telar, contenía el diseño. Nacía una idea: el control por datos.',
  },
  {
    id: 'm4-babbage',
    chapterId: 'ch-01-before-code',
    type: 'machine',
    start: 0.09,
    end: 0.13,
    layout: 'left',
    eyebrow: '1837',
    title: 'La máquina analítica',
    dataRef: 'analytical-engine',
    body:
      'Charles Babbage imaginó una máquina con un molino y un almacén, controlada por tarjetas, capaz de bifurcar y repetir: una computadora un siglo antes de su tiempo.',
  },
  {
    id: 'm5-ada',
    chapterId: 'ch-01-before-code',
    type: 'character',
    start: 0.13,
    end: 0.18,
    layout: 'center',
    eyebrow: '1843',
    title: 'Ada Lovelace',
    dataRef: 'ada-lovelace',
    body:
      'Ada vio más lejos que nadie. Entendió que la máquina podía tejer no solo números, sino cualquier patrón: símbolos, música, ideas.',
  },
  {
    id: 'm6-quote-ada',
    chapterId: 'ch-01-before-code',
    type: 'quote',
    start: 0.18,
    end: 0.225,
    layout: 'center',
    title:
      'La Máquina Analítica teje patrones algebraicos, igual que el telar de Jacquard teje flores y hojas.',
    subtitle: 'Ada Lovelace, 1843',
  },
  {
    id: 'm7-algorithm',
    chapterId: 'ch-01-before-code',
    type: 'code',
    start: 0.225,
    end: 0.27,
    layout: 'left',
    eyebrow: 'EL PRIMER ALGORITMO',
    title: 'Un programa escrito antes de las computadoras',
    dataRef: 'bernoulli-algorithm',
    body:
      'Acompañando sus notas, Ada esbozó los pasos para calcular los números de Bernoulli en la máquina analítica: el primer algoritmo publicado para una máquina.',
  },
  {
    id: 'm8-evolution',
    chapterId: 'ch-01-before-code',
    type: 'timeline',
    start: 0.27,
    end: 0.32,
    layout: 'center',
    eyebrow: 'LA IDEA SE EXPANDE',
    title: 'De las tarjetas a las señales',
    body:
      'La idea del control por símbolos pasó de las tarjetas perforadas a los relés, a la lógica, a los repertorios de instrucciones. Pero la semilla ya estaba plantada.',
  },
  {
    id: 'm8b-compare',
    chapterId: 'ch-01-before-code',
    type: 'comparison',
    start: 0.32,
    end: 0.36,
    layout: 'center',
    eyebrow: 'LA IDEA, MODERNIZADA',
    title: 'Comparar lenguajes',
    body:
      'Cada lenguaje nació para resolver un problema. Elige dos y compara cómo expresan la misma idea.',
  },
  {
    id: 'm9-next',
    chapterId: 'ch-01-before-code',
    type: 'transition',
    start: 0.36,
    end: 0.38,
    layout: 'center',
    eyebrow: 'CAPÍTULO 02 · LO QUE SIGUE',
    title: 'Las Máquinas',
    body: 'Las computadoras mecánicas y electrónicas primitivas empiezan a obedecer instrucciones.',
  },
];

const chapter02Moments: Moment[] = [
  {
    id: 'c2m1-title',
    chapterId: 'ch-02-machines',
    type: 'title',
    start: 0.38,
    end: 0.392,
    layout: 'center',
    eyebrow: '1930s — 1940s',
    title: 'Las Máquinas',
    subtitle: 'La máquina aprendió a seguir instrucciones.',
  },
  {
    id: 'c2m2-zuse',
    chapterId: 'ch-02-machines',
    type: 'character',
    start: 0.392,
    end: 0.404,
    layout: 'left',
    eyebrow: '1941',
    title: 'Konrad Zuse',
    dataRef: 'konrad-zuse',
    body:
      'En Berlín, un hombre construyó las máquinas con piezas de repuesto y relés. Su Z3 fue la primera computadora digital, programable y funcional del mundo.',
  },
  {
    id: 'c2m3-z3',
    chapterId: 'ch-02-machines',
    type: 'machine',
    start: 0.404,
    end: 0.416,
    layout: 'right',
    eyebrow: '1941',
    title: 'La Z3',
    dataRef: 'z3-machine',
    body:
      'Con miles de relés electromecánicos y cinta perforada, la Z3 realizaba aritmética de punto flotante binario: el código se hacía físico.',
  },
  {
    id: 'c2m4-turing',
    chapterId: 'ch-02-machines',
    type: 'character',
    start: 0.416,
    end: 0.429,
    layout: 'center',
    eyebrow: '1936',
    title: 'La frontera de lo computable',
    dataRef: 'alan-turing',
    body:
      'Antes de las máquinas electrónicas, Alan Turing definió en abstracto qué significa "poder ser calculado": la Máquina de Turing marcó los límites de todo lo que vino después.',
  },
  {
    id: 'c2m5-next',
    chapterId: 'ch-02-machines',
    type: 'transition',
    start: 0.429,
    end: 0.442,
    layout: 'center',
    eyebrow: 'CAPÍTULO 03 · LO QUE SIGUE',
    title: 'Las Computadoras',
    body: 'Los tubos de vacío y la electrónica reemplazan a los relés: nace la computación moderna.',
  },
];

const chapter03Moments: Moment[] = [
  {
    id: 'c3m1-title',
    chapterId: 'ch-03-computers',
    type: 'title',
    start: 0.442,
    end: 0.452,
    layout: 'center',
    eyebrow: '1945 — 1951',
    title: 'Las Computadoras',
    subtitle: 'El cálculo se volvió programable.',
  },
  {
    id: 'c3m2-eniac',
    chapterId: 'ch-03-computers',
    type: 'artifact',
    start: 0.452,
    end: 0.463,
    layout: 'left',
    eyebrow: '1945',
    title: 'El ENIAC',
    dataRef: 'foto-eniac',
    body:
      'Diecisiete mil tubos de vacío, una sala completa y una potencia de cálculo sin precedentes. Programar significaba cablear y conectar interruptores.',
  },
  {
    id: 'c3m3-vonneumann',
    chapterId: 'ch-03-computers',
    type: 'text',
    start: 0.463,
    end: 0.473,
    layout: 'right',
    eyebrow: '1945',
    title: 'El programa almacenado',
    body:
      'La arquitectura de von Neumann propuso que datos e instrucciones compartieran la misma memoria. Sin esta idea, los programas no serían más que alambrado físico.',
  },
  {
    id: 'c3m4-univac',
    chapterId: 'ch-03-computers',
    type: 'machine',
    start: 0.473,
    end: 0.484,
    layout: 'left',
    eyebrow: '1951',
    title: 'El UNIVAC I',
    dataRef: 'univac-machine',
    body:
      'El primer computador electrónico comercial fabricado en serie. Con cinta magnética y un lenguaje ensamblador propio, la programación empezaba a ser una profesión.',
  },
  {
    id: 'c3m5-artifact-univac',
    chapterId: 'ch-03-computers',
    type: 'artifact',
    start: 0.484,
    end: 0.494,
    layout: 'right',
    eyebrow: 'Fotografía histórica',
    title: 'Un artefacto de la industria',
    dataRef: 'foto-univac',
    body:
      'El UNIVAC predijo en 1952 el resultado de las elecciones presidenciales de EE. UU. La computación dejaba de ser un experimento y entraba en la vida pública.',
  },
  {
    id: 'c3m6-next',
    chapterId: 'ch-03-computers',
    type: 'transition',
    start: 0.494,
    end: 0.504,
    layout: 'center',
    eyebrow: 'CAPÍTULO 04 · LO QUE SIGUE',
    title: 'Los Primeros Lenguajes',
    body: 'Cuenta la historia de cómo los humanos empezaron a hablar con las máquinas.',
  },
];

const chapter04Moments: Moment[] = [
  {
    id: 'c4m1-title',
    chapterId: 'ch-04-languages',
    type: 'title',
    start: 0.504,
    end: 0.514,
    layout: 'center',
    eyebrow: '1950s — 1960s',
    title: 'Los Primeros Lenguajes',
    subtitle: 'Del código máquina a los compiladores.',
  },
  {
    id: 'c4m2-backus',
    chapterId: 'ch-04-languages',
    type: 'character',
    start: 0.514,
    end: 0.524,
    layout: 'left',
    eyebrow: '1957',
    title: 'John Backus',
    dataRef: 'john-backus',
    body:
      'En IBM, Backus lideró el equipo que creó FORTRAN, el primer lenguaje de alto nivel ampliamente adoptado: escribir matemáticas, no instrucciones de máquina.',
  },
  {
    id: 'c4m3-fortran',
    chapterId: 'ch-04-languages',
    type: 'code',
    start: 0.524,
    end: 0.535,
    layout: 'right',
    eyebrow: '1957 · FORTRAN',
    title: 'Traducir la fórmula',
    dataRef: 'fortran-language',
    body:
      'Un compilador optimizaba el FORTRAN hasta competir con el ensamblador a mano. La programación científica acababa de nacer.',
  },
  {
    id: 'c4m4-mccarthy',
    chapterId: 'ch-04-languages',
    type: 'character',
    start: 0.535,
    end: 0.545,
    layout: 'left',
    eyebrow: '1958',
    title: 'John McCarthy',
    dataRef: 'john-mccarthy',
    body:
      'McCarthy creó LISP, el lenguaje de la inteligencia artificial temprana, y fundó el campo en el taller de Dartmouth: programar símbolos, no solo números.',
  },
  {
    id: 'c4m5-lisp',
    chapterId: 'ch-04-languages',
    type: 'code',
    start: 0.545,
    end: 0.555,
    layout: 'right',
    eyebrow: '1958 · LISP',
    title: 'Recurrencia y paréntesis',
    dataRef: 'lisp-language',
    body:
      'LISP introdujo las funciones de primera clase y la recursión como forma natural de programar.',
  },
  {
    id: 'c4m6-next',
    chapterId: 'ch-04-languages',
    type: 'transition',
    start: 0.555,
    end: 0.566,
    layout: 'center',
    eyebrow: 'CAPÍTULO 05 · LO QUE SIGUE',
    title: 'Sistemas y Estructura',
    body: 'C, UNIX y la programación estructurada transforman todo lo que vendrá.',
  },
];

const chapter05Moments: Moment[] = [
  {
    id: 'c5m1-title',
    chapterId: 'ch-05-systems',
    type: 'title',
    start: 0.566,
    end: 0.576,
    layout: 'center',
    eyebrow: '1969 — 1978',
    title: 'Sistemas y Estructura',
    subtitle: 'C, UNIX, programación estructurada.',
  },
  {
    id: 'c5m2-unix',
    chapterId: 'ch-05-systems',
    type: 'character',
    start: 0.576,
    end: 0.586,
    layout: 'left',
    eyebrow: '1969',
    title: 'Ken Thompson y Dennis Ritchie',
    dataRef: 'ken-thompson',
    body:
      'En los laboratorios Bell, Thompson y Ritchie construyeron UNIX: un sistema operativo multiusuario elegante y portable, escrito en un lenguaje nuevo.',
  },
  {
    id: 'c5m3-c',
    chapterId: 'ch-05-systems',
    type: 'code',
    start: 0.586,
    end: 0.597,
    layout: 'right',
    eyebrow: '1972 · C',
    title: 'C, el lenguaje de los sistemas',
    dataRef: 'c-language',
    body:
      'C combinó la eficiencia del ensamblador con la portabilidad de un lenguaje de alto nivel. Casi todo lo que usamos se escribió, directa o indirectamente, en C.',
  },
  {
    id: 'c5m4-knr',
    chapterId: 'ch-05-systems',
    type: 'artifact',
    start: 0.597,
    end: 0.607,
    layout: 'left',
    eyebrow: '1978',
    title: 'El manual que lo cambió todo',
    dataRef: 'the-c-programming-language-book',
    body:
      'El libro de Kernighan y Ritchie (K&R) se convirtió en el manual de referencia del lenguaje C y en el modelo de cómo se enseña a programar.',
  },
  {
    id: 'c5m5-wirth',
    chapterId: 'ch-05-systems',
    type: 'character',
    start: 0.607,
    end: 0.617,
    layout: 'right',
    eyebrow: '1970',
    title: 'Niklaus Wirth y la estructura',
    dataRef: 'niklaus-wirth',
    body:
      'Pascal enseñó a las generaciones a pensar en programas estructurados: secuencia, decisión y repetición. La claridad se volvió un objetivo del lenguaje.',
  },
  {
    id: 'c5m6-next',
    chapterId: 'ch-05-systems',
    type: 'transition',
    start: 0.617,
    end: 0.628,
    layout: 'center',
    eyebrow: 'CAPÍTULO 06 · LO QUE SIGUE',
    title: 'Los Objetos',
    body: 'Todo se convirtió en un objeto.',
  },
];

const chapter06Moments: Moment[] = [
  {
    id: 'c6m1-title',
    chapterId: 'ch-06-oop',
    type: 'title',
    start: 0.628,
    end: 0.64,
    layout: 'center',
    eyebrow: '1972 — 1985',
    title: 'Los Objetos',
    subtitle: 'Programación orientada a objetos.',
  },
  {
    id: 'c6m2-idea',
    chapterId: 'ch-06-oop',
    type: 'text',
    start: 0.64,
    end: 0.652,
    layout: 'left',
    eyebrow: 'La idea',
    title: 'Todo es un objeto',
    body:
      'Pequeñas cápsulas de datos y comportamiento que hablan entre sí por mensajes. Smalltalk, nacido en Xerox PARC, popularizó esta forma de modelar el mundo en el software.',
  },
  {
    id: 'c6m3-stroustrup',
    chapterId: 'ch-06-oop',
    type: 'character',
    start: 0.652,
    end: 0.664,
    layout: 'right',
    eyebrow: '1985',
    title: 'Bjarne Stroustrup',
    dataRef: 'bjarne-stroustrup',
    body:
      'Stroustrup tomó la eficiencia de C y le sumó los objetos. Así nació C++, uno de los lenguajes más usados en sistemas durante décadas.',
  },
  {
    id: 'c6m4-cpp',
    chapterId: 'ch-06-oop',
    type: 'code',
    start: 0.664,
    end: 0.677,
    layout: 'center',
    eyebrow: 'C++',
    title: 'C y objetos, juntos',
    dataRef: 'cpp-language',
    body:
      'C++ extendió C con clases y herencia sin abandonar el control de bajo nivel que los sistemas necesitaban.',
  },
  {
    id: 'c6m5-next',
    chapterId: 'ch-06-oop',
    type: 'transition',
    start: 0.677,
    end: 0.69,
    layout: 'center',
    eyebrow: 'CAPÍTULO 07 · LO QUE SIGUE',
    title: 'La Era Moderna',
    body: 'Los lenguajes se multiplicaron; cada uno resolvía un problema.',
  },
];

const chapter07Moments: Moment[] = [
  {
    id: 'c7m1-title',
    chapterId: 'ch-07-modern',
    type: 'title',
    start: 0.69,
    end: 0.699,
    layout: 'center',
    eyebrow: '1991 — 2000',
    title: 'La Era Moderna',
    subtitle: 'Python, Java, Ruby.',
  },
  {
    id: 'c7m2-vanrossum',
    chapterId: 'ch-07-modern',
    type: 'character',
    start: 0.699,
    end: 0.708,
    layout: 'left',
    eyebrow: '1991',
    title: 'Guido van Rossum',
    dataRef: 'guido-van-rossum',
    body:
      'Python priorizó la legibilidad por encima de todo. Su filosofía explícita y simple lo convirtió en el lenguaje más accesible y versátil del mundo.',
  },
  {
    id: 'c7m3-python',
    chapterId: 'ch-07-modern',
    type: 'code',
    start: 0.708,
    end: 0.717,
    layout: 'right',
    eyebrow: 'Python',
    title: 'Simplicidad explícita',
    dataRef: 'python-language',
    body:
      'Un "Hola, mundo" en una sola línea. Python demostró que la claridad podía ser también potencia.',
  },
  {
    id: 'c7m4-gosling',
    chapterId: 'ch-07-modern',
    type: 'character',
    start: 0.717,
    end: 0.726,
    layout: 'left',
    eyebrow: '1995',
    title: 'James Gosling',
    dataRef: 'james-gosling',
    body:
      'Java nació con la promesa de correr en cualquier máquina a través de la JVM: "escríbelo una vez, ejecútalo en cualquier parte".',
  },
  {
    id: 'c7m5-matsumoto',
    chapterId: 'ch-07-modern',
    type: 'character',
    start: 0.726,
    end: 0.735,
    layout: 'right',
    eyebrow: '1995',
    title: 'Yukihiro Matsumoto',
    dataRef: 'yukihiro-matsumoto',
    body:
      'Ruby fue diseñado para la productividad y la felicidad del programador: un lenguaje dinámico y elegante, pensado para seres humanos.',
  },
  {
    id: 'c7m6-hejlsberg',
    chapterId: 'ch-07-modern',
    type: 'character',
    start: 0.735,
    end: 0.744,
    layout: 'left',
    eyebrow: '2000',
    title: 'Anders Hejlsberg',
    dataRef: 'anders-hejlsberg',
    body:
      'El creador de Turbo Pascal y Delphi diseñó C# dentro de la plataforma .NET: un lenguaje moderno y orientado a objetos para la empresa.',
  },
  {
    id: 'c7m7-next',
    chapterId: 'ch-07-modern',
    type: 'transition',
    start: 0.744,
    end: 0.752,
    layout: 'center',
    eyebrow: 'CAPÍTULO 08 · LO QUE SIGUE',
    title: 'La Web',
    body: 'El internet se convirtió en la Web.',
  },
];

const chapter08Moments: Moment[] = [
  {
    id: 'c8m1-title',
    chapterId: 'ch-08-web',
    type: 'title',
    start: 0.752,
    end: 0.762,
    layout: 'center',
    eyebrow: '1995 — 2012',
    title: 'La Web',
    subtitle: 'JavaScript y el internet abierto.',
  },
  {
    id: 'c8m2-eich',
    chapterId: 'ch-08-web',
    type: 'character',
    start: 0.762,
    end: 0.772,
    layout: 'left',
    eyebrow: '1995',
    title: 'Brendan Eich',
    dataRef: 'brendan-eich',
    body:
      'En diez días, Eich creó JavaScript para Netscape. Sin saberlo, entregó el lenguaje que daría vida a la Web en todos los navegadores del planeta.',
  },
  {
    id: 'c8m3-javascript',
    chapterId: 'ch-08-web',
    type: 'code',
    start: 0.772,
    end: 0.783,
    layout: 'right',
    eyebrow: 'JavaScript',
    title: 'El lenguaje del navegador',
    dataRef: 'javascript-language',
    body:
      'La programación ya no vivía solo en los servidores: ahora vivía en cada página, en cada clic, en cada navegador.',
  },
  {
    id: 'c8m4-bernerslee',
    chapterId: 'ch-08-web',
    type: 'text',
    start: 0.783,
    end: 0.793,
    layout: 'left',
    eyebrow: '1989',
    title: 'Una propuesta en el CERN',
    dataRef: 'world-wide-web',
    body:
      'Tim Berners-Lee propuso un sistema de hipertexto distribuido: la World Wide Web. Un documento cambiaría la forma en que todo el mundo comparte información.',
  },
  {
    id: 'c8m5-typescript',
    chapterId: 'ch-08-web',
    type: 'text',
    start: 0.793,
    end: 0.803,
    layout: 'right',
    eyebrow: '2012',
    title: 'Tipos para la escala',
    body:
      'A medida que la Web crecía, JavaScript necesitaba herramientas. Hejlsberg lideró TypeScript, un superconjunto con tipos estáticos que hoy sostiene grandes aplicaciones.',
  },
  {
    id: 'c8m6-next',
    chapterId: 'ch-08-web',
    type: 'transition',
    start: 0.803,
    end: 0.814,
    layout: 'center',
    eyebrow: 'CAPÍTULO 09 · LO QUE SIGUE',
    title: 'Sistemas Modernos',
    body: 'Nuevos sistemas para un mundo conectado.',
  },
];

const chapter09Moments: Moment[] = [
  {
    id: 'c9m1-title',
    chapterId: 'ch-09-systems',
    type: 'title',
    start: 0.814,
    end: 0.826,
    layout: 'center',
    eyebrow: '2009 — ahora',
    title: 'Sistemas Modernos',
    subtitle: 'Go, Rust, escala y seguridad.',
  },
  {
    id: 'c9m2-rust-char',
    chapterId: 'ch-09-systems',
    type: 'character',
    start: 0.826,
    end: 0.838,
    layout: 'left',
    eyebrow: 'Rust',
    title: 'Graydon Hoare',
    dataRef: 'graydon-hoare',
    body:
      'Rust nació para responder a una pregunta difícil: ¿puede un lenguaje de sistemas ser rápido y, a la vez, seguro en memoria? La respuesta fue sí.',
  },
  {
    id: 'c9m3-go',
    chapterId: 'ch-09-systems',
    type: 'character',
    start: 0.838,
    end: 0.85,
    layout: 'right',
    eyebrow: '2009 · Go',
    title: 'Griesemer, Pike y Thompson',
    dataRef: 'robert-griesemer',
    body:
      'Go fue creado en Google para dominar la concurrencia de los servidores modernos. Simplicidad, compilación rápida y goroutines para un mundo conectado.',
  },
  {
    id: 'c9m4-go-code',
    chapterId: 'ch-09-systems',
    type: 'code',
    start: 0.85,
    end: 0.863,
    layout: 'center',
    eyebrow: 'Go',
    title: 'La nube que habla Go',
    dataRef: 'go-language',
    body:
      'Saludando al mundo con un programa mínimo: así se ve la base de buena parte de la infraestructura y la nube actuales.',
  },
  {
    id: 'c9m5-next',
    chapterId: 'ch-09-systems',
    type: 'transition',
    start: 0.863,
    end: 0.876,
    layout: 'center',
    eyebrow: 'CAPÍTULO 10 · LO QUE SIGUE',
    title: 'IA y Programación Asistida',
    body: 'La inteligencia se volvió parte del stack.',
  },
];

const chapter10Moments: Moment[] = [
  {
    id: 'c10m1-title',
    chapterId: 'ch-10-ai',
    type: 'title',
    start: 0.876,
    end: 0.888,
    layout: 'center',
    eyebrow: '2012 — ahora',
    title: 'IA y Programación Asistida',
    subtitle: 'Máquinas que escriben código.',
  },
  {
    id: 'c10m2-origin',
    chapterId: 'ch-10-ai',
    type: 'text',
    start: 0.888,
    end: 0.9,
    layout: 'left',
    eyebrow: 'El origen',
    title: 'De Dartmouth a la IA moderna',
    dataRef: 'dartmouth-ai-workshop',
    body:
      'Lo que empezó como una propuesta de verano en 1956, acuñando el término "inteligencia artificial", hoy se ha convertido en una herramienta cotidiana.',
  },
  {
    id: 'c10m3-deeplearning',
    chapterId: 'ch-10-ai',
    type: 'text',
    start: 0.9,
    end: 0.912,
    layout: 'right',
    eyebrow: '2012',
    title: 'El auge del aprendizaje profundo',
    body:
      'El éxito de redes neuronales profundas impulsó el renacimiento de la IA. Máquinas que aprenden de datos y, hoy, también entienden y generan código.',
  },
  {
    id: 'c10m4-assist',
    chapterId: 'ch-10-ai',
    type: 'quote',
    start: 0.912,
    end: 0.925,
    layout: 'center',
    title:
      'La programación ya no es solo decirle a la máquina qué hacer, sino colaborar con una inteligencia que sugiere, completa y razona sobre el código.',
    subtitle: 'Programación asistida por IA',
  },
  {
    id: 'c10m5-next',
    chapterId: 'ch-10-ai',
    type: 'transition',
    start: 0.925,
    end: 0.938,
    layout: 'center',
    eyebrow: 'CAPÍTULO 11 · LO QUE SIGUE',
    title: 'El Futuro del Código',
    body: '¿Qué será programar cuando las máquinas también creen código?',
  },
];

const chapter11Moments: Moment[] = [
  {
    id: 'c11m1-title',
    chapterId: 'ch-11-future',
    type: 'title',
    start: 0.938,
    end: 0.954,
    layout: 'center',
    eyebrow: 'FUTURO',
    title: 'El Futuro del Código',
    subtitle: 'Cuántico, sistemas generativos, nuevos paradigmas.',
  },
  {
    id: 'c11m2-quantum',
    chapterId: 'ch-11-future',
    type: 'text',
    start: 0.954,
    end: 0.969,
    layout: 'left',
    eyebrow: '¿Qué viene?',
    title: 'Algoritmos y cúbits',
    body:
      'La computación cuántica promete resolver problemas que hoy son imposibles. Y con ella, lenguajes nuevos pensados para una lógica distinta, la del mundo cuántico.',
  },
  {
    id: 'c11m3-generative',
    chapterId: 'ch-11-future',
    type: 'text',
    start: 0.969,
    end: 0.985,
    layout: 'right',
    eyebrow: 'Sistemas generativos',
    title: 'Programar conversando',
    body:
      'Los sistemas generativos y las interfaces naturales apuntan a un futuro en el que el propósito del código sea más importante que su sintaxis: programar por intención.',
  },
  {
    id: 'c11m4-finale',
    chapterId: 'ch-11-future',
    type: 'quote',
    start: 0.985,
    end: 1.0,
    layout: 'center',
    title:
      'Cada lenguaje es una respuesta a una pregunta de su época. El futuro del código se escribirá con las preguntas que aún no hemos sabido formular.',
    subtitle: 'CodeChronicles',
  },
];

const chapterMoments: Record<string, Moment[]> = {
  'ch-01-before-code': firstChapterMoments,
  'ch-02-machines': chapter02Moments,
  'ch-03-computers': chapter03Moments,
  'ch-04-languages': chapter04Moments,
  'ch-05-systems': chapter05Moments,
  'ch-06-oop': chapter06Moments,
  'ch-07-modern': chapter07Moments,
  'ch-08-web': chapter08Moments,
  'ch-09-systems': chapter09Moments,
  'ch-10-ai': chapter10Moments,
  'ch-11-future': chapter11Moments,
};

export function getChapterMoments(chapterId: string): Moment[] {
  return chapterMoments[chapterId] ?? [];
}

export function getAllMoments(): Moment[] {
  return Object.values(chapterMoments).flat();
}
