import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardDinamica from '../../components/CardDinamica/CardDinamica';
import styles from './ConsultarRecetas.module.css'
import SearchBarCards from '../../components/SearchBarCards/SearchBarCards';
import FiltrosCards from '../../components/FiltrosCards/FiltrosCards';
import { MdCancel } from 'react-icons/md';
import { BsClipboard2Plus } from 'react-icons/bs';
import { useAfiliadoDatos } from '../../context/AfiliadoDatos';
import { useNavigate } from "react-router-dom";

const estadosOpcionesIniciales = ['Aceptada', 'Pendiente', 'Rechazada'];
const periodosOpciones = ['Último año', 'Últimos seis meses', 'Últimos tres meses', 'Último mes', 'Últimas dos semanas', 'Última semana'];

const cardData = {
    // Color: Clase para el color del header de la Card, en idex.css
    // camposCard: va toda la informacion que queremos mostrar en la tarjeta, espera un nombre y un valor se mustran por campo o fila de la card
    camposCard: [ 
        // Campo: es el nombre en negrita de la fila
        // Propiedad: es la cual queremos mostrar el valor. Parecido a ej: cliente.nombre donde pasamos 'nombre'
        { campo: 'Estado', propiedad: 'estado' },
        { campo: 'Integrante', propiedad: 'integrante' },
        { campo: 'Fecha de carga', propiedad: 'fechaDeCarga', esFecha: true },
        { campo: 'Medicamento', propiedad: 'medicamento' },
        { campo: 'Cantidad', propiedad: 'cantidad' },
        { campo: 'Presentación', propiedad: 'presentacion' },
        { campo: 'Observaciones', propiedad: 'observaciones' }
    ],
    //tieneBotonDescarga: true Solo es necesario agregarse si la tarjeta tiene boton de descarga, de lo contrario puede omitirse y borrarse.
    tieneBotonDescarga: true 
};

