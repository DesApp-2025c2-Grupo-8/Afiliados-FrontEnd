import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

import logo from '@assets/images/Titulo-Logo.svg';

const RUTAS = [
    {
        ruta: '/consultar-turnos',
        nombre: 'Turnos'
    },
    {
        ruta: '/consultar-recetas',
        nombre: 'Recetas'
    },
    {
        ruta: '/consultar-autorizaciones',
        nombre: 'Autorizaciones'
    },
    {
        ruta: '/consultar-reintegros',
        nombre: 'Reintegros'
    },
    {
        ruta: '/cartilla-prestadores',
        nombre: 'Cartilla prestadores'
    },
    {
        ruta: '/contacto',
        nombre: 'Contacto'
    },
    {
        ruta: '/perfil',
        nombre: 'Perfil'
    }
];

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <section className={styles.containerTop}>
                <div className={styles.divLogo}>
                    <Link to="/"><img src={logo} alt="Logo" /></Link>
                </div>
                <div className={styles.divLinks}>
                    <h5 className={styles.tituloFooter}>Links</h5>
                    <ul className={styles.ulNavFooter}>
                        {RUTAS.map( (unaRuta, idx) => (
                            <li key={idx} className={styles.itemFooter}><Link key={idx} to={unaRuta.ruta}>{unaRuta.nombre}</Link></li>
                        ) )}
                    </ul>
                </div>
                <div className={styles.divContacto}>
                    <h5 className={styles.tituloFooter}>Contactanos</h5>
                    <ul className={styles.ulContacto}>
                        <li className={styles.itemFooter}> <p className={styles.contacto}>Lunes - Viernes 09:00-18:00</p></li>
                        <li className={styles.itemFooter}> <p className={styles.contacto}>Maipu 39 - Capital Federal</p></li>
                        <li className={styles.itemFooter}> <p className={styles.contacto}>Email: medicinaintegral@gmail.com</p></li>
                        <li className={styles.itemFooter}> <p className={styles.contacto}>Telefono: +54 11 1234-5678</p></li>
                    </ul>
                </div>
            </section>

            <section className={styles.containerBottom}>
                <p>Copyright @2025 - Todos los derechos reservados</p>
                <p>Desarrollado por Grupo 8</p>
            </section>
        </footer>
    );
}

export default Footer;