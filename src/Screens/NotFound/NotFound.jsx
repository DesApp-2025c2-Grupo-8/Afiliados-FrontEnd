import React, { useEffect } from 'react'; 

const NotFound = () => {
    useEffect( () => {
        document.title = 'Error 404 - Medicina Integral'
    }, [])

    return(
        <>
            <h1>ERROR 404</h1>
            <h2>Lo sentimos, la página a la que ha intentado ingresar no existe.</h2>
        </>
    )
}

export default NotFound;