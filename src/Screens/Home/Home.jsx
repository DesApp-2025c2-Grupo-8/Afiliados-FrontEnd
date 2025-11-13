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
    const navigate = useNavigate();
    useEffect( () => {
        document.title = 'Medicina Integral'
        if (!dataAfiliado) {
                    navigate("/login");
                }
        }, [])
    const cardsResumen = [
        {
            titulo: "Pendientes de procesamiento",
            cantidad: 1,
            estado: "pendiente",
            icono: "<AiOutlineClockCircle/>"
        },
        {
            titulo: "En observación",
            cantidad: 0,
            estado: "observacion"
        },
        {
            titulo: "Rechazadas",
            cantidad: 2,
            estado: "rechazada"
        },
        {
            titulo: "Aceptadas",
            cantidad: 5,
            estado: "aceptada"
        },
    ]

    return (
        <div className={styles.dashboardContainer}>
            <ResumenDashboard cardsResumen={cardsResumen}/>
            <AtajosSolicitudes/>
            <Turnos/>
        </div>
    );
}

export default Home;