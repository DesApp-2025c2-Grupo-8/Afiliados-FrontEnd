import CardTurnoProximo from "../CardTurnoProximo/CardTurnoProximo";
import styles from "./Turnos.module.css";
import turnos from "../../db/turnos";
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from "react-router-dom";

const turnosOrdenados = [...turnos].reverse()

const Turnos = (props) => {
    return (
        <aside className={styles.proximosTurnosContainer}>
            <h2 className={styles.proximosTurnosTitulo}>Próximos turnos</h2>
            <div className={styles.proximosTurnos}>
                {turnosOrdenados.map((item, idx) => 
                idx < 5 &&
                <CardTurnoProximo key={idx + item.prestador} fecha={item.fecha} hora={item.hora} prestador={item.prestador} tipoConsulta={item.tipoConsulta}/>)}
                
                <Link className={styles.btnNuevoTurno} to={'/solicitar-turno'}> <AiOutlinePlus/> Solicitar nuevo turno</Link>
            </div>
        </aside>
    );
};

export default Turnos;