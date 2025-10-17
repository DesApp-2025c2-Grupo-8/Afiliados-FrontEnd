const solicitudes = [
  // ----- ÚLTIMOS 7 DÍAS (2025-09-24 a 2025-10-01) -----
  { tipo: "reintegro", estado: "aceptada", fecha: "2025-09-29" },
  { tipo: "reintegro", estado: "aceptada", fecha: "2025-09-29" },
  { tipo: "reintegro", estado: "aceptada", fecha: "2025-09-29" },
  { tipo: "reintegro", estado: "observacion", fecha: "2025-09-27" },

  { tipo: "autorizacion", estado: "pendiente", fecha: "2025-10-01" },
  { tipo: "autorizacion", estado: "pendiente", fecha: "2025-09-30" },
  { tipo: "autorizacion", estado: "aceptada", fecha: "2025-09-29" },
  { tipo: "autorizacion", estado: "observacion", fecha: "2025-09-27" },
  { tipo: "autorizacion", estado: "observacion", fecha: "2025-09-27" },

  { tipo: "receta", estado: "pendiente", fecha: "2025-10-01" },
  { tipo: "receta", estado: "pendiente", fecha: "2025-10-01" },
  { tipo: "receta", estado: "aceptada", fecha: "2025-09-29" },
  { tipo: "receta", estado: "rechazada", fecha: "2025-09-28" },

  // ----- ÚLTIMO MES (2025-09-01 a 2025-09-23) -----
  { tipo: "reintegro", estado: "pendiente", fecha: "2025-09-20" },
  { tipo: "reintegro", estado: "aceptada", fecha: "2025-09-18" },
  { tipo: "reintegro", estado: "aceptada", fecha: "2025-09-16" },
  { tipo: "reintegro", estado: "rechazada", fecha: "2025-09-15" },
  { tipo: "reintegro", estado: "observacion", fecha: "2025-09-14" },

  { tipo: "autorizacion", estado: "pendiente", fecha: "2025-09-20" },
  { tipo: "autorizacion", estado: "aceptada", fecha: "2025-09-18" },
  { tipo: "autorizacion", estado: "rechazada", fecha: "2025-09-17" },
  { tipo: "autorizacion", estado: "rechazada", fecha: "2025-09-16" },
  { tipo: "autorizacion", estado: "observacion", fecha: "2025-09-14" },

  { tipo: "receta", estado: "pendiente", fecha: "2025-09-20" },
  { tipo: "receta", estado: "pendiente", fecha: "2025-09-18" },
  { tipo: "receta", estado: "aceptada", fecha: "2025-09-16" },
  { tipo: "receta", estado: "rechazada", fecha: "2025-09-15" },
  { tipo: "receta", estado: "observacion", fecha: "2025-09-13" },

  // ----- ÚLTIMO AÑO (2024-10-01 a 2025-08-31) -----
  { tipo: "reintegro", estado: "pendiente", fecha: "2025-08-10" },
  { tipo: "reintegro", estado: "pendiente", fecha: "2025-08-01" },
  { tipo: "reintegro", estado: "aceptada", fecha: "2025-07-01" },
  { tipo: "reintegro", estado: "rechazada", fecha: "2025-06-01" },
  { tipo: "reintegro", estado: "observacion", fecha: "2025-05-01" },

  { tipo: "autorizacion", estado: "pendiente", fecha: "2025-04-01" },
  { tipo: "autorizacion", estado: "aceptada", fecha: "2025-03-01" },
  { tipo: "autorizacion", estado: "aceptada", fecha: "2025-02-01" },
  { tipo: "autorizacion", estado: "aceptada", fecha: "2025-02-01" },
  { tipo: "autorizacion", estado: "aceptada", fecha: "2025-02-01" },
  { tipo: "autorizacion", estado: "rechazada", fecha: "2025-01-01" },
  { tipo: "autorizacion", estado: "rechazada", fecha: "2025-01-01" },
  { tipo: "autorizacion", estado: "observacion", fecha: "2025-01-01" },

  { tipo: "receta", estado: "pendiente", fecha: "2024-12-01" },
  { tipo: "receta", estado: "aceptada", fecha: "2024-11-01" },
  { tipo: "receta", estado: "aceptada", fecha: "2024-10-15" },
  { tipo: "receta", estado: "rechazada", fecha: "2024-10-14" },
  { tipo: "receta", estado: "observacion", fecha: "2024-10-10" },

];

export default solicitudes
