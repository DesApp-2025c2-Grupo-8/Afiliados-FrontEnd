import React, {useEffect} from 'react';
import ResumenDashboard from '../../components/ResumenDashboard/ResumenDashboard';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlineCheckCircle } from 'react-icons/ai';

import styles from './Home.module.css';
import AtajosSolicitudes from '../../components/AtajosSolicitudes/AtajosSolicitudes';
import Turnos from '../../components/Turnos/Turnos';
import { useNavigate } from "react-router-dom";
import { useAfiliadoDatos } from "../../context/AfiliadoDatos";

const Home = () => {
    const { dataAfiliado, setDataAfiliado } = useAfiliadoDatos();
    const numeroAfiliado = dataAfiliado?.numeroAfiliado;
    const esTitular = dataAfiliado?.rol === 'TITULAR';

    const navigate = useNavigate();

    useEffect( () => {
        document.title = 'Página principal - Medicina Integral'
        if (!dataAfiliado) {
                    navigate("/login");
                }
        }, [])


    const [turnos, setTurnos] = React.useState([]);
    const [autorizaciones, setAutorizaciones] = React.useState([]);
    const [recetas, setRecetas] = React.useState([]);
    const [reintegros, setReintegros] = React.useState([]);


    useEffect(() => {
            if (!dataAfiliado) {
                        navigate("/login");
                    }
            
            fetch('http://localhost:3000/turnos/consulta/' + dataAfiliado?.numeroAfiliado)
                .then(response => response.json())
                .then(data => {
                    setTurnos(data);
                    // console.log("turnos:");
                    // console.log(data);
                })
                .catch(error => console.log(error))

                fetch('http://localhost:3000/reintegros/' + dataAfiliado?.numeroAfiliado)
                .then(response => response.json())
                .then(data => {
                    setReintegros(data);
                    // console.log("reintegros:");
                    // console.log(data);
                })
                .catch(error => console.log(error))

                fetch('http://localhost:3000/autorizaciones/' + dataAfiliado?.numeroAfiliado)
                .then(response => response.json())
                .then(data => {
                    setAutorizaciones(data);
                    // console.log("autorizaciones:");
                    // console.log(data);
                })
                .catch(error => console.log(error))

                fetch('http://localhost:3000/recetas/' + dataAfiliado?.numeroAfiliado)
                .then(response => response.json())
                .then(data => {
                    setRecetas(data);
                    // console.log("recetas:");
                    // console.log(data);
                })
                .catch(error => console.log(error))
        }, [dataAfiliado]);



    const ultimaSemana = new Date();
    ultimaSemana.setDate(ultimaSemana.getDate() - 7);

    const normalizar = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const cantPendientesUltimaSemana = autorizaciones.filter(item => normalizar(item.estado) === 'pendiente' && new Date(item.fechaDeCarga) >= ultimaSemana ).length +
        recetas.filter(item => normalizar(item.estado) === 'pendiente' && new Date(item.fechaDeCarga) >= ultimaSemana).length +
        reintegros.filter(item => normalizar(item.estado) === 'pendiente' && new Date(item.fechaDeCarga) >= ultimaSemana).length;
    
    const cantAceptadasUltimaSemana = autorizaciones.filter(item => normalizar(item.estado) === 'aceptada' && new Date(item.fechaDeCarga) >= ultimaSemana).length +
        recetas.filter(item => normalizar(item.estado) === 'aceptada' && new Date(item.fechaDeCarga) >= ultimaSemana).length +
        reintegros.filter(item => normalizar(item.estado) === 'pago' && new Date(item.fechaDeCarga) >= ultimaSemana).length;
    
    const cantRechazadasUltimaSemana = autorizaciones.filter(item => normalizar(item.estado) === 'rechazada' && new Date(item.fechaDeCarga) >= ultimaSemana).length +
        recetas.filter(item => normalizar(item.estado) === 'rechazada' && new Date(item.fechaDeCarga) >= ultimaSemana).length +
        reintegros.filter(item => normalizar(item.estado) === 'rechazada' && new Date(item.fechaDeCarga) >= ultimaSemana).length;

    const cantObservacionUltimaSemana = autorizaciones.filter(item => normalizar(item.estado) === 'observacion' && new Date(item.fechaDeCarga) >= ultimaSemana).length +
        recetas.filter(item => normalizar(item.estado) === 'observacion' && new Date(item.fechaDeCarga) >= ultimaSemana).length +
        reintegros.filter(item => normalizar(item.estado) === 'observacion' && new Date(item.fechaDeCarga) >= ultimaSemana).length;


    const cardsResumen = [
        {
            titulo: "Pendientes de procesamiento",
            cantidad: cantPendientesUltimaSemana,
            estado: "pendiente",
            icono: "<AiOutlineClockCircle/>"
        },
        {
            titulo: "En observación",
            cantidad: cantObservacionUltimaSemana,
            estado: "observacion"
        },
        {
            titulo: "Rechazadas",
            cantidad: cantRechazadasUltimaSemana,
            estado: "rechazada"
        },
        {
            titulo: "Aceptadas",
            cantidad: cantAceptadasUltimaSemana,
            estado: "aceptada"
        },
    ]

    return (
        <div className={styles.dashboardContainer}>
            <ResumenDashboard cardsResumen={cardsResumen}/>
            <AtajosSolicitudes autorizaciones={autorizaciones} recetas={recetas} reintegros={reintegros} />
            <Turnos turnos={turnos} />
        </div>
    );
}

export default Home;