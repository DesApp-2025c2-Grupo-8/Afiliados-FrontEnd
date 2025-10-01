import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

const CardReceta = ({receta}) => {
  return (
    <Card className='shadow' border="info" style={{ width: '450px', maxWidth: '500px', margin: '1rem auto' }}>
      <Card.Header style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
        Orden N° {receta.orden}
      </Card.Header>
      <Card.Body>
        <Card.Title><strong>Integrante: </strong>{receta.integrante}</Card.Title>
        <Card.Text><strong>Fecha de carga: </strong>{receta.fechaDeCarga}</Card.Text>
        <Card.Text><strong>Medicamento: </strong>{receta.medicamento}</Card.Text>
        <Card.Text><strong>Cantidad: </strong>{receta.cantidad}</Card.Text>
        <Card.Text><strong>Presentación: </strong>{receta.presentacion}</Card.Text>
        <Card.Text><strong>Observaciones: </strong>{receta.observaciones}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardReceta;