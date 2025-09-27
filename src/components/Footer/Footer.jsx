import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

import logo from '@assets/images/Titulo-Logo.svg';

const Footer = () => {
    return (
        <footer className='footer2'>
            <section className='container-top'>
                <div className='div-logo'>
                    <Link to="/"><img src={logo} alt="Logo" /></Link>
                </div>
                <div className='div-links'>
                    <h5>Links</h5>
                    <ul>
                        <li><Link to="/cartilla">Cartilla Prestadores</Link></li>
                        <li><Link to="/autorizaciones">Autorizaciones</Link></li>
                        <li><Link to="/reintegros">Reintegros</Link></li>
                        <li><Link to="/perfil">Perfil</Link></li>
                        <li><Link to="/turnos">Turnos</Link></li>
                        <li><Link to="/recetas">Recetas</Link></li>
                        <li><Link to="/contacto">Contacto</Link></li>
                    </ul>
                </div>
                <div className='div-contacto'>
                    <h5>Contactanos</h5>
                    <ul>
                        <li> <p>Lunes - Viernes 09:00-18:00</p></li>
                        <li> <p>Maipu 39 - Capital Federal</p></li>
                        <li> <p>Email: medicinaintegral@gmail.com</p></li>
                        <li> <p>Telefono: +54 11 1234-5678</p></li>
                    </ul>
                </div>

            </section>

            <section className='container-bottom'>
                <p>Copyright @2025 - Todos los derechos reservados</p>
                <p>Desarrollado por Grupo 8</p>
            </section>


        </footer>

    );
}

export default Footer;