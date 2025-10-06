import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CardDinamica.css'
import { FiDownload } from 'react-icons/fi';

const CardDinamica = (props) => {
  const { data, header, color, camposCard, tieneBotonDescarga } = props;

  return (
    <Card className='card-box'>
      {/* {console.log(props)} */}
      <Card.Header className={`card-header ${color}`}>
        {header}
      </Card.Header>
      <Card.Body>
        {camposCard.map(({ campo, propiedad }) => (
          <Card.Text className='card-texto' key={propiedad}>
            {/* {console.log(data[key])} */}
            <strong>{campo}: </strong>{data[propiedad]}
          </Card.Text>
        ))}

        {tieneBotonDescarga && (
          <div className='boton-box'>
            <p className='botonPDF'><FiDownload style={{ marginRight: '10px' }} />Descargar</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default CardDinamica;