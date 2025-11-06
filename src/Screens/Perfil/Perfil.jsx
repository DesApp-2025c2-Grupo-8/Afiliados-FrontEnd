import React, { useState } from "react";
import styles from "./Perfil.module.css"
import CardDinamica from "../../components/CardDinamica/CardDinamica";
import { useAfiliadoDatos } from "../../context/AfiliadoDatos";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Perfil = () => {

    const camposCard = [
        { campo: 'Fecha de nacimiento', propiedad: 'fechaNacimiento', esFecha: true },
        { campo: 'N° Afiliado', propiedad: 'numeroAfiliado' },
        { campo: 'Teléfono', propiedad: 'telefono' },
        { campo: 'Email', propiedad: 'email' },
    ]
    const { dataAfiliado, setDataAfiliado } = useAfiliadoDatos();

    const nroAfiliado = dataAfiliado?.numeroAfiliado || null;
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(dataAfiliado || {});

    const handleCerrarSesion = () => {
        setDataAfiliado(null);
        sessionStorage.removeItem('afiliadoDatos');
        navigate("/login");
        
    }

    useEffect(() => {
        if (!dataAfiliado) {
            navigate("/login");
        } else {
            fetch(`http://localhost:3000/users/numeroAfiliado/${nroAfiliado}`)
            .then(response => response.json())
            .then(data => setUsuario(data))
            .catch(error => console.error('Error al obtener los datos del usuario:', error));
        }
        
    }, [nroAfiliado, navigate]);

    //cambiar por lo que venga del fetch
    const grupoFamiliar = dataAfiliado.grupoFamiliar || [];
    const edad = Math.floor((new Date() - new Date(usuario.fechaNacimiento)) / (365.25 * 24 * 60 * 60 * 1000));

    return (
        <div className={styles.perfilContainer}>
            <div className={styles.perfilBox}>
                <section className={styles.seccionInformacion + " " + (grupoFamiliar.length < 1 ? styles.filas : "")}>
                    <div className={styles.imagenPerfil}>
                        <h1>Informacion Personal</h1>
                        <img src={!usuario.foto ? "src/assets/images/perfil.webp" : usuario.foto} alt="" />
                    </div>
                    <div className={styles.cardsInformacion}>
                        <article className={styles.articuloPerfil}>
                            <p className={styles.campoPerfil}> <strong>Nombre:</strong> {usuario.nombre + " " + usuario.apellido}</p>
                            <p> <strong>{usuario.tipoDocumento}:</strong> {usuario.numeroDocumento}</p>
                        </article>
                        <article className={styles.articuloPerfil}>
                            <p className={styles.campoPerfil}> <strong>Edad:</strong> {edad}</p>
                            <p><strong>Fecha de Nacimiento:</strong> {new Date(usuario.fechaNacimiento).toLocaleDateString("es-AR")}</p>
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
                        {
                            grupoFamiliar.map(usuario => (
                                <CardDinamica
                                    key={usuario.numeroAfiliado + usuario.nombre}
                                    data={usuario}
                                    header={usuario.nombre + " " + usuario.apellido + " - " + usuario.rol}
                                    color={"aceptada"}
                                    camposCard={camposCard}
                                    tieneBotonDescarga={false}
                                />
                            ))
                        }

                    </div>
                    <button onClick={handleCerrarSesion}>Cerrar Sesón</button>
                </section>
                
            </div>
            
        </div>
    )
}

export default Perfil;