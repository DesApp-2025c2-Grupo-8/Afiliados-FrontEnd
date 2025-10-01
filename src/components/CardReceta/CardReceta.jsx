import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CardReceta.css'

const CardReceta = ({receta}) => {
  return (
    <Card className='card-box'>
      <Card.Header className='card-header'>
        Orden N° {receta.orden}
      </Card.Header>
      <Card.Body>
        <Card.Text className='card-texto'><strong>Integrante: </strong>{receta.integrante}</Card.Text>
        <Card.Text className='card-texto'><strong>Fecha de carga: </strong>{receta.fechaDeCarga}</Card.Text>
        <Card.Text className='card-texto'><strong>Medicamento: </strong>{receta.medicamento}</Card.Text>
        <Card.Text className='card-texto'><strong>Cantidad: </strong>{receta.cantidad}</Card.Text>
        <Card.Text className='card-texto'><strong>Presentación: </strong>{receta.presentacion}</Card.Text>
        <Card.Text className='card-texto'><strong>Observaciones: </strong>{receta.observaciones}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardReceta;