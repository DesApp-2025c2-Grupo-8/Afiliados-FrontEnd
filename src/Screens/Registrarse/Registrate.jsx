import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Registrate.module.css"; 
import { useAfiliadoDatos } from "../../context/AfiliadoDatos";

const Registro = () => {
  const navigate = useNavigate();
  const { dataAfiliado } = useAfiliadoDatos();

  const [formData, setFormData] = useState({
    fechaNacimiento: "",
    tipoDocumento: "",
    numeroDocumento: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: ""
  });

  const [mensaje, setMensaje] = useState("");

  const [errorTipoDoc, setErrorTipoDoc] = useState(false);
  const [errorNumDoc, setErrorNumDoc] = useState(false);
  const [errorNumDocLength, setErrorNumDocLength] = useState(false);
  const [errorFechaNac, setErrorFechaNac] = useState(false);
  const [errorEdad, setErrorEdad] = useState(false); 
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailFormat, setErrorEmailFormat] = useState(false);
  const [errorTelefono, setErrorTelefono] = useState(false);
  const [errorTelefonoLength, setErrorTelefonoLength] = useState(false); 
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPasswordLength, setErrorPasswordLength] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [errorPasswordCoincidencia, setErrorPasswordCoincidencia] = useState(false);



  useEffect(() => {
    document.title = "Registrarse - Medicina Integral";
    //si el ususario esta iniciado (hay datos en el context) redirigir al home
    if (dataAfiliado) {
      navigate("/");
    }
  }, [dataAfiliado, navigate]);

  const calcularEdad = (fechaNac) =>{
    const hoy = new Date()
    const fechaNacimiento = new Date(fechaNac);

    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
    const diferencia = hoy.getMonth() - fechaNacimiento.getMonth();

    if(diferencia < 0 || (diferencia === 0 && hoy.getDate()< fechaNacimiento.getDate())){
      edad = edad-1
    }

    return edad;
  }

  const validarMail = (email) =>{
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email); 
  }

  const validarTelefono = (telefono) =>{
    return telefono.length >= 8 && telefono.length <=15;
  }

  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    }, console.log(formData));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setMensaje("");

  if(!formData.tipoDocumento){
    setErrorTipoDoc(true)
    return;
  }else{
    setErrorTipoDoc(false)
  }

  if(!formData.numeroDocumento) {
    setErrorNumDoc(true)
    return;
  }else{
    setErrorNumDoc(false);
  }

  if(formData.numeroDocumento.length <6 || formData.numeroDocumento.length>10){
    setErrorNumDocLength(true)
    return;
  }else{
    setErrorNumDocLength(false)
  }

  if(!formData.fechaNacimiento){
    setErrorFechaNac(true)
    return;
  }else{
    setErrorFechaNac(false)
  }

  //verificar que sea mayor de 15 años
  if (new Date().getFullYear() - new Date(formData.fechaNacimiento).getFullYear() <= 16) {
    //setMensaje("Para registrarte tenes que tener 16 años o mas.");
    setErrorEdad(true)
    return;
  }else{
    setErrorEdad(false)
  }

  if(!formData.email){
    setErrorEmail(true)
    return;
  }else{
    setErrorEmail(false)
  }

  if(!validarMail(formData.email)){
    setErrorEmailFormat(true)
    return;
  }else{
    setErrorEmailFormat(false)
  }

  if(!formData.telefono){
    setErrorTelefono(true)
    return;
  }else{
    setErrorTelefono(false)
  }

  if(!validarTelefono(formData.telefono)){
    setErrorTelefonoLength(true)
    return;
  }else{
    setErrorTelefonoLength(false)
  }


  if(!formData.password){
    setErrorPassword(true)
    return;
  }else{
    setErrorPassword(false)
  }

  if(formData.password.length <5){
    setErrorPasswordLength(true)
    return;
  }else{
    setErrorPasswordLength(false)
  }

  if(!formData.confirmPassword){
    setErrorConfirmPassword(true)
    return;
  }else{
    setErrorConfirmPassword(false)
  }

  if (formData.password !== formData.confirmPassword) {
    //setMensaje("Las contraseñas no coinciden.");
    setErrorPasswordCoincidencia(true)
    return;
  }else{
    setErrorPasswordCoincidencia(false)
  }

  //Crear una copia sin `confirmPassword`
  const { confirmPassword, ...dataToSend } = formData;

  const fechaNac = new Date(dataToSend.fechaNacimiento);
  dataToSend.fechaNacimiento = fechaNac.setHours(fechaNac.getHours()+3);
  console.log("Fecha de Nacimiento ajustada:", dataToSend.fechaNacimiento);
  // dataToSend.fechaNacimiento = dataToSend.fechaNacimiento;
  console.log("Datos a enviar:", dataToSend);

  try {
    const response = await fetch("http://localhost:3000/auth/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend)
    });

    const result = await response.json();

    if (response.ok) {
      setMensaje("Registro exitoso. Redirigiendo al login...");
      navigate("/login")
    } else {
      setMensaje(result.message || "Error al registrarse.");
    }
  } catch (error) {
    console.error("Error:", error);
    setMensaje("Error al conectar con el servidor.");
  }
};


  return (
    <div className={styles.registroContainer}>
      <Row className={styles.justifyContentCenter}>
        <Col className={styles.colCenter}>
          <div className={styles.registroBox}>
            <h2>Registrate</h2>

            <Form onSubmit={handleSubmit} className={styles.formRegistro}>

              <Form.Group controlId="tipoDocumento" className={styles.formGroup}>
                <Form.Label>Tipo Documento</Form.Label>
                <Form.Select
                  value={formData.tipoDocumento}
                  onChange={handleChange}
                >
                  <option value="">Seleccione</option>
                  <option value="DNI">DNI</option>
                  <option value="PASAPORTE">Pasaporte</option>
                  <option value="LC">Libreta Cívica</option>
                </Form.Select>
                {errorTipoDoc && <p className={styles.errorForm}>Por favor seleccione un Tipo de Documento</p>}
              </Form.Group>

              <Form.Group controlId="numeroDocumento" className={styles.formGroup}>
                <Form.Label>Nro. Documento</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="99999999"
                  value={formData.numeroDocumento}
                  onChange={handleChange}
                />
                {errorNumDoc && <p className={styles.errorForm}>Por favor ingrese un Nro. de Documento.</p>}
                {errorNumDocLength && <p className={styles.errorForm}>El Nro. de Documento debe tener entre 6-10 caracteres.</p>}
              </Form.Group>

              <Form.Group controlId="fechaNacimiento" className={styles.formGroupFecha}>
                <Form.Label>Fecha Nacimiento</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                />
                {errorFechaNac && <p className={styles.errorForm}>Por favor ingrese su fecha de nacimiento.</p>}
                {errorEdad && <p className={styles.errorForm}>Debes al menos 16 años para registrarte.</p>}
              </Form.Group>

              <Form.Group controlId="email" className={styles.formGroup}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingrese su email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errorEmail && <p className={styles.errorForm}>Por favor ingrese su email.</p>}
                {errorEmailFormat && <p className={styles.errorForm}>El formato del email no es válido.</p>}
              </Form.Group>

              <Form.Group controlId="telefono" className={styles.formGroup}>
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Ingrese su teléfono"
                  value={formData.telefono}
                  onChange={handleChange}
                />
                {errorTelefono && <p className={styles.errorForm}>Por favor ingrese su teléfono.</p>}
                {errorTelefonoLength && <p className={styles.errorForm}>El teléfono debe tener entre 8-12 dígitos.</p>}
              </Form.Group>

              <Form.Group controlId="password" className={styles.formGroup}>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese su contraseña"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errorPassword && <p className={styles.errorForm}>Por favor ingrese una contraseña.</p>}
                {errorPasswordLength && <p className={styles.errorForm}>La contraseña debe tener al menos 5 caracteres.</p>}
              </Form.Group>

              <Form.Group controlId="confirmPassword" className={styles.formGroup}>
                <Form.Label>Confirmar Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirme su contraseña"
                  value={formData.confirmPassword }
                  onChange={handleChange}
                />
                {errorConfirmPassword && <p className={styles.errorForm}>Por favor confirme su contraseña.</p>}
                {errorPasswordCoincidencia && <p className={styles.errorForm}>Las contraseñas no coinciden.</p>}
              </Form.Group>

              <Button
                variant="info"
                type="submit"
                className={`${styles.btnRegistrar} w-100 mt-3`}
              >
                Registrarse
              </Button>
            </Form>

            
            {mensaje && <p className={styles.mensaje}>{mensaje}</p>}

            <div className={styles.loginSection}>
              <span>¿Ya tenés cuenta?</span>
              <Link to="/login">Iniciar Sesión</Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Registro;
