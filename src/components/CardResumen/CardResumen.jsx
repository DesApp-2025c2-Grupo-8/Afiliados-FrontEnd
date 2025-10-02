import React from 'react';
import "./CardResumen.css"
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const CardResumen = (props) => {
    

    return (
        <article className={"card-resumen " + props.estado}>
            <div className='titulo-card-resumen'>
                {props.estado === "pendiente" ? <AiOutlineClockCircle className='icono'/> : ""}
                {props.estado === "observacion" ? <AiOutlineEye className='icono'/> : ""}
                {props.estado === "rechazada" ? <AiOutlineExclamationCircle className='icono'/> : ""}
                {props.estado === "aceptada" ? <AiOutlineCheckCircle className='icono'/> : ""}
                <span>{props.titulo}</span>
            </div>
            <div className='cantidad-card-resumen'>
                <p>{props.cantidad}</p>
            </div>
        </article>
    );
}

export default CardResumen;