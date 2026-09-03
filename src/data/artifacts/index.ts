import type { ArtifactEntry } from '../types';

export const artifacts: ArtifactEntry[] = [
  {
    id: 'tarjetas-perforadas-jacquard',
    name: 'Tarjetas perforadas',
    year: 1801,
    era: 'pre-code',
    type: 'punch-card',
    description:
      'Tarjetas de cartón perforadas con patrones que controlaban los telares de Jacquard, y posteriormente las primeras máquinas de tabulación.',
    context:
      'El sistema de tarjetas perforadas de Jacquard inspiró a Babbage y a toda una era de entrada y programación de datos. Fueron el principal medio de entrada de datos hasta la década de 1970.',
    related: ['jacquard-loom', 'analytical-engine'],
    sources: [
      {
        title: 'Computer History Museum, Punch Cards',
        type: 'archive',
      },
    ],
  },
  {
    id: 'plano-analytical-engine',
    name: 'Plano de la Máquina Analítica',
    era: 'pre-code',
    type: 'diagram',
    description:
      'Dibujos técnicos y planos de la arquitectura de la Máquina Analítica de Babbage, incluyendo el "mill" y el "store".',
    context:
      'Constituyen uno de los documentos más importantes de la historia de la computación mecánica, reflejando la primera arquitectura de computadora programable.',
    related: ['analytical-engine', 'charles-babbage'],
    sources: [
      {
        title: 'Science Museum, Babbage archive',
        type: 'archive',
      },
    ],
  },
  {
    id: 'foto-eniac',
    name: 'Fotografía histórica del ENIAC',
    year: 1945,
    era: 'computers',
    type: 'photograph',
    description:
      'Imagen del ENIAC, la enorme computadora electrónica ocupando una sala completa con paneles de tubos de vacío.',
    context:
      'El ENIAC representó un salto sin precedentes en la velocidad de cálculo y marcó el inicio de la era de las computadoras electrónicas.',
    related: ['eniac-machine'],
    sources: [
      {
        title: 'U.S. Army / University of Pennsylvania Archive',
        type: 'archive',
      },
    ],
  },
  {
    id: 'foto-univac',
    name: 'UNIVAC I',
    year: 1951,
    era: 'computers',
    type: 'photograph',
    description:
      'Imagen del UNIVAC I, el primer computador comercial, con sus unidades de cinta magnética.',
    context:
      'El UNIVAC I inició la industria de la computación comercial y popularizó la idea de que las empresas podían usar computadoras.',
    related: ['univac-machine', 'grace-hopper'],
    sources: [
      {
        title: 'Computer History Museum, UNIVAC',
        type: 'archive',
      },
    ],
  },
  {
    id: 'the-c-programming-language-book',
    name: 'El lenguaje de programación C (K&R)',
    year: 1978,
    era: 'systems',
    type: 'manual',
    description:
      'El libro de Kernighan y Ritchie ("K&R") que definió y popularizó el lenguaje C.',
    context:
      'K&R es uno de los manuales de programación más influyentes de la historia, y su estilo conciso se volvió un modelo para la documentación técnica.',
    related: ['c-language', 'dennis-ritchie'],
    sources: [
      {
        title: 'Kernighan y Ritchie, El lenguaje de programación C (1978)',
        type: 'book',
      },
    ],
  },
  {
    id: 'ryb-gopher',
    name: 'La mascota Go Gopher',
    year: 2009,
    era: 'modern',
    type: 'diagram',
    description:
      'La mascota del lenguaje Go, un pequeño roedor diseñado por Renee French, se ha convertido en un icono de la comunidad.',
    context:
      'El Go Gopher refleja el espíritu amigable y pragmático del lenguaje creado en Google.',
    related: ['go-language'],
    sources: [
      {
        title: 'The Go project, golang.org',
        type: 'web',
        url: 'https://go.dev/',
      },
    ],
  },
];

export const getArtifact = (id: string) => artifacts.find((a) => a.id === id);