import React, { useState } from "react";
import styles from "./Perfil.module.css"
import CardDinamica from "../../components/CardDinamica/CardDinamica";
import usuarios from "../../db/usuarios";


const Perfil = () => {

    const camposCard = [
        { campo: 'Edad', propiedad: 'edad' },
        { campo: 'Fecha de nacimiento', propiedad: 'fechaNacimiento', esFecha: true },
        { campo: 'N° Afiliado', propiedad: 'numeroAfiliado' },
        { campo: 'Teléfono', propiedad: 'telefono' },
        { campo: 'Email', propiedad: 'email' },
    ]

    const [nroAfiliado, setNroAfiliado] = useState(663459901);
    const usuario = usuarios.find(u => u.numeroAfiliado === nroAfiliado);
    const grupoFamiliar = usuarios.filter(usuario =>
                                usuario.numeroAfiliado.toString().startsWith(nroAfiliado.toString().slice(0, 7))
                                && usuario.numeroAfiliado !== nroAfiliado)

    return (
        <div className={styles.perfilContainer}>
            <div className={styles.perfilBox}>
                <section className={styles.seccionInformacion + " " + (grupoFamiliar.length < 1 ? styles.filas : "")}>
                    <div className={styles.imagenPerfil}>
                    <h1>Informacion Personal</h1>
                        <img src={"src/assets/images/" + usuario.foto} alt="" />
                    </div>
                    <div className={styles.cardsInformacion}>
                        <article className={styles.articuloPerfil}>
                            <p className={styles.campoPerfil}> <strong>Nombre:</strong> {usuario.nombre + " " + usuario.apellido}</p>
                            <p> <strong>{usuario.tipoDocumento}:</strong> {usuario.numeroDocumento}</p>
                        </article>
                        <article className={styles.articuloPerfil}>
                            <p className={styles.campoPerfil}> <strong>Edad:</strong> {usuario.edad}</p>
                            <p><strong>Fecha de Nacimiento:</strong> {usuario.fechaNacimiento}</p>
                        </article>
                        <article className={styles.articuloPerfil}>
                            <p className={styles.campoPerfil}> <strong>Telefono:</strong> {usuario.telefono}</p>
                            <p><strong>Email:</strong> {usuario.email}</p>
                        </article>
                        <article className={styles.articuloPerfil}>
                            <p className={styles.campoPerfil}> <strong>N° Afiliado:</strong> {usuario.numeroAfiliado}</p>
                            <p><strong>Plan Medico:</strong> {usuario.planMedico}</p>
                        </article>
                    </div>
                </section>
                <section className={styles.seccionGrupoFamiliar + " " + (grupoFamiliar.length < 1 ? styles.sinGrupoFamiliar : "")}>
                    <h2>Grupo Familiar</h2>
                    <div className={styles.cardsGrupoFamiliar}>
                    <p>{grupoFamiliar.length < 1 ? "No hay miembros en el grupo familiar" : ""}</p>
                    {console.log(grupoFamiliar)}
                        {   
                            grupoFamiliar.map(usuario => (
                                    <CardDinamica
                                        key={usuario.numeroAfiliado + usuario.nombre}
                                        data={usuario}
                                        header={usuario.nombre + " " + usuario.apellido}
                                        color={"aceptada"}
                                        camposCard={camposCard}
                                        tieneBotonDescarga={false}
                                    />
                                ))
                        }

                    </div>
                </section>
            </div>
        </div>
    )
}

export default Perfil;