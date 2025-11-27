import CardResumen from "../CardResumen/CardResumen"
import styles from "./ResumenDashboard.module.css"

const ResumenDashboard = (props) => {


    return (
        <section className={styles.resumen}>
            <h1 className={styles.tituloDashboard}>Resumen (Últimos 7 días)</h1>
            <div className={styles.cardsResumen}>
                {props.cardsResumen.map((item, idx) => <CardResumen key={idx + item.titulo} icono={item.icono} titulo={item.titulo} cantidad={item.cantidad} estado={item.estado} />)}
            </div>
        </section>
    );
};

export default ResumenDashboard;