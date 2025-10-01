import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import recetas from '../../db/recetas';
import CardReceta from '../../components/CardReceta/CardReceta';
import './ConsultarRecetas.css'

const ConsultarRecetas = () => {
    useEffect( () => {
        document.title = 'Consulta de Recetas - Medicina Integral'
    }, []);

    return(
        <>
            <div className='consultaRecetasContainer'>
                <h1>Estas en la página de Consulta de Recetas</h1>
                    <section className='botonesContainer'>
                        <h2>Consultar Recetas</h2>
                        <button>Buscar: </button>
                        <Link className='botonCargarReceta' to={'/cargar-receta'}>Cargar Receta</Link>
                    </section>
                <div className='box'>
                    <section className='filtroContainer'>
                        <h2>Filtros activos</h2>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident, facere harum ex nemo minus iste neque voluptatem. Minima accusantium iure eos, rem quas laborum earum animi cumque quisquam recusandae vel?</p>
                    </section>
                    <section className='recetasContainer'>
                        {recetas.map((unaReceta, idx) => (
                            <CardReceta key={unaReceta.orden + idx} receta={unaReceta}></CardReceta>
                        ))}
                    </section>
                </div>
            </div>
        </>
    );
};

export default ConsultarRecetas;