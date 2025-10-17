import { BsCalendar4 } from 'react-icons/bs';
import "./CardTurnoProximo.css"

const CardTurnoProximo = (props) => {
    const partesFecha = props.fecha.split("-");
    const dia = partesFecha[2];
    const mes = partesFecha[1];
    const fechaFormateada = `${dia}/${mes}`;

    return (
        <article className="proximo-turno">
            <div className="icono-turno">
                <BsCalendar4/>
            </div>
            <div className="datos-turno">
                <h3>{fechaFormateada} - {props.hora}</h3>
                <p>{props.prestador} - {props.tipoConsulta}</p>
            </div>
        </article>
    );
};

export default CardTurnoProximo;