import { FaRegCalendar } from "react-icons/fa6";
import styles from './CardTurnoProximo.module.css';

const CardTurnoProximo = (props) => {
    const partesFecha = props.fecha.split("-");
    const dia = partesFecha[2];
    const mes = partesFecha[1];
    const fechaFormateada = `${dia}/${mes}`;

    return (
        <article className={styles.proximoTurno}>
            <div className={styles.iconoTurno}>
                <FaRegCalendar/>
            </div>
            <div className={styles.datosTurno}>
                <h3>{fechaFormateada} - {props.hora}</h3>
                <h3>{props.integrante}</h3>
                <p>{props.prestador} - {props.tipoConsulta}</p>
            </div>
        </article>
    );
};

export default CardTurnoProximo;