import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import reintegros from '../../db/reintegros';
import CardDinamica from '../../components/CardDinamica/CardDinamica';
import styles from './ConsultarReintegros.module.css'
// import SearchBarCards from '../../components/SearchBarCards/SearchBarCards';
import FiltrosCards from '../../components/FiltrosCards/FiltrosCards';
import { MdCancel } from 'react-icons/md';
import { MdAttachMoney } from 'react-icons/md';

const reintegrosOrdenInverso = [...reintegros].reverse(); //Para ordenar las recetas de más actuales a más antiguas
// Inicializacion de las opciones para mostrar dinamicamente en los filtros de la pantalla, segun la informacion actual (filtrada)
const estadosOpcionesIniciales = ['Pago', 'Pendiente', 'Rechazado'];
const integrantesOpcionesIniciales = [...new Set(reintegros.map(r => r.integrante))];
const periodosOpciones = ['Último año', 'Últimos seis meses', 'Últimos tres meses', 'Último mes', 'Últimas dos semanas', 'Última semana'];

const cardData = {
    // Color: Clase para el color del header de la Card, en idex.css
    
    // camposCard: va toda la informacion que queremos mostrar en la tarjeta, espera un nombre y un valor se mustran por campo o fila de la card
    camposCard: [ 
        // Campo: es el nombre en negrita de la fila
        // Propiedad: es la cual queremos mostrar el valor. Parecido a ej: cliente.nombre donde pasamos 'nombre'
        { campo: 'Nro', propiedad: 'id' },
        { campo: 'Fecha de carga', propiedad: 'fechaDeCarga' },
        { campo: 'Integrante', propiedad: 'integrante' },
        { campo: 'Monto', propiedad: 'monto'}
    ],
    //tieneBotonDescarga: true Solo es necesario agregarse si la tarjeta tiene boton de descarga, de lo contrario puede omitirse y borrarse.
    tieneBotonDescarga: true
};

