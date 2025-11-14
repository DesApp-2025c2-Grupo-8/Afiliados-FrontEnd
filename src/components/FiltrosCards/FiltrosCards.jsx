import React from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './FiltrosCards.module.css';

const FiltrosCards = (props) => {
    
    return (
        <Form>
            <Form.Group as={Col}>
                <Form.Label htmlFor={`select-de-${props.label}`}>{props.label}</Form.Label>
                <div className={styles.selectYBotonContainer}>
                    <Form.Select id={`select-de-${props.label}`} className={styles.select} value={props.valorActual} onChange={e => props.filtrarAlSeleccionar(e.target.value)}>
                        <option value="" disabled={props.defaultDesactivado}>{props.default}</option>
                        {props.opciones.map((opcion, idx) => (<option key={idx} value={opcion}>{opcion}</option>))}
                    </Form.Select>
                    <Button
                        className={styles.botonLimpiar}
                        onClick={() => { props.borrarFiltro(); }}
                        type="button"
                    >
                        Limpiar
                    </Button>
                </div>
            </Form.Group>
        </Form>
    )
}

export default FiltrosCards;