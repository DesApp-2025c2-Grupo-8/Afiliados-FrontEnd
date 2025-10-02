import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import recetas from '../../db/recetas';
import CardReceta from '../../components/CardReceta/CardReceta';
import './ConsultarRecetas.css'
import SearchBarConsultarRecetas from '../../components/SearchBarConsultarRecetas/SearchBarConsultarRecetas';
import FiltrosConsultarRecetas from '../../components/FiltrosConsultarRecetas/FiltrosConsultarRecetas';
import { MdCancel } from 'react-icons/md';
import { BsClipboard2Plus } from 'react-icons/bs';

const integrantesOpciones = [...new Set(recetas.map(r => r.integrante))];
const presentacionesOpciones = [...new Set(recetas.map(r => r.presentacion))];

const ConsultarRecetas = () => {
    useEffect(() => {
        document.title = 'Consulta de Recetas - Medicina Integral'
    }, []);

    const [listaRecetas] = useState(recetas);
    const [listaRecetasFiltradas, setListaRecetasFiltradas] = useState(recetas);
    const [filtroMedicamento, setFiltroMedicamento] = useState('');
    const [filtroIntegrante, setFiltroIntegrante] = useState('');
    const [filtroPresentacion, setFiltroPresentacion] = useState('');

    const filtrarPorMedicamento = (unMedicamento) => {
        setFiltroMedicamento(unMedicamento);
        aplicarFiltros(unMedicamento, filtroIntegrante, filtroPresentacion);
    };

    const filtrarPorIntegrante = (unIntegrante) => {
        setFiltroIntegrante(unIntegrante);
        aplicarFiltros(filtroMedicamento, unIntegrante, filtroPresentacion);
    };

    const filtrarPorPresentacion = (unaPresentacion) => {
        setFiltroPresentacion(unaPresentacion);
        aplicarFiltros(filtroMedicamento, filtroIntegrante, unaPresentacion);
    };

    const aplicarFiltros = (unMedicamento, unIntegrante, unaPresentacion) => {
        let listaRecetasAFiltrar = [...listaRecetas];
        
        if (unMedicamento) {
            listaRecetasAFiltrar = listaRecetasAFiltrar.filter(r => r.medicamento.toLowerCase().includes(unMedicamento.toLowerCase()));
        }

        if (unIntegrante) {
            listaRecetasAFiltrar = listaRecetasAFiltrar.filter(r => r.integrante === unIntegrante);
        }

        if (unaPresentacion) {
            listaRecetasAFiltrar = listaRecetasAFiltrar.filter(r => r.presentacion === unaPresentacion);
        }

        setListaRecetasFiltradas(listaRecetasAFiltrar);
    };

    const borrarFiltroIntegrante = () => {
        setFiltroIntegrante('');
        aplicarFiltros(filtroMedicamento, '', filtroPresentacion);
    };

    const borrarFiltroPresentacion = () => {
        setFiltroPresentacion('');
        aplicarFiltros(filtroMedicamento, filtroIntegrante, '');
    };

    const limpiarFiltros = () => {
        setListaRecetasFiltradas(listaRecetas);
        setFiltroMedicamento('');
        setFiltroIntegrante('');
        setFiltroPresentacion('');
    };

    return (
        <>
            <div className='consultaRecetasContainer'>
                {/* <button onClick={() => console.log(listaRecetas)}>Ver recetas por consola</button> */}
                <section className='botonesContainer'>
                    <h1>Consultar Recetas</h1>
                    <SearchBarConsultarRecetas filtrarPorMedicamento={filtrarPorMedicamento}></SearchBarConsultarRecetas>
                    <Link className='botonCargarReceta' to={'/cargar-receta'}><BsClipboard2Plus style={{marginRight: '10px'}}/>Cargar Receta</Link>
                </section>
                <div className='box'>
                    <section className='filtroContainer'>
                        <h2>Filtrar recetas por:</h2>
                        <hr />
                        <div className='botonLimpiarFiltrosContainer'>
                            <button className='botonLimpiarFiltros' onClick={limpiarFiltros}>Limpiar filtros<MdCancel style={{marginLeft: '10px'}}/></button>
                        </div>
                        <FiltrosConsultarRecetas
                            label={'Integrante'}
                            default={'Seleccione un integrante...'}
                            opciones={integrantesOpciones}
                            valorActual={filtroIntegrante}
                            filtrarAlSeleccionar={filtrarPorIntegrante}
                            borrarFiltro={borrarFiltroIntegrante}
                        />
                        <FiltrosConsultarRecetas
                            label={'Presentación'}
                            default={'Seleccione una presentación...'}
                            opciones={presentacionesOpciones}
                            valorActual={filtroPresentacion}
                            filtrarAlSeleccionar={filtrarPorPresentacion}
                            borrarFiltro={borrarFiltroPresentacion}
                        />
                        <hr />
                        <FiltrosConsultarRecetas
                            label={'Período'}
                            default={'TODO'}
                            opciones={['Último año', 'Últimos 6 meses', 'Últimos 3 meses', 'Último mes', 'Última semana']}
                            valorActual={''}
                            filtrarAlSeleccionar={''}
                            borrarFiltro={''}
                        />
                    </section>
                    <section className='recetasContainer'>
                        {listaRecetasFiltradas.length === 0 ?
                            <h2>No existen recetas del medicamento ingresado</h2> :
                            (listaRecetasFiltradas.map((unaReceta, idx) => (
                                <CardReceta key={unaReceta.orden + idx} receta={unaReceta}></CardReceta>
                            )))}
                    </section>
                </div>
            </div>
        </>
    );
};

export default ConsultarRecetas;