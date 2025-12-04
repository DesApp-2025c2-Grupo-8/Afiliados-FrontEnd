import CardTurnoProximo from "../CardTurnoProximo/CardTurnoProximo";
import styles from "./Turnos.module.css"
import turnos from "../../db/turnos";
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from "react-router-dom";
import { FaRegCalendarPlus } from "react-icons/fa6";

const turnosOrdenados = [...turnos].reverse()

const Turnos = (props) => {

    //ordenar los turnos por su propiedad fech y hora, donde la mas cercana es la primera
    const turnosOrdenados = [...props.turnos].sort((a, b) => {
        const fechaHoraA = new Date(a.fecha + 'T' + a.hora);
        const fechaHoraB = new Date(b.fecha + 'T' + b.hora);
        return fechaHoraA - fechaHoraB;
    });

    const turnosFuturos = turnosOrdenados.filter(turno => {
        const fechaHoraTurno = new Date(turno.fecha + 'T' + turno.hora);
        const ahora = new Date();
        return fechaHoraTurno >= ahora;
    });

    return (
        <aside className={styles.proximosTurnosContainer}>
            <h2 className={styles.proximosTurnosTitulo}>Próximos turnos</h2>
            <div className={styles.proximosTurnos}>
                {turnosFuturos.length === 0 && <p className={styles.sinTurnos}>No tenés turnos programados.</p>}
                {turnosFuturos.map((item, idx) => 
                idx < 4 &&
                <CardTurnoProximo key={idx + item.integrante} fecha={item.fecha} hora={item.hora} prestador={item.medico} tipoConsulta={item.especialidad} integrante={item.integrante}/>)}
                
                <Link className={styles.btnNuevoTurno} to={'/solicitar-turno'}> <FaRegCalendarPlus/> Solicitar nuevo turno</Link>
            </div>
        </aside>
    );
};

export default Turnos;