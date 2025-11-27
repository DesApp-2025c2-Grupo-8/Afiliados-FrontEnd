import React, { useEffect, useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import styles from './FiltrosCards.module.css';

const FiltrosCards = (props) => {
    const [menuPlacement, setMenuPlacement] = useState("bottom");

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 630px)");

        const handleChange = (e) => {
            setMenuPlacement(e.matches ? "top" : "bottom");
        };

        handleChange(mediaQuery);

        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    const opciones = props.opciones.map(opcion => ({
        value: opcion,
        label: opcion
    }));

    const valorActual = props.valorActual
        ? { value: props.valorActual, label: props.valorActual }
        : null;

    return (
        <Form className={styles.filtroContainer}>
            <Form.Group as={Col}>
                <Form.Label htmlFor={`select-de-${props.label}`}>{props.label}</Form.Label>
                <div className={styles.selectYBotonContainer}>
                    <Select
                        options={opciones}
                        value={valorActual}
                        onChange={option => props.filtrarAlSeleccionar(option.value)}
                        placeholder={props.default}
                        menuPlacement={menuPlacement}
                        menuPortalTarget={document.body}
                        className={styles.select}
                        classNamePrefix="react-select"
                        styles={{
                            menuPortal: base => ({ ...base, zIndex: 9999 }),
                        }}
                    />

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