import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

import logo from '@assets/images/Titulo-Logo.svg';

const Footer = () => {
    return (
        <footer className='footer'>
            <section className='container-top'>
                <div className='div-logo'>
                    <Link to="/"><img src={logo} alt="Logo" /></Link>
                </div>
                <div className='div-links'>
                    <h5 className='titulo-footer'>Links</h5>
                    <ul  className='ul-nav-footer'>
                        <li className='item-footer'><Link to="/cartilla">Cartilla Prestadores</Link></li>
                        <li className='item-footer'><Link to="/autorizaciones">Autorizaciones</Link></li>
                        <li className='item-footer'><Link to="/reintegros">Reintegros</Link></li>
                        <li className='item-footer'><Link to="/perfil">Perfil</Link></li>
                        <li className='item-footer'><Link to="/turnos">Turnos</Link></li>
                        <li className='item-footer'><Link to="/recetas">Recetas</Link></li>
                        <li className='item-footer'><Link to="/contacto">Contacto</Link></li>
                    </ul>
                </div>
                <div className='div-contacto'>
                    <h5  className='titulo-footer'>Contactanos</h5>
                    <ul className='ul-contacto'>
                        <li className='item-footer'> <p className='contacto'>Lunes - Viernes 09:00-18:00</p></li>
                        <li className='item-footer'> <p className='contacto'>Maipu 39 - Capital Federal</p></li>
                        <li className='item-footer'> <p className='contacto'>Email: medicinaintegral@gmail.com</p></li>
                        <li className='item-footer'> <p className='contacto'>Telefono: +54 11 1234-5678</p></li>
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