const ConsultarReintegros = () => {
    useEffect(() => {
        document.title = 'Consulta de Reintegros - Medicina Integral'
    }, []);

    const [listaReintegros] = useState(reintegrosOrdenInverso);
    const [listaReintegrosFiltrados, setlistaReintegrosFiltrados] = useState(reintegrosOrdenInverso);
    const [filtroEstado, setfiltroEstado] = useState('');
    const [filtroIntegrante, setFiltroIntegrante] = useState('');
    const [filtroPeriodo, setFiltroPeriodo] = useState('');

    const [estadosOpciones, setEstadosOpciones] = useState(estadosOpcionesIniciales);
    const [integrantesOpciones, setIntegrantesOpciones] = useState(integrantesOpcionesIniciales);

    const filtrarPorEstado = (unEstado) => {
        setfiltroEstado(unEstado);
        aplicarFiltros(unEstado, filtroIntegrante, filtroPeriodo);
    };

    const filtrarPorIntegrante = (unIntegrante) => {
        setFiltroIntegrante(unIntegrante);
        aplicarFiltros(filtroEstado, unIntegrante, filtroPeriodo);
    };

    const filtrarPorPeriodo = (unPeriodo) => {
        setFiltroPeriodo(unPeriodo);
        aplicarFiltros(filtroEstado, filtroIntegrante, unPeriodo);
    }

    const aplicarFiltros = (unEstado, unIntegrante, unPeriodo) => {
        let listaReintegrosAFiltrar = [...listaReintegros];
        
        if (unEstado) {
            listaReintegrosAFiltrar = listaReintegrosAFiltrar.filter(r => r.estado === unEstado);
        };

        if (unIntegrante) {
            listaReintegrosAFiltrar = listaReintegrosAFiltrar.filter(r => r.integrante === unIntegrante);
        };

        if (unPeriodo) {
            const fechaDelPeriodoSeleccionado =  obtenerFechaDelPeriodoSeleccionado(unPeriodo);
            listaReintegrosAFiltrar = listaReintegrosAFiltrar.filter(r => r.fechaDeCarga >= fechaDelPeriodoSeleccionado);
            // console.log('Cantidad de elem filtrados en el periodo seleccionado: ', listaRecetasAFiltrar.length);
        };

        setlistaReintegrosFiltrados(listaReintegrosAFiltrar);

        const opcionesIntegrante = listaReintegros.filter(r => 
            (!unEstado || r.estado === unEstado)
        ).map(r => r.integrante);

        const opcionesEstado = listaReintegros.filter(r => 
            (!unIntegrante || r.integrante === unIntegrante)
        ).map(r => r.estado);

        setEstadosOpciones([... new Set(opcionesEstado)])
        setIntegrantesOpciones([...new Set(opcionesIntegrante)]);
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

    const limpiarFiltroEstado = () => {
        setfiltroEstado('');
        aplicarFiltros('', filtroIntegrante, filtroPeriodo);
    };

    const limpiarFiltroIntegrante = () => {
        setFiltroIntegrante('');
        setIntegrantesOpciones(integrantesOpcionesIniciales);
        aplicarFiltros(filtroEstado, '', filtroPeriodo);
    };

    const limpiarFiltroPeriodo = () => {
        setFiltroPeriodo('');
        aplicarFiltros(filtroEstado, filtroIntegrante, '');
    };

    const limpiarFiltros = () => {
        setlistaReintegrosFiltrados(listaReintegros);
        limpiarFiltroEstado('');
        setFiltroIntegrante('');
        setFiltroPeriodo('');
        setIntegrantesOpciones(integrantesOpcionesIniciales);
    };

    const filtrosConfig = [
        {
            label: 'Estado',
            default: 'TODOS',
            defaultDesactivado: false,
            opciones: estadosOpciones,
            valorActual: filtroEstado,
            filtrarAlSeleccionar: filtrarPorEstado,
            borrarFiltro: limpiarFiltroEstado,
        },
        {
            label: 'Integrante',
            default: 'Seleccione un integrante...',
            defaultDesactivado: true,
            opciones: integrantesOpciones,
            valorActual: filtroIntegrante,
            filtrarAlSeleccionar: filtrarPorIntegrante,
            borrarFiltro: limpiarFiltroIntegrante,
        },
        {
            label: 'Período',
            default: 'TODO',
            defaultDesactivado: false,
            opciones: periodosOpciones,
            valorActual: filtroPeriodo,
            filtrarAlSeleccionar: filtrarPorPeriodo,
            borrarFiltro: limpiarFiltroPeriodo,
        }
    ];

    const colorSegunEstado = (unEstado) => {
        let resultado = '';
        switch (unEstado){
            case 'Pago':
                resultado = 'observacion';
                break;
            case 'Rechazado':
                resultado = 'rechazada';
                break;
            default:
                resultado = 'pendiente'
        }
        return resultado;
    };

    return (   
        <>
            <div className={styles.consultaRecetasContainer}>
                {/* <button onClick={() => console.log(listaReintegros)}>Ver reintegros por consola</button> */}
                <section className={styles.botonesContainer}>
                    <h1>Consultar Reintegros</h1>
                    
                    <Link className={styles.botonCargarReceta} to={'/cargar-reintegro'}><MdAttachMoney style={{marginRight: '10px'}}/>Cargar Reintegro</Link>
                </section>
                <div className={styles.box}>
                    <section className={styles.filtroContainer}>
                        <h2>Filtrar reintegros por:</h2>
                        <hr />
                        <div className={styles.botonLimpiarFiltrosContainer}>
                            <button className={styles.botonLimpiarFiltros} onClick={limpiarFiltros}>Limpiar filtros<MdCancel style={{marginLeft: '10px'}}/></button>
                        </div>
                        {filtrosConfig.map(unFiltro => (
                            <FiltrosCards {...unFiltro} key={unFiltro.label}/>
                        ))}
                        <hr />
                        <h3>{listaReintegrosFiltrados.length} reintegro(s) encontrados</h3>
                    </section>
                    <section className={styles.recetasContainer}>
                        {listaReintegrosFiltrados.length === 0 ?
                            <h2>No existen reintegros con los filtros ingresados</h2> :
                            (listaReintegrosFiltrados.map((unReintegro) => (
                                <CardDinamica
                                    {...cardData}

                                    //Estos son los que hay que modificar segun la data a mostrar 
                                    color={colorSegunEstado(unReintegro.estado)} 
                                    key={unReintegro.id}                   //La key del componente (debe ser un valor único!!)
                                    data={unReintegro}                        //Elemento actual en la iteración del map
                                    header={unReintegro.estado.charAt(0).toUpperCase() + unReintegro.estado.slice(1)}  //El título de la card  
                                />
                            )))}
                    </section>
                </div>
            </div>
        </>
    );
};

export default ConsultarReintegros;