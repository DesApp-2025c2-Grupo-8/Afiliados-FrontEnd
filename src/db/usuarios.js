const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
    }
    return edad;
}

const usuarios = [
    {
        numeroAfiliado: 776592801,
        nombre: "Ignacio",
        apellido: "Palmier",
        tipoDocumento: "DNI",
        numeroDocumento: 43663350,
        fechaNacimiento: "2001-07-13",
        edad: calcularEdad("2001-07-13"),
        email: "ignaciopalmier@gmail.com",
        contraseña: "1234",
        telefono: "1158312189",
        planMedico: 310,
        foto: "perfil.webp"
    },
    {
        numeroAfiliado: 663459901,
        nombre: "Valentin",
        apellido: "Varela",
        tipoDocumento: "DNI",
        numeroDocumento: 44097069,
        fechaNacimiento: "2002-03-12",
        edad: calcularEdad("2002-03-12"),
        email: "valentinv741@gmail.com",
        contraseña: "5678",
        telefono: "1150444456",
        planMedico: 310,
        foto: "perfil.webp"
    },
    {
        numeroAfiliado: 938557201,
        nombre: "Santiago",
        apellido: "Solari",
        tipoDocumento: "DNI",
        numeroDocumento: 43510637,
        fechaNacimiento: "2001-08-13",
        edad: calcularEdad("2001-08-13"),
        email: "santiagosolari@gmail.com",
        contraseña: "4444",
        telefono: "11669236622",
        planMedico: 310,
        foto: "perfilSolari.jpg"
    },
    {
        numeroAfiliado: 228510301,
        nombre: "Julieta",
        apellido: "Molina",
        tipoDocumento: "DNI",
        numeroDocumento: 45809252,
        fechaNacimiento: "2004-08-10",
        edad: calcularEdad("2004-08-10"),
        email: "molinatjulieta@gmail.com",
        contraseña: "9999",
        telefono: "1123573098",
        planMedico: 310,
        foto: "perfil.webp"
    },
    //hijos de valentin varela para pruebas de grupo familiar
    {
        numeroAfiliado: 663459902,
        nombre: "Tomas",
        apellido: "Varela",
        tipoDocumento: "DNI",
        numeroDocumento: 44097070,
        fechaNacimiento: "2006-03-12",
        edad: calcularEdad("2006-03-12"),
        email: "tv2@gmail.com",
        contraseña: "6666",
        telefono: "1150444457",
        planMedico: 310,
        foto: "perfil.webp"
    },
    {
        numeroAfiliado: 663459903,
        nombre: "Santiago",
        apellido: "Varela",
        tipoDocumento: "DNI",
        numeroDocumento: 44097071,
        fechaNacimiento: "2006-03-12",
        edad: calcularEdad("2006-03-12"),
        email: "sv3@gmail.com",
        contraseña: "7777",
        telefono: "1150444458",
        planMedico: 310,
        foto: "perfil.webp"
    },
    {
        numeroAfiliado: 663459904,
        nombre: "Julieta",
        apellido: "Varela",
        tipoDocumento: "DNI",
        numeroDocumento: 44097072,
        fechaNacimiento: "2007-03-12",
        edad: calcularEdad("2007-03-12"),
        email: "jv4@gmail.com",
        contraseña: "8888",
        telefono: "1150444459",
        planMedico: 310,
        foto: "perfil.webp"
    },
]

export default usuarios;