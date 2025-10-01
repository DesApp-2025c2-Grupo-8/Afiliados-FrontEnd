import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

import logo from '@assets/images/Titulo-Logo.svg';

const RUTAS = [
    {
        ruta: '/WIP',
        nombre: 'Turnos'
    },
    {
        ruta: '/consultar-recetas',
        nombre: 'Recetas'
    },
    {
        ruta: '/WIP',
        nombre: 'Autorizaciones'
    },
    {
        ruta: '/WIP',
        nombre: 'Reintegros'
    },
    {
        ruta: '/cartilla-prestadores',
        nombre: 'Cartilla prestadores'
    },
    {
        ruta: '/WIP',
        nombre: 'Contacto'
    },
    {
        ruta: '/WIP',
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
        <header className='header'>
            <nav className="navegacion-principal">
                <Link to="/">
                    <img src={logo} alt="Logo" className="logo" />
                </Link>
                <div className='nav-menus'>
                    <ul className="nav-links nav-main">
                        {RUTAS.map( (unaRuta, idx) => (
                            <li key={idx}><Link key={idx} className='link' to={unaRuta.ruta}>{unaRuta.nombre}</Link></li>
                        ) )}
                    </ul>
                </div>

                <button className='burger-menu-btn' onClick={toggleMenu}>
                    {!menuOpen ? <FaBars className='btn-icon' /> : <AiOutlineClose className='btn-icon' />}
                </button>
                <div className={`burger-menu ${menuOpen ? "show" : ""}`}>
                    <ul className="nav-links">
                        {RUTAS.map( (unaRuta, idx) => (
                            <li key={idx}><Link key={idx} className='link' to={unaRuta.ruta}>{unaRuta.nombre}</Link></li>
                        ) )}
                    </ul>
                </div>

            </nav>
        </header>
    );
}

export default Header;