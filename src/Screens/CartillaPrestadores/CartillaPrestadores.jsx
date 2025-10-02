import React, { useState, useEffect } from 'react';
import prestadores from '../../db/prestadores.js'
import CardPrestadores from '../../components/CardPrestadores/CardPrestadores';
import FormPrestadores from '../../components/FormPrestadores/FormPrestadores.jsx'
import './CartillaPrestadores.css'

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
                        <CardPrestadores key={prestador.id + idx} prestador={prestador} />
                    ))) : (
                        <p>No se encontraron resultados</p>
                    )}
                </section>
            </div>
        </>
    )
}

export default cartillaPrestadores;