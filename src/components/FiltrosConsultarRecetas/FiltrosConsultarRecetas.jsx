import React, {useState} from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './FiltrosConsultarRecetas.css'

const FiltrosConsultarRecetas = (props) => {

    return (
        <>
            {/* {console.log(props)} */}
            <Form>

                <Form.Group as={Col}>
                    <Form.Label>{props.label}</Form.Label>
                    <div className="selectYBotonContainer">
                        <Form.Select value={props.valorActual} onChange={e => props.filtrarAlSeleccionar(e.target.value)}>
                            <option value="" disabled={props.defaultDesactivado}>{props.default}</option>
                            {props.opciones.map((opcion, idx) => (<option key={idx} value={opcion}>{opcion}</option>))}
                        </Form.Select>
                        <Button
                            className="botonLimpiar"
                            onClick={()=> {props.borrarFiltro();}}
                            type="button"
                        >
                            Limpiar
                        </Button>
                    </div>
                </Form.Group>
            </Form>
        </>
    )
}

export default FiltrosConsultarRecetas;