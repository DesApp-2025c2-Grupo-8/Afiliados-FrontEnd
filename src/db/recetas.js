const recetas = [
  {
    orden: 1556506,
    fechaDeCarga: '27/12/2024',
    integrante: 'Lionel Messi',
    medicamento: 'Paracetamol',
    cantidad: 6,
    presentacion: 'Comprimido',
    observaciones: ''
  },
  {
    orden: 1556507,
    fechaDeCarga: '15/01/2025',
    integrante: 'Papá Noel',
    medicamento: 'Ibuprofeno',
    cantidad: 12,
    presentacion: 'Cápsulas',
    observaciones: 'Tomar con comida'
  },
  {
    orden: 1556508,
    fechaDeCarga: '03/05/2025',
    integrante: 'Samuel de Luque',
    medicamento: 'Paracetamol',
    cantidad: 3,
    presentacion: 'Comprimido',
    observaciones: ''
  },
  {
    orden: 1556509,
    fechaDeCarga: '28/09/2025',
    integrante: 'Pepe Argento',
    medicamento: 'Ibuprofeno',
    cantidad: 24,
    presentacion: 'Cápsulas',
    observaciones: ''
  },
  {
    orden: 1556510,
    fechaDeCarga: '02/10/2025',
    integrante: 'Pepe Argento',
    medicamento: 'Amoxicilina',
    cantidad: 10,
    presentacion: 'Jarabe',
    observaciones: 'Agitar antes de usar'
  },
  {
    orden: 1556511,
    fechaDeCarga: '05/10/2025',
    integrante: 'Homero Simpson',
    medicamento: 'Omeprazol',
    cantidad: 20,
    presentacion: 'Cápsulas',
    observaciones: ''
  },
  {
    orden: 1556512,
    fechaDeCarga: '07/10/2025',
    integrante: 'Homero Simpson',
    medicamento: 'Diclofenac',
    cantidad: 15,
    presentacion: 'Comprimido',
    observaciones: 'No tomar con alcohol'
  },
  {
    orden: 1556513,
    fechaDeCarga: '10/10/2025',
    integrante: 'Lionel Messi',
    medicamento: 'Ibuprofeno',
    cantidad: 8,
    presentacion: 'Cápsulas',
    observaciones: 'Tomar cada 8 horas'
  },
  {
    orden: 1556514,
    fechaDeCarga: '12/10/2025',
    integrante: 'Pepe Argento',
    medicamento: 'Paracetamol',
    cantidad: 6,
    presentacion: 'Comprimido',
    observaciones: ''
  },
  {
    orden: 1556515,
    fechaDeCarga: '15/10/2025',
    integrante: 'Samuel de Luque',
    medicamento: 'Loratadina',
    cantidad: 10,
    presentacion: 'Comprimido',
    observaciones: 'Evitar exposición solar'
  },
  {
    orden: 1556516,
    fechaDeCarga: '18/10/2025',
    integrante: 'Tony Stark',
    medicamento: 'Vitamina C',
    cantidad: 30,
    presentacion: 'Tabletas masticables',
    observaciones: ''
  },
  {
    orden: 1556517,
    fechaDeCarga: '20/10/2025',
    integrante: 'Kyle Crane',
    medicamento: 'Antizina',
    cantidad: 1,
    presentacion: 'Inyectable',
    observaciones: 'Usar solo en crisis'
  },
  {
    orden: 1556518,
    fechaDeCarga: '22/10/2025',
    integrante: 'Lionel Messi',
    medicamento: 'Ibuprofeno',
    cantidad: 10,
    presentacion: 'Cápsulas',
    observaciones: ''
  },
  {
    orden: 1556519,
    fechaDeCarga: '23/10/2025',
    integrante: 'Lionel Messi',
    medicamento: 'Amoxicilina',
    cantidad: 5,
    presentacion: 'Jarabe',
    observaciones: ''
  },
  {
    orden: 1556520,
    fechaDeCarga: '24/10/2025',
    integrante: 'Lionel Messi',
    medicamento: 'Diclofenac',
    cantidad: 8,
    presentacion: 'Comprimido',
    observaciones: ''
  },
  {
    orden: 1556521,
    fechaDeCarga: '25/10/2025',
    integrante: 'Lionel Messi',
    medicamento: 'Omeprazol',
    cantidad: 12,
    presentacion: 'Cápsulas',
    observaciones: ''
  },
  {
    orden: 1556522,
    fechaDeCarga: '26/10/2025',
    integrante: 'Lionel Messi',
    medicamento: 'Vitamina C',
    cantidad: 20,
    presentacion: 'Tabletas masticables',
    observaciones: ''
  },
  {
    orden: 1556523,
    fechaDeCarga: '27/10/2025',
    integrante: 'Pepe Argento',
    medicamento: 'Ibuprofeno',
    cantidad: 6,
    presentacion: 'Cápsulas',
    observaciones: ''
  },
  {
    orden: 1556524,
    fechaDeCarga: '28/10/2025',
    integrante: 'Samuel de Luque',
    medicamento: 'Amoxicilina',
    cantidad: 4,
    presentacion: 'Jarabe',
    observaciones: ''
  },
  {
    orden: 1556525,
    fechaDeCarga: '29/10/2025',
    integrante: 'Homero Simpson',
    medicamento: 'Omeprazol',
    cantidad: 10,
    presentacion: 'Cápsulas',
    observaciones: ''
  },
  {
    orden: 1556526,
    fechaDeCarga: '30/10/2025',
    integrante: 'Samuel de Luque',
    medicamento: 'Paracetamol',
    cantidad: 5,
    presentacion: 'Comprimido',
    observaciones: ''
  },
  {
    orden: 1556527,
    fechaDeCarga: '31/10/2025',
    integrante: 'Lionel Messi',
    medicamento: 'Ibuprofeno',
    cantidad: 6,
    presentacion: 'Cápsulas',
    observaciones: ''
  },
  {
    orden: 1556528,
    fechaDeCarga: '01/11/2025',
    integrante: 'Lionel Messi',
    medicamento: 'Amoxicilina',
    cantidad: 7,
    presentacion: 'Jarabe',
    observaciones: ''
  },
  {
    orden: 1556529,
    fechaDeCarga: '02/11/2025',
    integrante: 'Pepe Argento',
    medicamento: 'Diclofenac',
    cantidad: 9,
    presentacion: 'Comprimido',
    observaciones: ''
  },
  {
    orden: 1556530,
    fechaDeCarga: '03/11/2025',
    integrante: 'Pepe Argento',
    medicamento: 'Loratadina',
    cantidad: 6,
    presentacion: 'Comprimido',
    observaciones: ''
  },
  {
    orden: 1556531,
    fechaDeCarga: '04/11/2025',
    integrante: 'Pepe Argento',
    medicamento: 'Antizina',
    cantidad: 1,
    presentacion: 'Inyectable',
    observaciones: 'Solo en caso extremo'
  },
  {
    orden: 1556532,
    fechaDeCarga: '05/11/2025',
    integrante: 'Papá Noel',
    medicamento: 'Vitamina C',
    cantidad: 15,
    presentacion: 'Tabletas masticables',
    observaciones: ''
  },
  {
    orden: 1556533,
    fechaDeCarga: '06/11/2025',
    integrante: 'Papá Noel',
    medicamento: 'Omeprazol',
    cantidad: 10,
    presentacion: 'Cápsulas',
    observaciones: ''
  },
  {
    orden: 1556534,
    fechaDeCarga: '07/11/2025',
    integrante: 'Pepe Argento',
    medicamento: 'Amoxicilina',
    cantidad: 5,
    presentacion: 'Jarabe',
    observaciones: ''
  },
  {
    orden: 1556535,
    fechaDeCarga: '08/11/2025',
    integrante: 'Pepe Argento',
    medicamento: 'Paracetamol',
    cantidad: 10,
    presentacion: 'Comprimido',
    observaciones: ''
  }
];

export default recetas;