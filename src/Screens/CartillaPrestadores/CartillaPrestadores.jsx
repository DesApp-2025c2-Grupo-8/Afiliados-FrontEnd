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
        { campo: 'Dirección', propiedad: 'ubicacion.direccion' },
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
        .then( response => {
            if(!response.ok) throw new Error('Error en la obtener los prestadores')
            return response.json()
        })
        .then( data => {
            setPrestadores(data)
        }).catch( error => console.error("Error: ", error))
    }, []);

    const [prestadores, setPrestadores] = useState([])
    const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState('')
    const [ubicaciones, setUbicaciones] = useState([])
    const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState('')
    const [resultado, setResultado] = useState(prestadores)

    const manejarResultadoBusqueda = (resultados) => {
        setResultado(resultados)
    }

    return (
        <>
            <div className={styles.containerCartillaPrestadores}>
                <h1 className={styles.tituloPrestadores}>Cartilla de Prestadores</h1>
                <section className='conteinerFormPrestadores'>
                    <FormPrestadores prestadores={prestadores} onBuscar={manejarResultadoBusqueda}  />
                </section>

                <section className={styles.containerResultadosPrestadores}>
                    <h2 className={styles.tituloResultadosPrestadores}>Resultados de Búsqueda</h2>
                    {resultado.length > 0 ? (resultado.map((prestador, idx) => (
                        // <CardPrestadores key={prestador.id + idx} prestador={prestador} />
                        <CardDinamica
                            {...cardData}

                            //Estos son los que hay que modificar segun la data a mostrar 
                            key={prestador._id}          //La key del componente (debe ser un valor único!!)
                            data={prestador}            //Elemento actual en la iteración del map
                            header={prestador.nombre}   //El título de la card
                        />
                    ))) : (
                        <p className={styles.parrafo}>No se encontraron resultados</p>
                    )}
                </section>
            </div>
        </>
    )
}

export default cartillaPrestadores;