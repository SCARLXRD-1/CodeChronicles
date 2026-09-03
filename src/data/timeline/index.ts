import type { TimelineEvent } from '../types';

export const timeline: TimelineEvent[] = [
  {
    id: 'analytical-engine-note',
    year: 1843,
    dateLabel: '1843',
    title: 'Primer algoritmo destinado a una máquina',
    description:
      'Ada Lovelace publica notas sobre la Máquina Analítica de Babbage que incluyen un algoritmo para calcular números de Bernoulli, considerado el primer programa concebido para una máquina.',
    era: 'pre-code',
    category: 'algorithm',
    related: ['ada-lovelace', 'analytical-engine', 'bernoulli-algorithm'],
    sources: [
      {
        title: 'Notas de Ada Lovelace sobre la Máquina Analítica (Sketch of the Analytical Engine)',
        type: 'primary',
        note: 'Traducción y notas sobre la conferencia de Menabrea, 1843.',
      },
    ],
  },
  {
    id: 'babbage-analytical-engine',
    year: 1837,
    dateLabel: '1837',
    title: 'Diseño de la Máquina Analítica',
    description:
      'Charles Babbage diseña la Máquina Analítica, una computadora mecánica programable con unidad de procesamiento, memoria y control de flujo por tarjetas perforadas.',
    era: 'pre-code',
    category: 'machine',
    related: ['charles-babbage', 'ada-lovelace'],
    sources: [
      {
        title: 'Babbage, passages from the life of a philosopher (1864)',
        type: 'book',
      },
    ],
  },
  {
    id: 'difference-engine',
    year: 1822,
    dateLabel: '1822',
    title: 'Máquina Diferencial',
    description:
      'Babbage diseña la Máquina Diferencial, una máquina para calcular tablas polinómicas mediante diferencias finitas, precursora conceptual de sus máquinas programables.',
    era: 'pre-code',
    category: 'machine',
    related: ['charles-babbage', 'analytical-engine'],
    sources: [
      {
        title: 'Science Museum, Difference Engine',
        type: 'archive',
      },
    ],
  },
  {
    id: 'jacquard-loom',
    year: 1801,
    dateLabel: '1801',
    title: 'Telar de Jacquard',
    description:
      'Joseph Marie Jacquard perfecciona un telar controlado por tarjetas perforadas, inspirando el uso de tarjetas perforadas para el control de máquinas.',
    era: 'pre-code',
    category: 'concept',
    related: ['punch-card'],
    sources: [
      {
        title: 'El telar de Jacquard, Computer History Museum',
        type: 'archive',
      },
    ],
  },
  {
    id: 'boolean-algebra',
    year: 1854,
    dateLabel: '1854',
    title: 'Álgebra de Boole',
    description:
      'George Boole publica "An Investigation of the Laws of Thought", estableciendo la lógica booleana, base matemática de la computación digital moderna.',
    era: 'pre-code',
    category: 'concept',
    related: ['boolean-logic', 'logic-gates'],
    sources: [
      {
        title: 'Boole, Una investigación de las leyes del pensamiento (1854)',
        type: 'book',
      },
    ],
  },
  {
    id: 'turing-machine',
    year: 1936,
    dateLabel: '1936',
    title: 'Máquina de Turing',
    description:
      'Alan Turing publica "On Computable Numbers", definiendo un modelo matemático abstracto de computación: la Máquina de Turing.',
    era: 'algorithms',
    category: 'algorithm',
    related: ['alan-turing', 'turing-machine-concept'],
    sources: [
      {
        title: 'Turing, Sobre los números computables (1936)',
        type: 'paper',
        note: 'Proceedings of the London Mathematical Society.',
      },
    ],
  },
  {
    id: 'church-lambda',
    year: 1936,
    dateLabel: '1936',
    title: 'Cálculo lambda',
    description:
      'Alonzo Church desarrolla el cálculo lambda, un sistema formal de computación equivalente a la Máquina de Turing, base de la programación funcional.',
    era: 'algorithms',
    category: 'algorithm',
    related: ['lambda-calculus', 'lisp', 'alonzo-church'],
    sources: [
      {
        title: 'Church, Una nota sobre el Entscheidungsproblem (1936)',
        type: 'paper',
      },
    ],
  },
  {
    id: 'z3',
    year: 1941,
    dateLabel: '1941',
    title: 'Z3 de Konrad Zuse',
    description:
      'Konrad Zuse completa la Z3, considerada la primera computadora digital programable y funcional del mundo, basada en relés electromecánicos.',
    era: 'machines',
    category: 'machine',
    related: ['konrad-zuse', 'z3-machine'],
    sources: [
      {
        title: 'Deutsches Museum, Z3',
        type: 'archive',
      },
    ],
  },
  {
    id: 'eniac',
    year: 1945,
    dateLabel: '1945',
    title: 'ENIAC',
    description:
      'Se completa el ENIAC, uno de los primeros computadores electrónicos de propósito general, con tubos de vacío y programación por cableado e interruptores.',
    era: 'computers',
    category: 'computer',
    related: ['eniac-machine', 'grace-hopper'],
    sources: [
      {
        title: 'Computer History Museum, ENIAC',
        type: 'archive',
      },
    ],
  },
  {
    id: 'von-neumann',
    year: 1945,
    dateLabel: '1945',
    title: 'Arquitectura de von Neumann',
    description:
      'John von Neumann describe la arquitectura de programa almacenado, donde datos e instrucciones comparten memoria, base de casi todos los computadores modernos.',
    era: 'computers',
    category: 'computer',
    related: ['von-neumann-architecture'],
    sources: [
      {
        title: 'von Neumann, Primer borrador de un informe sobre la EDVAC (1945)',
        type: 'paper',
      },
    ],
  },
  {
    id: 'univac',
    year: 1951,
    dateLabel: '1951',
    title: 'UNIVAC I',
    description:
      'El UNIVAC I es uno de los primeros computadores comerciales, adquirido por la Oficina del Censo de EE. UU., marcando el inicio de la industria de la computación.',
    era: 'computers',
    category: 'computer',
    related: ['grace-hopper', 'univac-machine'],
    sources: [
      {
        title: 'Computer History Museum, UNIVAC',
        type: 'archive',
      },
    ],
  },
  {
    id: 'fortran',
    year: 1957,
    dateLabel: '1957',
    title: 'FORTRAN',
    description:
      'IBM lanza FORTRAN, el primer lenguaje de programación de alto nivel ampliamente adoptado, diseñado para cómputo científico y numérico.',
    era: 'first-languages',
    category: 'language',
    related: ['john-backus', 'fortran-language'],
    sources: [
      {
        title: 'Backus, El sistema de codificación automática FORTRAN (1957)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'flow-matic',
    year: 1955,
    dateLabel: '1955',
    title: 'FLOW-MATIC',
    description:
      'Grace Hopper y su equipo desarrollan FLOW-MATIC, precursor de COBOL y uno de los primeros lenguajes orientados a negocios.',
    era: 'first-languages',
    category: 'language',
    related: ['grace-hopper', 'cobol-language', 'flow-matic-language'],
    sources: [
      {
        title: 'Hopper, Programación automática (1955)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'lisp',
    year: 1958,
    dateLabel: '1958',
    title: 'LISP',
    description:
      'John McCarthy crea LISP, el segundo lenguaje de programación de alto nivel, orientado a la inteligencia artificial y la programación simbólica.',
    era: 'first-languages',
    category: 'language',
    related: ['john-mccarthy', 'lisp-language', 'ai-history'],
    sources: [
      {
        title: 'McCarthy, Funciones recursivas de expresiones simbólicas (1960)',
        type: 'paper',
      },
    ],
  },
  {
    id: 'cobol',
    year: 1959,
    dateLabel: '1959',
    title: 'COBOL',
    description:
      'Se crea COBOL (Common Business-Oriented Language), diseñado para aplicaciones empresariales y de negocios, aún en uso en sistemas financieros.',
    era: 'enterprise',
    category: 'language',
    related: ['grace-hopper', 'cobol-language'],
    sources: [
      {
        title: 'CODASYL, Especificación de COBOL (1959)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'algol',
    year: 1958,
    dateLabel: '1958',
    title: 'ALGOL',
    description:
      'ALGOL se define como un lenguaje algorítmico internacional, influyendo profundamente en la estructura de los lenguajes posteriores (bloques, recursividad, BNF).',
    era: 'first-languages',
    category: 'language',
    related: ['algol-language'],
    sources: [
      {
        title: 'Naur et al., Informe revisado sobre el lenguaje algorítmico ALGOL 60',
        type: 'primary',
      },
    ],
  },
  {
    id: 'smalltalk',
    year: 1972,
    dateLabel: '1972',
    title: 'Smalltalk',
    description:
      'El proyecto Smalltalk de Xerox PARC populariza la programación orientada a objetos, el entorno integrado y la interfaz gráfica.',
    era: 'oop',
    category: 'language',
    related: ['alan-kay', 'smalltalk-language'],
    sources: [
      {
        title: 'Kay, La historia temprana de Smalltalk (1993)',
        type: 'primary',
        note: 'ACM SIGPLAN HOPL II conference.',
      },
    ],
  },
  {
    id: 'c-language',
    year: 1972,
    dateLabel: '1972',
    title: 'C',
    description:
      'Dennis Ritchie desarrolla el lenguaje C en Bell Labs para reescribir UNIX, convirtiéndose en uno de los lenguajes más influyentes de la historia.',
    era: 'c',
    category: 'language',
    related: ['dennis-ritchie', 'ken-thompson', 'c-language', 'unix-system'],
    sources: [
      {
        title: 'Ritchie, El desarrollo del lenguaje C (1993)',
        type: 'primary',
        note: 'ACM SIGPLAN HOPL II conference.',
      },
    ],
  },
  {
    id: 'pascal',
    year: 1970,
    dateLabel: '1970',
    title: 'Pascal',
    description:
      'Niklaus Wirth crea Pascal, un lenguaje docente y estructurado que influyó en la enseñanza de la programación.',
    era: 'structured',
    category: 'language',
    related: ['niklaus-wirth', 'pascal-language'],
    sources: [
      {
        title: 'Wirth, El lenguaje de programación Pascal (1971)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'unix',
    year: 1969,
    dateLabel: '1969',
    title: 'UNIX',
    description:
      'Ken Thompson y Dennis Ritchie desarrollan UNIX en Bell Labs, un sistema operativo multiusuario que impactó profundamente la historia de los sistemas y los lenguajes.',
    era: 'systems',
    category: 'system',
    related: ['ken-thompson', 'dennis-ritchie', 'unix-system', 'c-language'],
    sources: [
      {
        title: 'Ritchie & Thompson, The UNIX Time-Sharing System (1974)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'c-plus-plus',
    year: 1985,
    dateLabel: '1985',
    title: 'C++',
    description:
      'Bjarne Stroustrup publica C++, extendiendo C con programación orientada a objetos, y que se volvería uno de los lenguajes más usados en sistemas.',
    era: 'oop',
    category: 'language',
    related: ['bjarne-stroustrup', 'cpp-language'],
    sources: [
      {
        title: 'Stroustrup, El lenguaje de programación C++ (1985)',
        type: 'book',
      },
    ],
  },
  {
    id: 'python',
    year: 1991,
    dateLabel: '1991',
    title: 'Python',
    description:
      'Guido van Rossum publica Python, un lenguaje legible y multiparadigma que se convertiría en uno de los más populares y versátiles del mundo.',
    era: 'modern',
    category: 'language',
    related: ['guido-van-rossum', 'python-language'],
    sources: [
      {
        title: 'van Rossum, Lanzamiento e historia de Python',
        type: 'web',
        url: 'https://www.python.org/doc/essays/foreword/',
      },
    ],
  },
  {
    id: 'java',
    year: 1995,
    dateLabel: '1995',
    title: 'Java',
    description:
      'James Gosling publica Java, un lenguaje orientado a objetos diseñado para ser portable a través de la Máquina Virtual de Java (JVM).',
    era: 'modern',
    category: 'language',
    related: ['james-gosling', 'java-language'],
    sources: [
      {
        title: 'Sun Microsystems, El lenguaje Java (1995)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'javascript',
    year: 1995,
    dateLabel: '1995',
    title: 'JavaScript',
    description:
      'Brendan Eich crea JavaScript en 10 días para Netscape; se convertiría en el lenguaje de la web, ejecutándose en todos los navegadores.',
    era: 'web',
    category: 'language',
    related: ['brendan-eich', 'javascript-language'],
    sources: [
      {
        title: 'Brendan Eich, Historia de JavaScript (primera charla publica, 1995)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'ruby',
    year: 1995,
    dateLabel: '1995',
    title: 'Ruby',
    description:
      'Yukihiro Matsumoto publica Ruby, un lenguaje dinámico y orientado a objetos diseñado para la productividad y la felicidad del programador.',
    era: 'modern',
    category: 'language',
    related: ['yukihiro-matsumoto', 'ruby-language'],
    sources: [
      {
        title: 'Matsumoto, Ruby announcement (1995)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'csharp',
    year: 2000,
    dateLabel: '2000',
    title: 'C#',
    description:
      'Anders Hejlsberg diseña C# en Microsoft, un lenguaje moderno orientado a objetos dentro de la plataforma .NET.',
    era: 'modern',
    category: 'language',
    related: ['anders-hejlsberg', 'csharp-language'],
    sources: [
      {
        title: 'ECMA, Especificación del lenguaje C# (2000)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'go',
    year: 2009,
    dateLabel: '2009',
    title: 'Go',
    description:
      'Robert Griesemer, Rob Pike y Ken Thompson crean Go en Google, un lenguaje compilado y concurrente para sistemas y servicios de red.',
    era: 'modern',
    category: 'language',
    related: ['robert-griesemer', 'rob-pike', 'ken-thompson', 'go-language'],
    sources: [
      {
        title: 'The Go project, golang.org',
        type: 'web',
        url: 'https://go.dev/',
      },
    ],
  },
  {
    id: 'rust',
    year: 2010,
    dateLabel: '2010',
    title: 'Rust',
    description:
      'Graydon Hoare crea Rust en Mozilla, un lenguaje de sistemas enfocado en seguridad de memoria y concurrencia segura.',
    era: 'systems',
    category: 'language',
    related: ['graydon-hoare', 'rust-language'],
    sources: [
      {
        title: 'The Rust project, rust-lang.org',
        type: 'web',
        url: 'https://www.rust-lang.org/',
      },
    ],
  },
  {
    id: 'typescript',
    year: 2012,
    dateLabel: '2012',
    title: 'TypeScript',
    description:
      'Anders Hejlsberg lidera el desarrollo de TypeScript en Microsoft, un superconjunto de JavaScript con tipos estáticos.',
    era: 'web',
    category: 'language',
    related: ['anders-hejlsberg', 'typescript-language', 'javascript-language'],
    sources: [
      {
        title: 'Microsoft, Anuncio de TypeScript (2012)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'deep-learning',
    year: 2012,
    dateLabel: '2012',
    title: 'Auge del aprendizaje profundo',
    description:
      'El éxito de redes neuronales profundas (como AlexNet en 2012) impulsa el auge de la IA moderna y la programación asistida.',
    era: 'ai',
    category: 'ai',
    related: ['ai-history', 'neural-networks'],
    sources: [
      {
        title: 'Krizhevsky, Sutskever y Hinton, Clasificación ImageNet con redes neuronales convolucionales profundas (2012)',
        type: 'paper',
      },
    ],
  },
  {
    id: 'llm-era',
    year: 2023,
    dateLabel: '2023',
    title: 'Modelos de lenguaje y código',
    description:
      'La generalización de los grandes modelos de lenguaje transforma la programación asistida por IA, generando y entendiendo código a gran escala.',
    era: 'ai',
    category: 'ai',
    related: ['ai-history', 'code-assist-ai'],
    sources: [
      {
        title: 'Literatura contemporánea sobre modelos de lenguaje aplicados a código',
        type: 'secondary',
      },
    ],
  },
];

export const timelineByEra = (era: string): TimelineEvent[] =>
  timeline.filter((e) => e.era === era);
