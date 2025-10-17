import styles from './EstadoSolicitud.module.css';

const EstadoSolicitud = (props) => {
    return (
        <div className={styles.estadoSolicitud}>
            <p className={styles.tituloEstadoSolicitud}>{props.titulo}:</p>
            <div className={styles.containerCantidadEstadoSolicitud}>
                <p className={styles.cantidadEstadoSolicitud}>{props.cantidad}</p>
                <div className={`${styles.linea} ${styles[props.estado]}`}></div>
            </div>
        </div>
    );
};

export default EstadoSolicitud;