import type { TimelineEvent } from '../types';

export const events: TimelineEvent[] = [
  {
    id: 'bernoulli-algorithm',
    year: 1843,
    title: 'El algoritmo de los números de Bernoulli',
    description:
      'Ada Lovelace describió el primer algoritmo destinado a una máquina: el cálculo de los números de Bernoulli mediante la Máquina Analítica.',
    era: 'pre-code',
    category: 'algorithm',
    related: ['ada-lovelace', 'analytical-engine'],
    sources: [
      {
        title: 'Notas de Ada Lovelace sobre la Máquina Analítica (1843)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'first-compiler',
    year: 1952,
    title: 'El primer compilador (A-0)',
    description:
      'Grace Hopper y su equipo desarrollaron el compilador A-0, que traducía un lenguaje simbólico a código ejecutable por la máquina.',
    era: 'first-languages',
    category: 'concept',
    related: ['grace-hopper', 'flow-matic-language', 'cobol-language'],
    sources: [
      {
        title: 'Hopper, La educación de una computadora (1952)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'dartmouth-ai-workshop',
    year: 1956,
    title: 'El taller de Dartmouth y el nacimiento de la IA',
    description:
      'John McCarthy acuñó el término "inteligencia artificial" durante el taller de verano de Dartmouth, fundando la IA como campo de estudio.',
    era: 'first-languages',
    category: 'ai',
    related: ['john-mccarthy', 'ai-history'],
    sources: [
      {
        title: 'McCarthy et al., Una propuesta para el Proyecto de Investigación de Verano de Dartmouth (1955)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'apollo-guidance',
    year: 1969,
    title: 'El software del Apolo',
    description:
      'La computadora de guiado del Apolo (AGC) demostró la fiabilidad del software de tiempo real en la llegada a la Luna, con un sistema operativo y de navegación crítico.',
    era: 'systems',
    category: 'system',
    related: ['unix-system'],
    sources: [
      {
        title: 'MIT Instrumentation Laboratory, Computadora de guiado del Apolo',
        type: 'archive',
      },
    ],
  },
  {
    id: 'internet-birth',
    year: 1969,
    title: 'ARPANET y el nacimiento de Internet',
    description:
      'En 1969 se conectó ARPANET, la primera red de computadoras, precursora de Internet.',
    era: 'internet',
    category: 'internet',
    related: ['internet-history', 'web-history'],
    sources: [
      {
        title: 'Computer History Museum, Internet History',
        type: 'archive',
      },
    ],
  },
  {
    id: 'email',
    year: 1971,
    title: 'El correo electrónico',
    description:
      'Ray Tomlinson envió el primer correo electrónico en 1971, eligiendo el símbolo "@" para separar usuario y máquina.',
    era: 'internet',
    category: 'internet',
    related: ['internet-history'],
    sources: [
      {
        title: 'Computer History Museum, Email History',
        type: 'archive',
      },
    ],
  },
  {
    id: 'world-wide-web',
    year: 1989,
    title: 'La World Wide Web',
    description:
      'Tim Berners-Lee propuso la World Wide Web en el CERN, un sistema de hipertexto distribuido que cambiaría el mundo.',
    era: 'web',
    category: 'web',
    related: ['web-history', 'tim-berners-lee'],
    sources: [
      {
        title: 'Berners-Lee, Gestión de la información: una propuesta (1989)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'open-ai-era',
    year: 2015,
    title: 'El auge de la IA pública y Transformers',
    description:
      'La aparición de la arquitectura Transformer (2017) y los modelos de lenguaje transformó la relación entre humanos y software: el código ahora también se sintetiza con lenguaje natural.',
    era: 'ai',
    category: 'ai',
    related: ['ai-history', 'code-assist-ai'],
    sources: [
      {
        title: 'Vaswani et al., Attention Is All You Need (2017)',
        type: 'paper',
      },
    ],
  },
  {
    id: 'turing-computable-numbers',
    year: 1936,
    title: 'La Máquina Universal de Turing',
    description:
      'Alan Turing publica "On Computable Numbers", introduciendo la máquina de Turing: la demostración matemática de que un dispositivo universal puede ejecutar cualquier algoritmo computable.',
    era: 'machines',
    category: 'algorithm',
    related: ['alan-turing', 'machines'],
    sources: [
      {
        title: 'Turing, On Computable Numbers, with an Application to the Entscheidungsproblem (1936)',
        type: 'paper',
      },
    ],
  },
  {
    id: 'first-computer-bug',
    year: 1947,
    title: 'El primer "bug" físico registrado',
    description:
      'Grace Hopper y los operadores del Harvard Mark II encontraron una polilla real atrapada en el relé #70, pegándola en la bitácora con la nota: "Primer caso real de bicho (bug) encontrado".',
    era: 'computers',
    category: 'computer',
    related: ['grace-hopper', 'computers'],
    sources: [
      {
        title: 'Smithsonian National Museum of American History, Log Book with Computer Bug',
        type: 'archive',
      },
    ],
  },
  {
    id: 'smalltalk-parc',
    year: 1972,
    title: 'Nacimiento de Smalltalk y la OOP',
    description:
      'En Xerox PARC, Alan Kay, Dan Ingalls y Adele Goldberg crean Smalltalk, materializando la programación orientada a objetos: todo es un objeto que se comunica mediante mensajes.',
    era: 'oop',
    category: 'language',
    related: ['alan-kay', 'adele-goldberg', 'smalltalk-language'],
    sources: [
      {
        title: 'Kay, The Early History of Smalltalk (1993)',
        type: 'paper',
      },
    ],
  },
  {
    id: 'macintosh-launch',
    year: 1984,
    title: 'Lanzamiento del Apple Macintosh',
    description:
      'La primera computadora comercial masiva con interfaz gráfica de usuario, ventanas, ratón y tipografía proporcional, llevando las ideas de Xerox PARC al gran público.',
    era: 'oop',
    category: 'system',
    related: ['xerox-alto', 'oop'],
    sources: [
      {
        title: 'Levy, Insanely Great: The Life and Times of Macintosh (1994)',
        type: 'book',
      },
    ],
  },
  {
    id: 'linux-announcement',
    year: 1991,
    title: 'Anuncio del Kernel Linux',
    description:
      'Linus Torvalds publica en comp.os.minix: "Estoy haciendo un sistema operativo libre (solo un pasatiempo, no será grande ni profesional como GNU)". Se convirtió en el cimiento de la infraestructura global.',
    era: 'systems',
    category: 'system',
    related: ['linus-torvalds', 'c-language', 'unix-system'],
    sources: [
      {
        title: 'Torvalds, Mensaje original en comp.os.minix (25 de agosto de 1991)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'java-launch',
    year: 1995,
    title: 'Lanzamiento de Java: Write Once, Run Anywhere',
    description:
      'Sun Microsystems presenta Java con su máquina virtual (JVM), prometiendo portabilidad absoluta de código entre cualquier arquitectura de hardware y sistema operativo.',
    era: 'modern',
    category: 'language',
    related: ['java-language', 'james-gosling'],
    sources: [
      {
        title: 'Sun Microsystems, The Java Language: A White Paper (1995)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'mosaic-browser',
    year: 1993,
    title: 'NCSA Mosaic: El navegador que desató la Web',
    description:
      'Marc Andreessen y Eric Bina crean Mosaic, integrando imágenes junto al texto en la misma página web y desatando la explosión masiva de internet.',
    era: 'web',
    category: 'web',
    related: ['world-wide-web', 'javascript-language'],
    sources: [
      {
        title: 'National Center for Supercomputing Applications (NCSA), Mosaic Archives',
        type: 'archive',
      },
    ],
  },
  {
    id: 'alphago-victory',
    year: 2016,
    title: 'AlphaGo vence al campeón mundial de Go',
    description:
      'El sistema de DeepMind derrota a Lee Sedol 4-1 utilizando redes neuronales profundas y aprendizaje por refuerzo, superando un juego cuya complejidad superaba el número de átomos del universo observable.',
    era: 'ai',
    category: 'ai',
    related: ['demis-hassabis', 'geoffrey-hinton'],
    sources: [
      {
        title: 'Silver et al., Mastering the game of Go with deep neural networks and tree search (Nature, 2016)',
        type: 'paper',
      },
    ],
  },
  {
    id: 'quantum-supremacy',
    year: 2019,
    title: 'Demostración de Supremacía Cuántica',
    description:
      'El procesador cuántico Sycamore de 53 qubits ejecuta en 200 segundos un cálculo que le tomaría 10,000 años al supercomputador clásico más potente del mundo, abriendo una nueva frontera del código.',
    era: 'future',
    category: 'concept',
    related: ['future-computing'],
    sources: [
      {
        title: 'Arute et al., Quantum supremacy using a programmable superconducting processor (Nature, 2019)',
        type: 'paper',
      },
    ],
  },
];

export const getEvent = (id: string) => events.find((e) => e.id === id);