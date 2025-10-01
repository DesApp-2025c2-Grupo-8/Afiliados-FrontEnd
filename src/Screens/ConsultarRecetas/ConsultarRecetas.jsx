import React, { useEffect } from 'react';
import recetas from '../../db/recetas';
import CardReceta from '../../components/CardReceta/CardReceta';
import './ConsultarRecetas.css'

const ConsultarRecetas = () => {
    useEffect( () => {
        document.title = 'Consulta de Recetas - Medicina Integral'
    }, []);

    return(
        <>
            <h1>Estas en la página de Consulta de Recetas</h1>
            <section className='recetasContainer'>
                {recetas.map((unaReceta, idx) => (
                    <CardReceta key={unaReceta.orden + idx} receta={unaReceta}></CardReceta>
                ))}
            </section>
        </>
    );
};

export default ConsultarRecetas;