import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './CardDinamica.module.css';
import { FiDownload } from 'react-icons/fi';

const CardDinamica = (props) => {
  const { data, header, color, camposCard, tieneBotonDescarga, tieneContenidoExtra } = props;

  return (
    <Card className={styles.cardBox}>
      {/* {console.log(props)} */}
      <Card.Header className={`${styles.cardHeader} ${color}`}>
        {header}
      </Card.Header>
      <Card.Body>
        {camposCard.map(({ campo, propiedad }) => (
          <Card.Text className={styles.cardTexto} key={propiedad}>
            {/* {console.log(data[key])} */}
            <strong>{campo}: </strong>{data[propiedad]}
          </Card.Text>
        ))}

        {tieneBotonDescarga && (
          <div className={styles.botonBox}>
            <p className={styles.botonPDF}><FiDownload style={{ marginRight: '10px' }} />Descargar</p>
          </div>
        )}

        {tieneContenidoExtra && (
          <div className={styles.tieneContenidoExtra}>
            {tieneContenidoExtra}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default CardDinamica;