const ConsultarRecetas = () => {
    
    const navigate = useNavigate();
    const { dataAfiliado, setDataAfiliado } = useAfiliadoDatos();
    
    useEffect(() => {
        document.title = 'Consulta de Recetas - Medicina Integral'
        if (!dataAfiliado) {
                    navigate("/login");
                }
        
        fetch('http://localhost:3000/recetas/' + dataAfiliado?.numeroAfiliado)
            .then(response => response.json())
            .then(data => {
                const recetasOrdenadas = [...data].reverse();
                setListaRecetas(recetasOrdenadas);
                setListaRecetasFiltradas(recetasOrdenadas);
                const integrantesIniciales = [...new Set(data.map(r => r.integrante))].sort();
                setIntegrantesOpcionesIniciales(integrantesIniciales)
                setIntegrantesOpciones(integrantesIniciales);
                const presentacionesIniciales = [...new Set(data.map(r => r.presentacion))].sort();
                setPresentacionesOpcionesIniciales(presentacionesIniciales)
                setPresentacionesOpciones(presentacionesIniciales);
            })
            .catch(error => console.log(error))
    }, [dataAfiliado]);

    const [listaRecetas, setListaRecetas] = useState([]);
    const [listaRecetasFiltradas, setListaRecetasFiltradas] = useState([]);
    const [filtroEstado, setFiltroEstado] = useState('');
    const [filtroMedicamento, setFiltroMedicamento] = useState('');
    const [filtroIntegrante, setFiltroIntegrante] = useState('');
    const [filtroPresentacion, setFiltroPresentacion] = useState('');
    const [filtroPeriodo, setFiltroPeriodo] = useState('');

    const [estadosOpciones, setEstadosOpciones] = useState(estadosOpcionesIniciales);
    const [integrantesOpcionesIniciales, setIntegrantesOpcionesIniciales] = useState([]);
    const [presentacionesOpcionesIniciales, setPresentacionesOpcionesIniciales] = useState([]);
    const [integrantesOpciones, setIntegrantesOpciones] = useState([]);
    const [presentacionesOpciones, setPresentacionesOpciones] = useState([]);

    const filtrarPorEstado = (unEstado) => {
        setFiltroEstado(unEstado);
        aplicarFiltros(unEstado, filtroMedicamento, filtroIntegrante, filtroPresentacion, filtroPeriodo);
    };

    const filtrarPorMedicamento = (unMedicamento) => {
        setFiltroMedicamento(unMedicamento);
        aplicarFiltros(filtroEstado, unMedicamento, filtroIntegrante, filtroPresentacion, filtroPeriodo);
    };

    const filtrarPorIntegrante = (unIntegrante) => {
        setFiltroIntegrante(unIntegrante);
        aplicarFiltros(filtroEstado, filtroMedicamento, unIntegrante, filtroPresentacion, filtroPeriodo);
    };

    const filtrarPorPresentacion = (unaPresentacion) => {
        setFiltroPresentacion(unaPresentacion);
        aplicarFiltros(filtroEstado, filtroMedicamento, filtroIntegrante, unaPresentacion, filtroPeriodo);
    };

    const filtrarPorPeriodo = (unPeriodo) => {
        setFiltroPeriodo(unPeriodo);
        aplicarFiltros(filtroEstado, filtroMedicamento, filtroIntegrante, filtroPresentacion, unPeriodo);
    }

    const aplicarFiltros = (unEstado, unMedicamento, unIntegrante, unaPresentacion, unPeriodo) => {
        let listaRecetasAFiltrar = [...listaRecetas];
        
        if (unEstado) {
            listaRecetasAFiltrar = listaRecetasAFiltrar.filter(r => r.estado === unEstado);
        };

        if (unMedicamento) {
            listaRecetasAFiltrar = listaRecetasAFiltrar.filter(r => r.medicamento.toLowerCase().includes(unMedicamento.toLowerCase()));
        };

        if (unIntegrante) {
            listaRecetasAFiltrar = listaRecetasAFiltrar.filter(r => r.integrante === unIntegrante);
        };

        if (unaPresentacion) {
            listaRecetasAFiltrar = listaRecetasAFiltrar.filter(r => r.presentacion === unaPresentacion);
        };

        if (unPeriodo && unPeriodo !== 'TODO') {
            const fechaDelPeriodoSeleccionado =  obtenerFechaDelPeriodoSeleccionado(unPeriodo);
            listaRecetasAFiltrar = listaRecetasAFiltrar.filter(r => r.fechaDeCarga >= fechaDelPeriodoSeleccionado);
            // console.log('Cantidad de elem filtrados en el periodo seleccionado: ', listaRecetasAFiltrar.length);
        };

        setListaRecetasFiltradas(listaRecetasAFiltrar);

        const opcionesEstado = listaRecetas.filter(r => 
            (!unMedicamento || r.medicamento.toLowerCase().includes(unMedicamento.toLowerCase())) &&
            (!unaPresentacion || r.presentacion === unaPresentacion) &&
            (!unIntegrante || r.integrante === unIntegrante)
        ).map(r => r.estado);

        const opcionesIntegrante = listaRecetas.filter(r =>
            (!unEstado || r.estado === unEstado) &&
            (!unMedicamento || r.medicamento.toLowerCase().includes(unMedicamento.toLowerCase())) &&
            (!unaPresentacion || r.presentacion === unaPresentacion)
        ).map(r => r.integrante);

        const opcionesPresentacion = listaRecetas.filter(r =>
            (!unEstado || r.estado === unEstado) &&
            (!unMedicamento || r.medicamento.toLowerCase().includes(unMedicamento.toLowerCase())) &&
            (!unIntegrante || r.integrante === unIntegrante)
        ).map(r => r.presentacion);

        setEstadosOpciones([...new Set(opcionesEstado)]);
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
        let fechaPeriodoFiltro = new Date(fechaActual);

        //['Último año', 'Últimos seis meses', 'Últimos tres meses', 'Último mes', 'Últimas dos semanas', 'Última semana'] => 'TODO'

        //Discutir esto:
            //Por el momento esas son las opciones, si llegamos a considerar agregar más 
            //despues cuando hagamos la conexión con la BD implementar los meses como parametrizados? para evitar crear 500 casos
            //Si ese es el caso deberia cambiar la logica y recibir como paramtro Año, Mes, Semana, Dias? y cantidad

        switch (unPeriodo) {
            case 'Último año':
                fechaPeriodoFiltro.setFullYear(fechaPeriodoFiltro.getFullYear() - 1);
                break;
            case 'Últimos seis meses':
                fechaPeriodoFiltro.setMonth(fechaPeriodoFiltro.getMonth() - 6);
                break;
            case 'Últimos tres meses':
                fechaPeriodoFiltro.setMonth(fechaPeriodoFiltro.getMonth() - 3);
                break;
            case 'Último mes':
                fechaPeriodoFiltro.setMonth(fechaPeriodoFiltro.getMonth() - 1);
                break;
            case 'Últimas dos semanas':
                fechaPeriodoFiltro.setDate(fechaPeriodoFiltro.getDate() - 14);
                break;
            case 'Última semana':
                fechaPeriodoFiltro.setDate(fechaPeriodoFiltro.getDate() - 7);
                break;
        }
        
        // console.log(fechaPeriodoFiltro.toISOString());
        return fechaPeriodoFiltro.toISOString().slice(0,10);
    };

    const limpiarFiltroEstado = () => {
        setFiltroEstado('');
        aplicarFiltros('', filtroMedicamento, filtroIntegrante, filtroPresentacion, filtroPeriodo)
    }

    const limpiarFiltroMedicamento = () => {
        setFiltroMedicamento('');
        aplicarFiltros(filtroEstado,'', filtroIntegrante, filtroPresentacion, filtroPeriodo);
    };

    const limpiarFiltroIntegrante = () => {
        setFiltroIntegrante('');
        aplicarFiltros(filtroEstado, filtroMedicamento, '', filtroPresentacion, filtroPeriodo);
    };

    const limpiarFiltroPresentacion = () => {
        setFiltroPresentacion('');
        aplicarFiltros(filtroEstado, filtroMedicamento, filtroIntegrante, '', filtroPeriodo);
    };

    const limpiarFiltroPeriodo = () => {
        setFiltroPeriodo('');
        aplicarFiltros(filtroEstado, filtroMedicamento, filtroIntegrante, filtroPresentacion, '');
    };

    const limpiarFiltros = () => {
        setListaRecetasFiltradas(listaRecetas);
        setFiltroEstado('');
        setFiltroMedicamento('');
        setFiltroIntegrante('');
        setFiltroPresentacion('');
        setFiltroPeriodo('');
        setIntegrantesOpciones(integrantesOpcionesIniciales);
        setPresentacionesOpciones(presentacionesOpcionesIniciales);
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

    const colorSegunEstado = (unEstado) => {
        let resultado = '';
        switch (unEstado){
            case 'Aceptada':
                resultado = 'observacion';
                break;
            case 'Rechazada':
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
                                    header={'N° Orden: ' + unaReceta.numeroOrden}  //El título de la card
                                    color={colorSegunEstado(unaReceta.estado)}  
                                    tieneBotonDescarga={unaReceta.estado === 'Aceptada'}
                                />
                            )))}
                    </section>
                </div>
            </div>
        </>
    );
};

export default ConsultarRecetas;