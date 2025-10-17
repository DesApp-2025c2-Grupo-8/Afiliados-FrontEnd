import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function FormGenerico({
  children,
  handleSubmit,
  confirmar,
  cancelar
}) {
  return(
    <Form onSubmit={handleSubmit}>
      {children}

      <div className="d-flex justify-content-center gap-3 mt-3">
        <Button type="button" onClick={cancelar} style={{backgroundColor: '#E64F4F', border: 'none'}}>Cancelar</Button>
        <Button type="button" onClick={confirmar} style={{backgroundColor: '#24979B', border: 'none'}}>Confirmar</Button>
      </div>
    </Form>
  )
}

export default FormGenerico;