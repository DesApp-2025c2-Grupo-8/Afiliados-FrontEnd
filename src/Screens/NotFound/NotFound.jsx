import React, { useEffect } from 'react';
import { useAfiliadoDatos } from "../../context/AfiliadoDatos";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const { dataAfiliado, setDataAfiliado } = useAfiliadoDatos();
    const navigate = useNavigate();
    useEffect(() => {
        document.title = 'Error 404 - Medicina Integral'

        if (!dataAfiliado) {
            navigate("/login");
        } 
    }, [])

    return(
        <>
            <h1>ERROR 404</h1>
            <h2>Lo sentimos, la página a la que ha intentado ingresar no existe.</h2>
        </>
    )
}

export default NotFound;