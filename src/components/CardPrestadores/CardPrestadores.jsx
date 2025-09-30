import Card from 'react-bootstrap/Card';
import './CardPrestadores.css'

const CardPrestadores = ({ prestador }) => {
    return (
        <Card className='card-prestador'>
            <Card.Header>
                {prestador.nombre}
            </Card.Header>
            <Card.Body>
                <Card.Title><strong>Dirección: </strong><b>{prestador.direccion}</b></Card.Title>
                <Card.Text><strong>Teléfonos: </strong>{prestador.telefono}</Card.Text>
                <Card.Text><strong>Especialidad: </strong>{prestador.especialidad}</Card.Text>
                <Card.Text><strong>Tipo de prestador: </strong>{prestador.tipoDePrestador}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default CardPrestadores;