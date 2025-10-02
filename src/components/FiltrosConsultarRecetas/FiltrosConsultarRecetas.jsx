import React, {useState} from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const FiltrosConsultarRecetas = (props) => {

    return (
        <>
            {console.log(props)}
            <Form>

                <Form.Group as={Col}>
                    <Form.Label>{props.label}</Form.Label>
                    <div style={{ display: 'flex', width: '350px' }}>
                        <Form.Select value={props.valorActual} onChange={e => props.filtrarAlSeleccionar(e.target.value)}>
                            <option value="" disabled>{`Seleccione ${props.default}...`}</option>
                            {props.opciones.map((opcion, idx) => (<option key={idx} value={opcion}>{opcion}</option>))}
                        </Form.Select>
                        <Button
                            onClick={()=> {props.borrarFiltro();}}
                            type="button"
                            style={{ backgroundColor: '#E64F4F', border: 'none', marginLeft: '10px' }}>
                            Borrar
                        </Button>
                    </div>
                </Form.Group>
            </Form>
        </>
    )
}

export default FiltrosConsultarRecetas;