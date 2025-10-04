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
const periodosOpciones = ['Último año', 'Últimos seis meses', 'Últimos tres meses', 'Último mes', 'Últimas dos semanas', 'Última semana'];

const ConsultarRecetas = () => {
    useEffect(() => {
        document.title = 'Consulta de Recetas - Medicina Integral'
    }, []);

    const [listaRecetas] = useState(recetas);
    const [listaRecetasFiltradas, setListaRecetasFiltradas] = useState(recetas);
    const [filtroMedicamento, setFiltroMedicamento] = useState('');
    const [filtroIntegrante, setFiltroIntegrante] = useState('');
    const [filtroPresentacion, setFiltroPresentacion] = useState('');
    const [filtroPeriodo, setFiltroPeriodo] = useState(''); //INICIAR en TODO?

    const filtrarPorMedicamento = (unMedicamento) => {
        setFiltroMedicamento(unMedicamento);
        aplicarFiltros(unMedicamento, filtroIntegrante, filtroPresentacion, filtroPeriodo);
    };

    const filtrarPorIntegrante = (unIntegrante) => {
        setFiltroIntegrante(unIntegrante);
        aplicarFiltros(filtroMedicamento, unIntegrante, filtroPresentacion, filtroPeriodo);
    };

    const filtrarPorPresentacion = (unaPresentacion) => {
        setFiltroPresentacion(unaPresentacion);
        aplicarFiltros(filtroMedicamento, filtroIntegrante, unaPresentacion, filtroPeriodo);
    };

    const filtrarPorPeriodo = (unPeriodo) => {
        setFiltroPeriodo(unPeriodo);
        aplicarFiltros(filtroMedicamento, filtroIntegrante, filtroPresentacion, unPeriodo);
    }

    const aplicarFiltros = (unMedicamento, unIntegrante, unaPresentacion, unPeriodo) => {
        let listaRecetasAFiltrar = [...listaRecetas];
        
        if (unMedicamento) {
            listaRecetasAFiltrar = listaRecetasAFiltrar.filter(r => r.medicamento.toLowerCase().includes(unMedicamento.toLowerCase()));
        };

        if (unIntegrante) {
            listaRecetasAFiltrar = listaRecetasAFiltrar.filter(r => r.integrante === unIntegrante);
        };

        if (unaPresentacion) {
            listaRecetasAFiltrar = listaRecetasAFiltrar.filter(r => r.presentacion === unaPresentacion);
        };

        if (unPeriodo) {
            // obtenerFechaDelPeriodoSeleccionado(unPeriodo);
            listaRecetasAFiltrar = listaRecetasAFiltrar.filter(r => r.fechaDeCarga >= obtenerFechaDelPeriodoSeleccionado(unPeriodo));
            console.log('Cantidad de elem filtrados en el periodo seleccionado: ', listaRecetasAFiltrar.length);
        };

        setListaRecetasFiltradas(listaRecetasAFiltrar);
    };

    const obtenerFechaDelPeriodoSeleccionado = (unPeriodo) => {
        //Los datos con la BD fake vienen como String, en la BD me imagino que como Date, si es asi tengo que cambiar la logica en el retorno y en aplicar filtros
        //{console.log(new Date());}                        // Sat Oct 04 2025 13:21:35 GMT-0300 (hora estándar de Argentina)
        //{console.log(new Date().toLocaleDateString());}   // 4/10/2025
        // {console.log(new Date().toISOString());}         // 2025-10-04T16:45:02.876Z => ESTE
        // {console.log('2025/10/04' >= '2015/05/03');}
        // {console.log('2025/10/04' >= '2024/12/27');}
        const fechaActual = new Date();
        let fechaPeriodoFiltro;

        //['Último año', 'Últimos seis meses', 'Últimos tres meses', 'Último mes', 'Últimas dos semanas', 'Última semana'] => 'TODO'

        //Discutir esto:
            //Por el momento esas son las opciones, si llegamos a considerar agregar más 
            //despues cuando hagamos la conexión con la BD implementar los meses como parametrizados? para evitar crear 500 casos
            //Si ese es el caso deberia cambiar la logica y recibir como paramtro Año, Mes, Semana, Dias? y cantidad

        switch (unPeriodo) {
            case 'Último año':
                fechaPeriodoFiltro = new Date(fechaActual.setFullYear(fechaActual.getFullYear()-1));
                break;
            case 'Últimos seis meses':
                fechaPeriodoFiltro = new Date(fechaActual.setMonth(fechaActual.getMonth()-6));
                break;
            case 'Últimos tres meses':
                fechaPeriodoFiltro = new Date(fechaActual.setMonth(fechaActual.getMonth()-3));
                break;
            case 'Último mes':
                fechaPeriodoFiltro = new Date(fechaActual.setMonth(fechaActual.getMonth()-1));
                break;
            case 'Últimas dos semanas':
                fechaPeriodoFiltro = new Date(fechaActual.setDate(fechaActual.getDate()-14));
                break;
            case 'Última semana':
                fechaPeriodoFiltro = new Date(fechaActual.setDate(fechaActual.getDate()-7));
                break;
            default:
                fechaPeriodoFiltro = fechaActual;
        }
        
        // console.log(fechaPeriodoFiltro.toISOString());
        return fechaPeriodoFiltro.toISOString().slice(0,10);
    };

    const borrarFiltroIntegrante = () => {
        setFiltroIntegrante('');
        aplicarFiltros(filtroMedicamento, '', filtroPresentacion, filtroPeriodo);
    };

    const borrarFiltroPresentacion = () => {
        setFiltroPresentacion('');
        aplicarFiltros(filtroMedicamento, filtroIntegrante, '', filtroPeriodo);
    };

    const borrarFiltroPeriodo = () => {
        setFiltroPeriodo(''); //TODO?
        aplicarFiltros(filtroMedicamento, filtroIntegrante, filtroPresentacion, '') //TODO?
    };

    const limpiarFiltros = () => {
        setListaRecetasFiltradas(listaRecetas);
        setFiltroMedicamento('');
        setFiltroIntegrante('');
        setFiltroPresentacion('');
        setFiltroPeriodo(''); //TODO?
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
                        <FiltrosConsultarRecetas //INTEGRANTE
                            label={'Integrante'}
                            default={'Seleccione un integrante...'}
                            defaultDesactivado={true}
                            opciones={integrantesOpciones}
                            valorActual={filtroIntegrante}
                            filtrarAlSeleccionar={filtrarPorIntegrante}
                            borrarFiltro={borrarFiltroIntegrante}
                        />
                        <FiltrosConsultarRecetas //PRESENTACION
                            label={'Presentación'}
                            default={'Seleccione una presentación...'}
                            defaultDesactivado={true}
                            opciones={presentacionesOpciones}
                            valorActual={filtroPresentacion}
                            filtrarAlSeleccionar={filtrarPorPresentacion}
                            borrarFiltro={borrarFiltroPresentacion}
                        />
                        <hr />
                        <FiltrosConsultarRecetas //PERIODO
                            label={'Período'}
                            default={'TODO'}
                            defaultDesactivado={false}
                            opciones={periodosOpciones}
                            valorActual={filtroPeriodo}
                            filtrarAlSeleccionar={filtrarPorPeriodo}
                            borrarFiltro={borrarFiltroPeriodo}
                        />
                    </section>
                    <section className='recetasContainer'>
                        {listaRecetasFiltradas.length === 0 ?
                            <h2>No existen recetas del medicamento ingresado</h2> :
                            (listaRecetasFiltradas.map((unaReceta) => (
                                <CardReceta key={unaReceta.orden} receta={unaReceta}></CardReceta> //Borre idx porque renderiza duplicados (Nro orden es único)
                            )))}
                    </section>
                </div>
            </div>
        </>
    );
};

export default ConsultarRecetas;