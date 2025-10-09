import React, { useState } from 'react';
import prestadores from '../../db/prestadores.js'
import CardPrestadores from '../../components/CardPrestadores/CardPrestadores';
import FormPrestadores from '../../components/FormPrestadores/FormPrestadores.jsx'
import styles from './CartillaPrestadores.module.css'

const cartillaPrestadores = () => {
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
            <div className={styles.containerCartillaPrestadores}>
                <h1 className={styles.tituloPrestadores}>Cartilla de Prestadores</h1>
                <section className='conteinerFormPrestadores'>
                    <FormPrestadores prestadores={prestadores} onBuscar={manejarResultadoBusqueda} buscarPrestadores={buscarPrestadores} especialidad={cambiarEspecialidad} />
                </section>

                <section className={styles.containerResultadosPrestadores}>
                    <h2 className={styles.tituloResultadosPrestadores}>Resultados de Búsqueda</h2>
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