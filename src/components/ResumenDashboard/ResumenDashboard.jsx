import CardResumen from "../CardResumen/CardResumen"
import "./ResumenDashboard.css"

const ResumenDashboard = (props) => {
    return (
        <section className='resumen'>
            <h1 className='titulo-dashboard'>Resumen (Últimos 7 días)</h1>
            <div className='cards-resumen'>
                {props.cardsResumen.map((item, idx) => <CardResumen key={idx + item.titulo} icono={item.icono} titulo={item.titulo} cantidad={item.cantidad} estado={item.estado} />)}
            </div>
        </section>
    );
};

export default ResumenDashboard;