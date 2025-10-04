import CardTurnoProximo from "../CardTurnoProximo/CardTurnoProximo";
import "./Turnos.css"
import turnos from "../../db/turnos";
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from "react-router-dom";

const Turnos = (props) => {
    return (
        <aside className='proximos-turnos-container'>
            <h2 className="proximos-turnos-titulo">Próximos turnos</h2>
            <div className="proximos-turnos">
                {turnos.map((item, idx) => 
                <CardTurnoProximo key={idx + item.prestador} fecha={item.fecha} hora={item.hora} prestador={item.prestador} tipoConsulta={item.tipoConsulta}/>)}
                
                <Link className="btn-nuevo-turno"> <AiOutlinePlus/> Solicitar nuevo turno</Link>
            </div>
        </aside>
    );
};

export default Turnos;