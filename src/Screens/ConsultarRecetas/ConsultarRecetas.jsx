import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardDinamica from '../../components/CardDinamica/CardDinamica';
import styles from './ConsultarRecetas.module.css'
import SearchBarCards from '../../components/SearchBarCards/SearchBarCards';
import FiltrosCards from '../../components/FiltrosCards/FiltrosCards';
import { MdCancel } from 'react-icons/md';
import { BsClipboard2Plus } from 'react-icons/bs';
import { useNumeroAfiliado } from '../../context/NumeroAfiliado';

const periodosOpciones = ['Último año', 'Últimos seis meses', 'Últimos tres meses', 'Último mes', 'Últimas dos semanas', 'Última semana'];

const cardData = {
    // Color: Clase para el color del header de la Card, en idex.css
    color: 'observacion', 
    // camposCard: va toda la informacion que queremos mostrar en la tarjeta, espera un nombre y un valor se mustran por campo o fila de la card
    camposCard: [ 
        // Campo: es el nombre en negrita de la fila
        // Propiedad: es la cual queremos mostrar el valor. Parecido a ej: cliente.nombre donde pasamos 'nombre'
        { campo: 'Integrante', propiedad: 'integrante' },
        { campo: 'Fecha de carga', propiedad: 'fechaDeCarga' },
        { campo: 'Medicamento', propiedad: 'medicamento' },
        { campo: 'Cantidad', propiedad: 'cantidad' },
        { campo: 'Presentación', propiedad: 'presentacion' },
        { campo: 'Observaciones', propiedad: 'observaciones' }
    ],
    //tieneBotonDescarga: true Solo es necesario agregarse si la tarjeta tiene boton de descarga, de lo contrario puede omitirse y borrarse.
    tieneBotonDescarga: true 
};

//CAMBIAR ACA PARA BUSCAR POR OTRO INTEGRANTE


