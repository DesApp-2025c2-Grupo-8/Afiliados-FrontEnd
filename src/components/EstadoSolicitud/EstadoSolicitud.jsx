import "./EstadoSolicitud.css"

const EstadoSolicitud = (props) => {
    return (
        <div className='estado-solicitud'>
            <p className="titulo-estado-solicitud">{props.titulo}:</p>
            <div className="container-cantidad-estado-solicitud">
                <p className="cantidad-estado-solicitud">{props.cantidad}</p>
                <div className={'linea ' + props.estado}></div>
            </div>
        </div>
    );
};

export default EstadoSolicitud;