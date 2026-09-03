import type { MachineEntry } from '../types';

export const machines: MachineEntry[] = [
  {
    id: 'analytical-engine',
    name: 'Máquina Analítica',
    year: 1837,
    creator: 'Charles Babbage',
    era: 'pre-code',
    type: 'computadora mecánica programable',
    description:
      'La Máquina Analítica fue el diseño de una computadora mecánica de propósito general con unidad de procesamiento (mill), memoria (store), control por tarjetas perforadas y salida impresa.',
    technicalNotes: [
      'Incorporaba un "mill" (molino) para operaciones aritméticas.',
      'Un "store" (almacén) para conservar números y resultados.',
      'Control mediante tarjetas perforadas al estilo Jacquard.',
      'Capaz de realizar ramas condicionales y bucles mediante tarjetas.',
    ],
    artifacts: ['tarjetas-perforadas-jacquard', 'plano-analytical-engine'],
    sources: [
      {
        title: 'Babbage, Pasajes de la vida de un filósofo (1864)',
        type: 'book',
      },
    ],
  },
  {
    id: 'difference-engine',
    name: 'Máquina Diferencial',
    year: 1822,
    creator: 'Charles Babbage',
    era: 'pre-code',
    type: 'máquina de cálculo mecánica',
    description:
      'La Máquina Diferencial era una calculadora mecánica diseñada para tabular funciones polinómicas mediante el método de diferencias finitas.',
    technicalNotes: [
      'Usada para generar tablas matemáticas sin errores humanos.',
      'Voluminosa y de precisión mecánica extrema.',
      'Anticipó la idea de eliminar el error humano en el cálculo.',
    ],
    artifacts: ['maquina-diferencial-pieza', 'planos-diferencia'],
    sources: [
      {
        title: 'Science Museum, Difference Engine',
        type: 'archive',
      },
    ],
  },
  {
    id: 'z3-machine',
    name: 'Z3',
    year: 1941,
    creator: 'Konrad Zuse',
    era: 'machines',
    type: 'computadora electromecánica programable',
    description:
      'La Z3 fue la primera computadora digital programable y funcional. Utilizaba relés electromecánicos y estaba completamente automática.',
    technicalNotes: [
      'Basada en relés electromecánicos (aproximadamente 2,000).',
      'Programable mediante cinta perforada.',
      'Realizaba aritmética de punto flotante binario.',
      'Destruida en 1943 durante un bombardeo en Berlín; reconstruida posteriormente.',
    ],
    artifacts: ['z3-replica'],
    sources: [
      {
        title: 'Deutsches Museum, Z3',
        type: 'archive',
      },
    ],
  },
  {
    id: 'eniac-machine',
    name: 'ENIAC',
    year: 1945,
    creator: 'J. Presper Eckert y John Mauchly',
    era: 'computers',
    type: 'computadora electrónica de propósito general',
    description:
      'El ENIAC (Electronic Numerical Integrator and Computer) fue uno de los primeros computadores electrónicos de propósito general, usando tubos de vacío.',
    technicalNotes: [
      'Más de 17,000 tubos de vacío.',
      'Programación por cableado, interruptores y tableros.',
      'Realizaba miles de cálculos por segundo, una velocidad sin precedentes.',
      'Ocupaba una sala completa y consumía enormes cantidades de energía.',
    ],
    artifacts: ['foto-eniac'],
    sources: [
      {
        title: 'Computer History Museum, ENIAC',
        type: 'archive',
      },
    ],
  },
  {
    id: 'univac-machine',
    name: 'UNIVAC I',
    year: 1951,
    creator: 'Eckert y Mauchly (UNIVAC Division)',
    era: 'computers',
    type: 'computadora comercial electrónica',
    description:
      'El UNIVAC I fue el primer computador comercial fabricado en serie en Estados Unidos, popularizando la computación empresarial.',
    technicalNotes: [
      'Se entregó a la Oficina del Censo de EE. UU. en 1951.',
      'Usaba cinta magnética para almacenamiento.',
      'Famoso por predecir correctamente las elecciones presidenciales de 1952.',
      'Incluía programación mediante lenguaje UNIVAC (ensamblador).',
    ],
    artifacts: ['foto-univac'],
    sources: [
      {
        title: 'Computer History Museum, UNIVAC',
        type: 'archive',
      },
    ],
  },
  {
    id: 'colossus-machine',
    name: 'Colossus Mark I',
    year: 1943,
    creator: 'Tommy Flowers y equipo de Bletchley Park',
    era: 'machines',
    type: 'computador electrónico programable para criptoanálisis',
    description:
      'Considerado el primer computador electrónico programable del mundo, diseñado secretamente en Bletchley Park para romper los mensajes de teletipo cifrados de la máquina alemana Lorenz SZ40/42.',
    technicalNotes: [
      'Utilizaba 1,500 tubos de vacío en su versión Mark I (2,400 en Mark II).',
      'Leía cinta de papel perforado a la asombrosa velocidad de 5,000 caracteres por segundo.',
      'Redujo el tiempo de descifrado de semanas a horas.',
      'Permaneció en secreto militar absoluto hasta la década de 1970.',
    ],
    artifacts: ['foto-colossus'],
    sources: [
      {
        title: 'The National Museum of Computing, Bletchley Park, Colossus',
        type: 'archive',
      },
    ],
  },
  {
    id: 'pdp-11-machine',
    name: 'DEC PDP-11',
    year: 1970,
    creator: 'Digital Equipment Corporation (DEC)',
    era: 'systems',
    type: 'minicomputador de 16 bits',
    description:
      'El minicomputador más influyente de la historia. En él, Dennis Ritchie y Ken Thompson desarrollaron el sistema operativo Unix y crearon el lenguaje de programación C.',
    technicalNotes: [
      'Introdujo el bus unificado UNIBUS para conectar CPU, memoria y periféricos.',
      'Conjunto de instrucciones ortogonal que influyó profundamente en microprocesadores como x86 y 68000.',
      'Democratizó la computación en departamentos universitarios y laboratorios de investigación.',
    ],
    artifacts: ['pdp-11-panel'],
    sources: [
      {
        title: 'Bell System Technical Journal, The UNIX Time-Sharing System (1978)',
        type: 'paper',
      },
    ],
  },
  {
    id: 'xerox-alto-machine',
    name: 'Xerox Alto',
    year: 1973,
    creator: 'Xerox PARC (Chuck Thacker, Butler Lampson, Alan Kay y equipo)',
    era: 'oop',
    type: 'estación de trabajo personal con interfaz gráfica',
    description:
      'La primera computadora diseñada para una sola persona que integraba pantalla de mapa de bits, ratón de tres botones, teclado, ventanas superpuestas, red Ethernet y el entorno Smalltalk.',
    technicalNotes: [
      'Pantalla vertical monocromática de 606x808 píxeles simulando una hoja de papel.',
      'Conexión en red local Ethernet a 3 Mbps inventada por Robert Metcalfe.',
      'Inspiró directamente la creación del Apple Macintosh y Microsoft Windows.',
    ],
    artifacts: ['xerox-alto-gui'],
    sources: [
      {
        title: 'Thacker et al., Alto: A Personal Computer (1979)',
        type: 'paper',
      },
    ],
  },
  {
    id: 'ibm-pc-machine',
    name: 'IBM Personal Computer (Model 5150)',
    year: 1981,
    creator: 'IBM Entry Systems Division (liderado por Don Estridge)',
    era: 'modern',
    type: 'computadora personal de arquitectura abierta',
    description:
      'El equipo que legitimó la computación personal en la industria global. Al adoptar una arquitectura abierta con componentes estándar (procesador Intel 8088 y sistema operativo MS-DOS de Microsoft), desató la revolución del software de consumo.',
    technicalNotes: [
      'Procesador Intel 8088 a 4.77 MHz con bus de 8 bits.',
      '16 KB a 256 KB de memoria RAM.',
      'Creó el ecosistema de clones y el estándar de facto de la industria de la PC.',
    ],
    artifacts: ['ibm-pc-5150'],
    sources: [
      {
        title: 'IBM Archives, The Birth of the IBM PC',
        type: 'archive',
      },
    ],
  },
  {
    id: 'nvidia-tensor-hardware',
    name: 'Supercomputadores Tensoriales (DGX / H100)',
    year: 2022,
    creator: 'NVIDIA',
    era: 'ai',
    type: 'acelerador de cálculo matricial y tensorial para IA',
    description:
      'El hardware que alimenta la era de los grandes modelos de lenguaje y la IA generativa. Transforma el paradigma de ejecución secuencial en millones de operaciones matriciales simultáneas.',
    technicalNotes: [
      'Arquitectura de precisión mixta (FP8/FP16) para entrenamiento y cálculo de atención en Transformers.',
      'Interconexión NVLink de 900 GB/s para formar superclusters de cómputo masivo.',
      'El nuevo sustrato material sobre el que se sintetizan las redes neuronales modernas.',
    ],
    artifacts: ['nvidia-h100-tensor'],
    sources: [
      {
        title: 'NVIDIA Architecture Whitepaper: Hopper Architecture and Transformer Engine (2022)',
        type: 'paper',
      },
    ],
  },
];

export const getMachine = (id: string) => machines.find((m) => m.id === id);