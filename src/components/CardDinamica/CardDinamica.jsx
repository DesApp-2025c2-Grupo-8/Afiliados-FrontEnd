import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './CardDinamica.module.css';
import { FiDownload } from 'react-icons/fi';
import { jsPDF } from "jspdf";

const CardDinamica = (props) => {

  const { data, header, color, camposCard, tieneBotonDescarga, tieneContenidoExtra } = props;

  const getValor = (obj, path) => {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
  };

  const generarPDF = () => {
    // console.log(data);
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(header, 10, y);
    y += 10;

    doc.setLineWidth(0.5);
    doc.line(10, y, 200, y);
    y += 10;

    camposCard.forEach(({ campo, propiedad, esFecha }) => {
      const valor = esFecha
        ? new Date(getValor(data, propiedad)).toLocaleDateString('es-AR')
        : getValor(data, propiedad);

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(`${campo}:`, 10, y);
      doc.setFont("helvetica", "normal");
      doc.text(`${valor}`, 50, y);
      y += 8;
    });

    const numero = data.numeroOrden? data.numeroOrden : data.numeroAutorizacion
    const nombreArchivo = `${data.integrante + ' - ' + numero || 'comprobante'}.pdf`;
    doc.save(nombreArchivo);
  };


  return (
    <Card className={styles.cardBox}>
      {/* {console.log(props)} */}
      <Card.Header className={`${styles.cardHeader} ${color}`}>
        {header}
      </Card.Header>
      <Card.Body className={styles.cardBodyDinamica}>
        <div>

        {camposCard.map(({ campo, propiedad, esFecha }) => (
          <Card.Text className={styles.cardTexto} key={propiedad}>
            {/* {console.log(data[propiedad])} */}
            <strong>{campo}: </strong>
        
            {esFecha 
                ? new Date(getValor(data, propiedad)).toLocaleDateString('es-AR')
                : getValor(data, propiedad)
            }

          </Card.Text>
        ))}
        </div>

        {tieneBotonDescarga && (
          <div className={styles.botonBox}>
            <p className={styles.botonPDF} onClick={generarPDF}><FiDownload style={{ marginRight: '10px' }} />Descargar</p>
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