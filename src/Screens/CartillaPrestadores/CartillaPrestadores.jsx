import React from 'react';
import prestadores from '../../db/prestadores.js'
import CardPrestadores from '../../components/CardPrestadores/CardPrestadores';
import FormPrestadores from '../../components/FormPrestadores/FormPrestadores.jsx'
import './CartillaPrestadores.css'




const cartillaPrestadores = () => {
    return (
        <>
            <h1>Cartilla de Prestadores</h1>
            <section className='conteinerFormPrestadores'>
                <FormPrestadores />
            </section>

            <section className='containerResultadosPrestadores'>
                <h2>Resultados de Busqúeda</h2>
                {prestadores.map((prestador, idx) => (
                    <CardPrestadores key={prestador.nombre + idx} prestador={prestador} />
                ))}
            </section>
        </>
    )
}


export default cartillaPrestadores;