const ConsultarRecetas = () => {

    const { numeroAfiliado, setNumeroAfiliado } = useNumeroAfiliado();

    useEffect(() => {
        document.title = 'Consulta de Recetas - Medicina Integral'

        fetch('http://localhost:3000/recetas/' + numeroAfiliado)
            .then(response => response.json())
            .then(data => {
                const recetasOrdenadas = [...data].reverse();
                const recetasFechasCortadas = recetasOrdenadas.map(receta => ({
                    ...receta,
                    fechaDeCarga: receta.fechaDeCarga.slice(0,10)
                }));
                setListaRecetas(recetasFechasCortadas);
                setListaRecetasFiltradas(recetasFechasCortadas);
                const integrantesOpcionesIniciales = [...new Set(data.map(r => r.integrante))].sort();
                setIntegrantesOpciones(integrantesOpcionesIniciales);
                const presentacionesOpcionesIniciales = [...new Set(data.map(r => r.presentacion))].sort();
                setPresentacionesOpciones(presentacionesOpcionesIniciales);   
            })
            .catch(error => console.log(error))
    }, []);

    const [listaRecetas, setListaRecetas] = useState([]);
    const [listaRecetasFiltradas, setListaRecetasFiltradas] = useState([]);
    const [filtroMedicamento, setFiltroMedicamento] = useState('');
    const [filtroIntegrante, setFiltroIntegrante] = useState('');
    const [filtroPresentacion, setFiltroPresentacion] = useState('');
    const [filtroPeriodo, setFiltroPeriodo] = useState('');

    const [integrantesOpciones, setIntegrantesOpciones] = useState([]);
    const [presentacionesOpciones, setPresentacionesOpciones] = useState([]);

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
            const fechaDelPeriodoSeleccionado =  obtenerFechaDelPeriodoSeleccionado(unPeriodo);
            listaRecetasAFiltrar = listaRecetasAFiltrar.filter(r => r.fechaDeCarga >= fechaDelPeriodoSeleccionado);
            // console.log('Cantidad de elem filtrados en el periodo seleccionado: ', listaRecetasAFiltrar.length);
        };

        setListaRecetasFiltradas(listaRecetasAFiltrar);

        const opcionesIntegrante = listaRecetas.filter(r =>
            (!unMedicamento || r.medicamento.toLowerCase().includes(unMedicamento.toLowerCase())) &&
            (!unaPresentacion || r.presentacion === unaPresentacion)
        ).map(r => r.integrante);

        const opcionesPresentacion = listaRecetas.filter(r =>
            (!unMedicamento || r.medicamento.toLowerCase().includes(unMedicamento.toLowerCase())) &&
            (!unIntegrante || r.integrante === unIntegrante)
        ).map(r => r.presentacion);

        setIntegrantesOpciones([...new Set(opcionesIntegrante)]);
        setPresentacionesOpciones([...new Set(opcionesPresentacion)]);
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

    const limpiarFiltroMedicamento = () => {
        setFiltroMedicamento('');
        aplicarFiltros('', filtroIntegrante, filtroPresentacion, filtroPeriodo);
    };

    const limpiarFiltroIntegrante = () => {
        setFiltroIntegrante('');
        setIntegrantesOpciones([...new Set(listaRecetas.map(r => r.integrante))]);
        aplicarFiltros(filtroMedicamento, '', filtroPresentacion, filtroPeriodo);
    };

    const limpiarFiltroPresentacion = () => {
        setFiltroPresentacion('');
        setPresentacionesOpciones([...new Set(listaRecetas.map(r => r.presentacion))]);
        aplicarFiltros(filtroMedicamento, filtroIntegrante, '', filtroPeriodo);
    };

    const limpiarFiltroPeriodo = () => {
        setFiltroPeriodo('');
        aplicarFiltros(filtroMedicamento, filtroIntegrante, filtroPresentacion, '');
    };

    const limpiarFiltros = () => {
        setListaRecetasFiltradas(listaRecetas);
        setFiltroMedicamento('');
        setFiltroIntegrante('');
        setFiltroPresentacion('');
        setFiltroPeriodo('');
        setIntegrantesOpciones([...new Set(listaRecetas.map(r => r.integrante))]);
        setPresentacionesOpciones([...new Set(listaRecetas.map(r => r.presentacion))]);
    };

    const filtrosConfig = [
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
            label: 'Presentación',
            default: 'Seleccione una presentación...',
            defaultDesactivado: true,
            opciones: presentacionesOpciones,
            valorActual: filtroPresentacion,
            filtrarAlSeleccionar: filtrarPorPresentacion,
            borrarFiltro: limpiarFiltroPresentacion,
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

    return (   
        <>
            <div className={styles.consultaRecetasContainer}>
                {/* <button onClick={() => console.log(listaRecetas)}>Ver recetas por consola</button> */}
                <section className={styles.botonesContainer}>
                    <h1>Consultar Recetas</h1>
                    <SearchBarCards // MEDICAMENTO
                        filtro={filtrarPorMedicamento}
                        limpiarFiltros={limpiarFiltroMedicamento}
                        placeholder={"Ingrese un medicamento..."}
                        valorInput={filtroMedicamento}
                    />
                    <Link className={styles.botonCargarReceta} to={'/cargar-receta'}><BsClipboard2Plus style={{marginRight: '10px'}}/>Cargar Receta</Link>
                </section>
                <div className={styles.box}>
                    <section className={styles.filtroContainer}>
                        <h2>Filtrar recetas por:</h2>
                        <hr />
                        <div className={styles.botonLimpiarFiltrosContainer}>
                            <button className={styles.botonLimpiarFiltros} onClick={limpiarFiltros}>Limpiar filtros<MdCancel style={{marginLeft: '10px'}}/></button>
                        </div>
                        {filtrosConfig
                            .filter(filtro => filtro.opciones.length > 1)
                            .map(unFiltro => (
                                <FiltrosCards {...unFiltro} key={unFiltro.label}/>
                            ))
                        }
                        <hr />
                        <h3>{listaRecetasFiltradas.length} receta(s) encontradas</h3>
                    </section>
                    <section className={styles.recetasContainer}>
                        {listaRecetasFiltradas.length === 0 ?
                            <h2>No existen recetas con los filtros ingresados</h2> :
                            (listaRecetasFiltradas.map((unaReceta) => (
                                <CardDinamica
                                    {...cardData}

                                    //Estos son los que hay que modificar segun la data a mostrar  
                                    key={unaReceta.numeroOrden}                   //La key del componente (debe ser un valor único!!)
                                    data={unaReceta}                        //Elemento actual en la iteración del map
                                    header={'N° Orden ' + unaReceta.numeroOrden}  //El título de la card  
                                />
                            )))}
                    </section>
                </div>
            </div>
        </>
    );
};

export default ConsultarRecetas;