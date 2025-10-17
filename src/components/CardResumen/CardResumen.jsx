import React from 'react';
import styles from './CardResumen.module.css';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const CardResumen = (props) => {
    

    return (
        <article className={`${styles.cardResumen} ${props.estado}`}>
            <div className={styles.tituloCardResumen}>
                {props.estado === "pendiente" ? <AiOutlineClockCircle className={styles.icono}/> : ""}
                {props.estado === "observacion" ? <AiOutlineEye className={styles.icono}/> : ""}
                {props.estado === "rechazada" ? <AiOutlineExclamationCircle className={styles.icono}/> : ""}
                {props.estado === "aceptada" ? <AiOutlineCheckCircle className={styles.icono}/> : ""}
                <span>{props.titulo}</span>
            </div>
            <div className={styles.cantidadCardResumen}>
                <p>{props.cantidad}</p>
            </div>
        </article>
    );
}

export default CardResumen;
