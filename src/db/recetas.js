const recetas = [
  {
    orden: 1553510,
    fechaDeCarga: '2015-05-03',
    integrante: 'Kyle Crane',
    medicamento: 'Antizina',
    cantidad: 1,
    presentacion: 'Inyectable',
    observaciones: 'Usar solo en crisis'
  },
  {
    orden: 1556506,
    fechaDeCarga: '2023-12-27',
    integrante: 'Lionel Messi',
    medicamento: 'Paracetamol',
    cantidad: 6,
    presentacion: 'Comprimido',
    observaciones: ''
  },
  {
    orden: 1556507,
    fechaDeCarga: '2024-01-15',
    integrante: 'Papá Noel',
    medicamento: 'Ibuprofeno',
    cantidad: 12,
    presentacion: 'Cápsulas',
    observaciones: 'Tomar con comida'
  },
  {
    orden: 1556508,
    fechaDeCarga: '2025-03-03',
    integrante: 'Samuel de Luque',
    medicamento: 'Paracetamol',
    cantidad: 3,
    presentacion: 'Comprimido',
    observaciones: ''
  },
  {
    orden: 1556509,
    fechaDeCarga: '2025-05-28',
    integrante: 'Pepe Argento',
    medicamento: 'Ibuprofeno',
    cantidad: 24,
    presentacion: 'Cápsulas',
    observaciones: ''
  },
  {
    orden: 1556510,
    fechaDeCarga: '2025-05-30',
    integrante: 'Pepe Argento',
    medicamento: 'Amoxicilina',
    cantidad: 10,
    presentacion: 'Jarabe',
    observaciones: 'Agitar antes de usar'
  },
  {
    orden: 1556511,
    fechaDeCarga: '2025-07-05',
    integrante: 'Homero Simpson',
    medicamento: 'Omeprazol',
    cantidad: 20,
    presentacion: 'Cápsulas',
    observaciones: ''
  },
  {
    orden: 1556512,
    fechaDeCarga: '2025-07-07',
    integrante: 'Homero Simpson',
    medicamento: 'Diclofenac',
    cantidad: 15,
    presentacion: 'Comprimido',
    observaciones: 'No tomar con alcohol'
  },
  {
    orden: 1556513,
    fechaDeCarga: '2025-07-10',
    integrante: 'Lionel Messi',
    medicamento: 'Ibuprofeno',
    cantidad: 8,
    presentacion: 'Cápsulas',
    observaciones: 'Tomar cada 8 horas'
  },
  {
    orden: 1556514,
    fechaDeCarga: '2025-07-12',
    integrante: 'Pepe Argento',
    medicamento: 'Paracetamol',
    cantidad: 6,
    presentacion: 'Comprimido',
    observaciones: ''
  },
  {
    orden: 1556515,
    fechaDeCarga: '2025-07-15',
    integrante: 'Samuel de Luque',
    medicamento: 'Loratadina',
    cantidad: 10,
    presentacion: 'Comprimido',
    observaciones: 'Evitar exposición solar'
  },
  {
    orden: 1556516,
    fechaDeCarga: '2025-07-18',
    integrante: 'Tony Stark',
    medicamento: 'Vitamina C',
    cantidad: 30,
    presentacion: 'Tabletas masticables',
    observaciones: ''
  },
  {
    orden: 1556518,
    fechaDeCarga: '2025-07-20',
    integrante: 'Lionel Messi',
    medicamento: 'Ibuprofeno',
    cantidad: 10,
    presentacion: 'Cápsulas',
    observaciones: ''
  },
  {
    orden: 1556519,
    fechaDeCarga: '2025-07-23',
    integrante: 'Lionel Messi',
    medicamento: 'Amoxicilina',
    cantidad: 5,
    presentacion: 'Jarabe',
    observaciones: ''
  },
  {
    orden: 1556520,
    fechaDeCarga: '2025-08-01',
    integrante: 'Lionel Messi',
    medicamento: 'Diclofenac',
    cantidad: 8,
    presentacion: 'Comprimido',
    observaciones: ''
  },
  {
    orden: 1556521,
    fechaDeCarga: '2025-08-05',
    integrante: 'Lionel Messi',
    medicamento: 'Omeprazol',
    cantidad: 12,
    presentacion: 'Cápsulas',
    observaciones: ''
  },
  {
    orden: 1556522,
    fechaDeCarga: '2025-08-10',
    integrante: 'Lionel Messi',
    medicamento: 'Vitamina C',
    cantidad: 20,
    presentacion: 'Tabletas masticables',
    observaciones: ''
  },
  {
    orden: 1556523,
    fechaDeCarga: '2025-08-12',
    integrante: 'Pepe Argento',
    medicamento: 'Ibuprofeno',
    cantidad: 6,
    presentacion: 'Cápsulas',
    observaciones: ''
  },
  {
    orden: 1556524,
    fechaDeCarga: '2025-08-15',
    integrante: 'Samuel de Luque',
    medicamento: 'Amoxicilina',
    cantidad: 4,
    presentacion: 'Jarabe',
    observaciones: ''
  },
  {
    orden: 1556525,
    fechaDeCarga: '2025-08-15',
    integrante: 'Homero Simpson',
    medicamento: 'Omeprazol',
    cantidad: 10,
    presentacion: 'Cápsulas',
    observaciones: ''
  },
  {
    orden: 1556526,
    fechaDeCarga: '2025-08-20',
    integrante: 'Samuel de Luque',
    medicamento: 'Paracetamol',
    cantidad: 5,
    presentacion: 'Comprimido',
    observaciones: ''
  },
  {
    orden: 1556527,
    fechaDeCarga: '2025-08-22',
    integrante: 'Lionel Messi',
    medicamento: 'Ibuprofeno',
    cantidad: 6,
    presentacion: 'Cápsulas',
    observaciones: ''
  },
  {
    orden: 1556528,
    fechaDeCarga: '2025-08-24',
    integrante: 'Lionel Messi',
    medicamento: 'Amoxicilina',
    cantidad: 7,
    presentacion: 'Jarabe',
    observaciones: ''
  },
  {
    orden: 1556529,
    fechaDeCarga: '2025-08-28',
    integrante: 'Pepe Argento',
    medicamento: 'Diclofenac',
    cantidad: 9,
    presentacion: 'Comprimido',
    observaciones: ''
  },
  {
    orden: 1556530,
    fechaDeCarga: '2025-08-30',
    integrante: 'Pepe Argento',
    medicamento: 'Loratadina',
    cantidad: 6,
    presentacion: 'Comprimido',
    observaciones: ''
  },
  {
    orden: 1556531,
    fechaDeCarga: '2025-09-04',
    integrante: 'Pepe Argento',
    medicamento: 'Insulina',
    cantidad: 1,
    presentacion: 'Inyectable',
    observaciones: ''
  },
  {
    orden: 1556532,
    fechaDeCarga: '2025-09-15',
    integrante: 'Papá Noel',
    medicamento: 'Vitamina C',
    cantidad: 15,
    presentacion: 'Tabletas masticables',
    observaciones: ''
  },
  {
    orden: 1556533,
    fechaDeCarga: '2025-09-25',
    integrante: 'Papá Noel',
    medicamento: 'Omeprazol',
    cantidad: 10,
    presentacion: 'Cápsulas',
    observaciones: ''
  },
  {
    orden: 1556534,
    fechaDeCarga: '2025-10-04',
    integrante: 'Pepe Argento',
    medicamento: 'Amoxicilina',
    cantidad: 5,
    presentacion: 'Jarabe',
    observaciones: ''
  },
  {
    orden: 1556535,
    fechaDeCarga: '2025-10-04',
    integrante: 'Pepe Argento',
    medicamento: 'Paracetamol',
    cantidad: 10,
    presentacion: 'Comprimido',
    observaciones: ''
  }
];

export default recetas;