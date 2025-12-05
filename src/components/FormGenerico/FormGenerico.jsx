import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import styles from './FormGenerico.module.css'

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
        <Button type="button" onClick={cancelar} className={styles.botonCancelar}>Cancelar</Button>
        <Button type="button" onClick={confirmar} className={styles.botonSiguiente}>Confirmar</Button>
      </div>
    </Form>
  )
}

export default FormGenerico;