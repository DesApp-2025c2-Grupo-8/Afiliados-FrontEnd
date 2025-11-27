import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { PiPulse } from 'react-icons/pi';

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
    // {
        // ruta: '/contacto',
        // nombre: 'Contacto'
    // },
    {
        ruta: '/perfil',
        nombre: 'Perfil'
    }
];

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && menuOpen) {
                setMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [menuOpen]);

    return (
        <header className={styles.header}>
            <nav className={styles.navegacionPrincipal}>
                <Link to="/">
                    <img src={logo} alt="Logo" className={styles.logo} onClick={() => setMenuOpen(false)}/>
                </Link>
                <div className={styles.navMenus}>
                    <ul className={styles.navLinks + " " + styles.navMain}>
                        {RUTAS.map( (unaRuta, idx) => (
                            <li key={idx}><Link  key={idx} className={styles.link} to={unaRuta.ruta}>{unaRuta.nombre}</Link></li>
                        ) )}
                    </ul>
                </div>

                <button className={styles.burgerMenuBtn} onClick={toggleMenu}>
                    {!menuOpen ? <FaBars />  : <AiOutlineClose /> }
                </button>
                <div className={styles.burgerMenu + " " + (menuOpen ? styles.show : "")}>
                    <ul className={styles.navLinks}>
                        {RUTAS.map( (unaRuta, idx) => (
                            <li key={idx}><Link onClick={() => setMenuOpen(false)} key={idx} className={styles.link} to={unaRuta.ruta}>{unaRuta.nombre}</Link></li>
                        ) )}
                    </ul>
                </div>

            </nav>
        </header>
    );
}

export default Header;