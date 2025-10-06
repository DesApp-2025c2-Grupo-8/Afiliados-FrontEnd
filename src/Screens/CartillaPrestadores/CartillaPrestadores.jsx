import React, { useState, useEffect } from 'react';
import prestadores from '../../db/prestadores.js'
import CardPrestadores from '../../components/CardPrestadores/CardPrestadores';
import CardDinamica from '../../components/CardDinamica/CardDinamica';
import FormPrestadores from '../../components/FormPrestadores/FormPrestadores.jsx'
import './CartillaPrestadores.css'

const cardData = {
    // Color: Clase para el color del header de la Card, en idex.css
    color: 'aceptada',
    // camposCard: va toda la informacion que queremos mostrar en la tarjeta, espera un nombre y un valor se mustran por campo o fila de la card
    camposCard: [
        // Campo: es el nombre en negrita de la fila
        // Propiedad: es la cual queremos mostrar el valor. Parecido a ej: cliente.nombre donde pasamos 'nombre'
        { campo: 'Dirección', propiedad: 'direccion' },
        { campo: 'Teléfonos', propiedad: 'telefono' },
        { campo: 'Especialidad', propiedad: 'especialidad' },
        { campo: 'Tipo de prestador', propiedad: 'tipoDePrestador' }
    ]
    //tieneBotonDescarga: true Solo es necesario agregarse si la tarjeta tiene boton de descarga, de lo contrario puede omitirse y borrarse.
};

const cartillaPrestadores = () => {
    useEffect( () => {
            document.title = 'Cartilla de Prestadores - Medicina Integral'
    }, []);

    const [especialidad, setEspecialidad] = useState('')
    const [resultado, setResultado] = useState(prestadores)

    const manejarResultadoBusqueda = (resultados) => {
        setResultado(resultados)
    }

    const cambiarEspecialidad = (value) => setEspecialidad(value)

    const buscarPrestadores = (e) => {
        e.preventDefault()

        const prestadoresEncontrados = prestadores.filter((prestador) => prestador.especialidad === especialidad)
        setResultado(prestadoresEncontrados)
    }

    return (
        <>
            <div className='containerCartillaPrestadores'>
                <h1 className='tituloPrestadores'>Cartilla de Prestadores</h1>
                <section className='conteinerFormPrestadores'>
                    <FormPrestadores prestadores={prestadores} onBuscar={manejarResultadoBusqueda} buscarPrestadores={buscarPrestadores} especialidad={cambiarEspecialidad} />
                </section>

                <section className='containerResultadosPrestadores'>
                    <h2>Resultados de Búsqueda</h2>
                    {resultado.length > 0 ? (resultado.map((prestador, idx) => (
                        // <CardPrestadores key={prestador.id + idx} prestador={prestador} />
                        <CardDinamica
                            {...cardData}

                            //Estos son los que hay que modificar segun la data a mostrar 
                            key={prestador.id}          //La key del componente (debe ser un valor único!!)
                            data={prestador}            //Elemento actual en la iteración del map
                            header={prestador.nombre}   //El título de la card
                        />                
                    ))) : (
                        <p>No se encontraron resultados</p>
                    )}
                </section>
            </div>
        </>
    )
}

export default cartillaPrestadores;