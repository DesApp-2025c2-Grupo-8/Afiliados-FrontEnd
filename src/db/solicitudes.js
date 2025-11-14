const solicitudes = [
  // ----- ÚLTIMOS 7 DÍAS (2025-11-07 a 2025-11-13) -----
  { tipo: "reintegro", estado: "aceptada", fecha: "2025-11-13" },
  { tipo: "reintegro", estado: "aceptada", fecha: "2025-11-10" },
  { tipo: "reintegro", estado: "aceptada", fecha: "2025-11-09" },
  { tipo: "reintegro", estado: "observacion", fecha: "2025-11-08" },

  { tipo: "autorizacion", estado: "pendiente", fecha: "2025-11-13" },
  { tipo: "autorizacion", estado: "pendiente", fecha: "2025-11-12" },
  { tipo: "autorizacion", estado: "aceptada", fecha: "2025-11-10" },
  { tipo: "autorizacion", estado: "observacion", fecha: "2025-11-09" },
  { tipo: "autorizacion", estado: "observacion", fecha: "2025-11-08" },

  { tipo: "receta", estado: "pendiente", fecha: "2025-11-13" },
  { tipo: "receta", estado: "pendiente", fecha: "2025-11-12" },
  { tipo: "receta", estado: "aceptada", fecha: "2025-11-10" },
  { tipo: "receta", estado: "rechazada", fecha: "2025-11-08" },

  // ----- ÚLTIMO MES (2025-10-13 a 2025-11-06) -----
  { tipo: "reintegro", estado: "pendiente", fecha: "2025-11-05" },
  { tipo: "reintegro", estado: "aceptada", fecha: "2025-11-01" },
  { tipo: "reintegro", estado: "aceptada", fecha: "2025-10-28" },
  { tipo: "reintegro", estado: "rechazada", fecha: "2025-10-22" },
  { tipo: "reintegro", estado: "observacion", fecha: "2025-10-15" },

  { tipo: "autorizacion", estado: "pendiente", fecha: "2025-11-04" },
  { tipo: "autorizacion", estado: "aceptada", fecha: "2025-11-01" },
  { tipo: "autorizacion", estado: "rechazada", fecha: "2025-10-27" },
  { tipo: "autorizacion", estado: "rechazada", fecha: "2025-10-25" },
  { tipo: "autorizacion", estado: "observacion", fecha: "2025-10-14" },

  { tipo: "receta", estado: "pendiente", fecha: "2025-11-03" },
  { tipo: "receta", estado: "pendiente", fecha: "2025-10-31" },
  { tipo: "receta", estado: "aceptada", fecha: "2025-10-26" },
  { tipo: "receta", estado: "rechazada", fecha: "2025-10-21" },
  { tipo: "receta", estado: "observacion", fecha: "2025-10-14" },

  // ----- ÚLTIMO AÑO (2024-11-13 a 2025-10-12) -----
  { tipo: "reintegro", estado: "pendiente", fecha: "2025-09-20" },
  { tipo: "reintegro", estado: "pendiente", fecha: "2025-08-10" },
  { tipo: "reintegro", estado: "aceptada", fecha: "2025-06-01" },
  { tipo: "reintegro", estado: "rechazada", fecha: "2025-04-12" },
  { tipo: "reintegro", estado: "observacion", fecha: "2025-02-18" },

  { tipo: "autorizacion", estado: "pendiente", fecha: "2025-07-22" },
  { tipo: "autorizacion", estado: "aceptada", fecha: "2025-05-10" },
  { tipo: "autorizacion", estado: "aceptada", fecha: "2025-04-01" },
  { tipo: "autorizacion", estado: "aceptada", fecha: "2025-03-15" },
  { tipo: "autorizacion", estado: "aceptada", fecha: "2025-02-28" },
  { tipo: "autorizacion", estado: "rechazada", fecha: "2025-01-15" },
  { tipo: "autorizacion", estado: "rechazada", fecha: "2025-01-10" },
  { tipo: "autorizacion", estado: "observacion", fecha: "2024-12-20" },

  { tipo: "receta", estado: "pendiente", fecha: "2025-09-01" },
  { tipo: "receta", estado: "aceptada", fecha: "2025-07-11" },
  { tipo: "receta", estado: "aceptada", fecha: "2025-05-30" },
  { tipo: "receta", estado: "rechazada", fecha: "2025-04-22" },
  { tipo: "receta", estado: "observacion", fecha: "2025-03-05" },
];

export default solicitudes;
