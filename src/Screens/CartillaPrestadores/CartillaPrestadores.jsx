import React, { useState, useEffect } from 'react';
import CardDinamica from '../../components/CardDinamica/CardDinamica';
import FormPrestadores from '../../components/FormPrestadores/FormPrestadores.jsx'
import styles from './CartillaPrestadores.module.css'
import { useNavigate } from "react-router-dom";
import { useAfiliadoDatos } from "../../context/AfiliadoDatos";


const cardData = {
    // Color: Clase para el color del header de la Card, en idex.css
    color: 'aceptada',
    // camposCard: va toda la informacion que queremos mostrar en la tarjeta, espera un nombre y un valor se mustran por campo o fila de la card
    camposCard: [
        // Campo: es el nombre en negrita de la fila
        // Propiedad: es la cual queremos mostrar el valor. Parecido a ej: cliente.nombre donde pasamos 'nombre'
        { campo: 'Dirección', propiedad: 'ubicacion' },
        { campo: 'Teléfonos', propiedad: 'telefono' },
        { campo: 'Especialidad', propiedad: 'especialidad' },
        { campo: 'Tipo de prestador', propiedad: 'tipo' }
    ]
    //tieneBotonDescarga: true Solo es necesario agregarse si la tarjeta tiene boton de descarga, de lo contrario puede omitirse y borrarse.
};

const cartillaPrestadores = () => {
    const { dataAfiliado, setDataAfiliado } = useAfiliadoDatos();
    const navigate = useNavigate();
    useEffect(() => {
        document.title = 'Cartilla de Prestadores - Medicina Integral'
        if (!dataAfiliado) {
            navigate("/login");
        }

        fetch('http://localhost:3000/prestadores')
            .then(response => {
                if (!response.ok) throw new Error('Error en la obtener los prestadores')
                return response.json()
            })
            .then(data => {
                setPrestadores(data)
            }).catch(error => console.error("Error: ", error))
    }, []);

    const [prestadores, setPrestadores] = useState([])
    const [resultado, setResultado] = useState([])
    const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState('')
    const [ubicacionesDisponibles, setUbicacionesDisponibles] = useState([])
    const [tiposDisponibles, setTiposDisponibles] = useState([])
    const [errorEspecialidad, setErrorEspecialidad] = useState(false)
    const [ubicacionBusqueda, setUbicacionBusqueda] = useState('')

    const [nombre, setNombre] = useState('')
    const [ubicacion, setUbicacion] = useState('')
    const [tipo, setTipoPrestador] = useState('')


    const cambiarEspecialidad = (especialidad) => {
        setEspecialidadSeleccionada(especialidad)

        const filtrados = prestadores.filter(p => p.especialidad === especialidad)

        const ubicaciones = [...new Set(filtrados.flatMap(p => p.ubicacion.map(u => `${u.partido} - ${u.direccion}`)))]

        //console.log(ubicaciones)
        const tipos = [...new Set(filtrados.map(p => p.tipo))]

        setUbicacionesDisponibles(ubicaciones)
        setTiposDisponibles(tipos)
    }

    const buscarPrestadores = (event) => {
        event.preventDefault()

        if (!especialidadSeleccionada) {
            setErrorEspecialidad(true)
            return
        } else {
            setErrorEspecialidad(false)
        }

        let resultadosFiltrados = prestadores

        const normalizar = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        if (nombre) {
            resultadosFiltrados = resultadosFiltrados.filter(p => normalizar(p.nombre).includes(normalizar(nombre)))
        }

        if (especialidadSeleccionada) {
            resultadosFiltrados = resultadosFiltrados.filter(p => p.especialidad === especialidadSeleccionada)
        }

        if (ubicacion) {
            resultadosFiltrados = resultadosFiltrados.filter(p => p.ubicacion.some(u => `${u.partido} - ${u.direccion}` === ubicacion))
        }

        if (tipo) {
            resultadosFiltrados = resultadosFiltrados.filter(p => p.tipo === tipo)
        }

        setUbicacionBusqueda(ubicacion)
        setResultado(resultadosFiltrados)
    }

    return (
        <>
            <div className={styles.containerCartillaPrestadores}>
                <div className={styles.containerTituloPrestadores}>
                    <h1 className={styles.tituloPrestadores}>Cartilla de Prestadores</h1>
                </div>
                <section className={styles.conteinerFormPrestadores}>
                    <FormPrestadores
                        prestadores={prestadores}
                        nombre={nombre}
                        ubicacion={ubicacion}
                        tipo={tipo}
                        especialidadSeleccionada={especialidadSeleccionada}
                        errorEspecialidad={errorEspecialidad}

                        setErrorEspecialidad={setErrorEspecialidad}
                        setNombre={setNombre}
                        setUbicacion={setUbicacion}
                        setTipoPrestador={setTipoPrestador}
                        cambiarEspecialidad={cambiarEspecialidad}

                        ubicaciones={ubicacionesDisponibles}
                        tipos={tiposDisponibles}

                        buscarPrestadores={buscarPrestadores}

                    />
                </section>
                <div className={styles.containerTituloSub}>
                    <h2 className={styles.tituloResultadosPrestadores}>Resultados de Búsqueda</h2>
                </div>

                <section className={styles.containerResultadosPrestadores}>

                    {resultado.length > 0 ? (
                        resultado.flatMap((prestador, idxPrestador) => {

                            const ubicacionesFiltradas = ubicacionBusqueda
                                ? prestador.ubicacion.filter(
                                    u => `${u.partido} - ${u.direccion}` === ubicacionBusqueda
                                )
                                : prestador.ubicacion;

                            return ubicacionesFiltradas.map((ubi, idxUbi) => (
                                <CardDinamica
                                    {...cardData}
                                    key={`${prestador.nombre}-${idxPrestador}-${idxUbi}`}
                                    data={{
                                        ...prestador,
                                        ubicacion: `${ubi.partido} - ${ubi.direccion}`
                                    }}
                                    header={prestador.nombre}
                                />
                            ));
                        })
                    ) : (
                        <p className={styles.sinResultados}>No se encontraron resultados</p>
                    )}

                </section>
            </div>
        </>
    )
}

export default cartillaPrestadores;