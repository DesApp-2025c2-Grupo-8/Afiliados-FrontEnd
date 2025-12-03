import React, { useState } from "react";
import styles from "./Perfil.module.css"
import CardDinamica from "../../components/CardDinamica/CardDinamica";
import { useAfiliadoDatos } from "../../context/AfiliadoDatos";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap"

const Perfil = () => {

    const camposCard = [
        { campo: 'Fecha de nacimiento', propiedad: 'fechaNacimiento', esFecha: true },
        { campo: 'N° Afiliado', propiedad: 'numeroAfiliado' },
    ]
    const { dataAfiliado, setDataAfiliado } = useAfiliadoDatos();
    const [telefono, setTelefono] = useState(dataAfiliado?.telefono || "");
    const [direccion, setDireccion] = useState(dataAfiliado?.direccion || "");
    const [email, setEmail] = useState(dataAfiliado?.email || "");

    const [mostrarModalEditarUsuario, setMostrarModalEditarUsuario] = useState(false);
    const [mostrarModalCambiosExitosos, setMostrarModalCambiosExitosos] = useState(false);
    const [errorEditar, setErrorEditar] = useState(false);
    const [errorTelefono, setErrorTelefono] = useState(false);
    const [errorTelefonoNumber, setErrorTelefonoNumber] = useState(false);
    const [errorDireccion, setErrorDireccion] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);

    const handleEditarUsuario = () => {
        setErrorEditar(false);
        setErrorEmail(false);
        setErrorTelefono(false);
        setErrorDireccion(false);
        setErrorTelefonoNumber(false);
        setTelefono(dataAfiliado?.telefono || "");
        setDireccion(dataAfiliado?.direccion || "");
        setEmail(dataAfiliado?.email || "");
        setMostrarModalEditarUsuario(true);
    }


    const nroAfiliado = dataAfiliado?.numeroAfiliado || null;
    const navigate = useNavigate();


    const handleCerrarSesion = () => {
        setDataAfiliado(null);
        sessionStorage.removeItem('afiliadoDatos');
        navigate("/login");

    }


    useEffect(() => {
        document.title = "Perfil - Medicina Integral";
        if (!dataAfiliado) {
            navigate("/login");
            return;
        }

        const fetchUsuario = async () => {
            try {
                const res = await fetch(`http://localhost:3000/users/numeroAfiliado/${nroAfiliado}`);
                const data = await res.json();

                const grupoFamiliarIds = data?.grupoFamiliar || [];
                const grupoCompleto = [];

                for (const id of grupoFamiliarIds) {
                    const r = await fetch(`http://localhost:3000/afiliados/numeroAfiliado/${id}`);
                    if (r.ok) grupoCompleto.push(await r.json());
                }

                const userData = { ...data, grupoFamiliar: grupoCompleto };

                setDataAfiliado(userData);
                sessionStorage.setItem("afiliadoDatos", JSON.stringify(userData));

            } catch (e) { console.log(e); }
        };

        fetchUsuario();

    }, []);


    const grupoFamiliar = dataAfiliado?.grupoFamiliar || [];
    const edad = Math.floor((new Date() - new Date(dataAfiliado.fechaNacimiento)) / (365.25 * 24 * 60 * 60 * 1000));

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = {
            telefono: telefono.trim(),
            direccion: direccion.trim(),
            email: email.trim()
        };

        console.log(body)

        console.log(dataAfiliado)

        if (email.trim() === "" || telefono.trim() === "" || direccion.trim() === "") {
            setErrorEditar(true);
            return;
        }
        else {
            setErrorEditar(false);
        }
        if (telefono.trim().length < 8 || telefono.trim().length > 10) {
            setErrorTelefono(true)
            return;
        }
        else {
            setErrorTelefono(false);
        }
        if (isNaN(Number(telefono))) {
            setErrorTelefonoNumber(true);
            return;
        }

        else {
            setErrorTelefonoNumber(false);
        }
        if (direccion.trim().length < 5) {
            setErrorDireccion(true)
            return;
        }
        else {
            setErrorDireccion(false);
        }
        if (!email.includes("@")) {
            setErrorEmail(true)
            return;
        }
        else {
            setErrorEmail(false);
            setEmail(email.trim());
            setDireccion(direccion.trim());
            setTelefono(telefono.trim());
        }

        try {
            const response = await fetch(`http://localhost:3000/users/actualizarInfo/numeroAfiliado/${nroAfiliado}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            console.log("Usuario actualizado:", data);
            const copiaAfiliado = { ...dataAfiliado, ...data };
            sessionStorage.setItem("afiliadoDatos", JSON.stringify(copiaAfiliado));
            // copiaAfiliado.telefono = data.telefono;
            // copiaAfiliado.direccion = data.direccion;
            // copiaAfiliado.email = data.email;
            setDataAfiliado(copiaAfiliado);
            setMostrarModalEditarUsuario(false);
            setMostrarModalCambiosExitosos(true);
        } catch (error) {
            console.error("Error actualizando usuario:", error);
        }
    };


    return (
        <div className={styles.perfilContainer}>
            <Modal centered show={mostrarModalCambiosExitosos} onHide={() => setMostrarModalCambiosExitosos(false)}>
                <Modal.Header className={styles.headerModalEditarUsuario}>
                    <Modal.Title>Cambios Guardados</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.bodyModalEditarUsuario}>
                    <p>Los cambios se han guardado exitosamente.</p>
                </Modal.Body>
                <Modal.Footer className={styles.footerModalEditarUsuario}>
                    <Button className={styles.btnCerrarCambios} onClick={() => setMostrarModalCambiosExitosos(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal centered show={mostrarModalEditarUsuario} onHide={() => setMostrarModalEditarUsuario(false)}>
                <Modal.Header className={styles.headerModalEditarUsuario}>
                    <Modal.Title>Editar Información de Contacto</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.bodyModalEditarUsuario}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Teléfono</label>
                            <input
                                type="text"
                                className="form-control"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                            />
                            {errorTelefonoNumber && <p className={styles.errorEditar}>El teléfono debe ser un número válido!</p>}
                            {errorTelefono && <p className={styles.errorEditar}>El teléfono debe tener entre 8 y 10 caracteres!</p>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errorEmail && <p className={styles.errorEditar}>Ingrese un email válido!</p>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Dirección</label>
                            <input
                                type="text"
                                className="form-control"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                            />
                            {errorDireccion && <p className={styles.errorEditar}>La dirección debe tener al menos 5 caracteres!</p>}
                        </div>


                        {errorEditar && <p className={styles.errorEditar}>Los campos no pueden estar vacíos!</p>}
                    </form>

                </Modal.Body>
                <Modal.Footer className={styles.footerModalEditarUsuario}>
                    <Button className={styles.btnCerrarCambios} onClick={() => setMostrarModalEditarUsuario(false)}>
                        Cerrar
                    </Button>
                    <Button className={styles.btnGuardarCambios} onClick={handleSubmit}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className={styles.perfilBox}>
                <section className={styles.seccionInformacion + " " + (grupoFamiliar.length < 1 ? styles.filas : "")}>
                    <div className={styles.imagenPerfil}>
                        <h1>Informacion Personal</h1>
                        <img src={!dataAfiliado.foto ? "src/assets/images/perfil.webp" : dataAfiliado.foto} alt="" />
                    </div>
                    <div className={styles.cardsInformacion}>
                        <article className={styles.articuloPerfil}>
                            <p className={styles.campoPerfil}> <strong>Nombre:</strong> {dataAfiliado.nombre + " " + dataAfiliado.apellido}</p>
                            <p> <strong>{dataAfiliado.tipoDocumento}:</strong> {dataAfiliado.numeroDocumento}</p>
                        </article>
                        <article className={styles.articuloPerfil}>
                            <p className={styles.campoPerfil}> <strong>Edad:</strong> {edad}</p>
                            <p><strong>Fecha de Nacimiento:</strong> {new Date(dataAfiliado.fechaNacimiento).toLocaleDateString("es-AR")}</p>
                        </article>
                        <article className={styles.articuloPerfil}>
                            <p className={styles.campoPerfil}> <strong>Telefono:</strong> {dataAfiliado.telefono}</p>
                            <p><strong>Email:</strong> {dataAfiliado.email}</p>
                        </article>
                        <article className={styles.articuloPerfil}>
                            <p className={styles.campoPerfil}> <strong>Dirección:</strong> {dataAfiliado.direccion ? dataAfiliado.direccion : "No especificada"}</p>
                            <p><strong>ROL:</strong> {dataAfiliado.rol}</p>
                        </article>
                        <article className={styles.articuloPerfil}>
                            <p className={styles.campoPerfil}> <strong>N° Afiliado:</strong> {dataAfiliado.numeroAfiliado}</p>
                            <p><strong>Plan Medico:</strong> {dataAfiliado.planMedico}</p>
                        </article>
                    </div>
                    <div className={styles.btnUsuario}>
                        <button className={styles.btnCerrarSesion} onClick={handleCerrarSesion}>Cerrar Sesión</button>
                        <button className={styles.btnEditar} onClick={handleEditarUsuario}>Editar Perfil</button>
                    </div>
                </section>
                <section className={styles.seccionGrupoFamiliar + " " + (grupoFamiliar.length < 1 ? styles.sinGrupoFamiliar : "")}>
                    <h2>Grupo Familiar</h2>
                    <div className={styles.cardsGrupoFamiliar}>
                        {grupoFamiliar.length < 1 ? <p>No hay miembros en el grupo familiar</p> : ""}
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
                </section>
                    <button className={styles.btnEditarMobile} onClick={handleEditarUsuario}>Editar Perfil</button>
                    <button className={styles.btnCerrarSesionMobile} onClick={handleCerrarSesion}>Cerrar Sesión</button>

            </div>

        </div>
    )
}

export default Perfil;