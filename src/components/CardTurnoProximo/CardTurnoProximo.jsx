import { BsCalendar4 } from 'react-icons/bs';
import styles from './CardTurnoProximo.module.css';

const CardTurnoProximo = (props) => {
    const partesFecha = props.fecha.split("-");
    const dia = partesFecha[2];
    const mes = partesFecha[1];
    const fechaFormateada = `${dia}/${mes}`;

    return (
        <article className={styles.proximoTurno}>
            <div className={styles.iconoTurno}>
                <BsCalendar4/>
            </div>
            <div className={styles.datosTurno}>
                <h3>{fechaFormateada} - {props.hora} - {props.integrante}</h3>
                <p>{props.prestador} - {props.tipoConsulta}</p>
            </div>
        </article>
    );
};

export default CardTurnoProximo;