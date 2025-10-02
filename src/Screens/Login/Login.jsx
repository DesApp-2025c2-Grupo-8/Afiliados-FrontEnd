import React, {useEffect} from "react";
import './Login.css';

const Login = () => {
  useEffect(() => {
    document.title = 'Iniciar sesión - Medicina Integral'
  }, []);

  return (
    <>
      <div className="login-container">
        {/* formulario */}
        <div className="login-box">
          <h2>Iniciar Sesión</h2>

          <form method="GET" action="/">
            <label htmlFor="tipoDoc">Tipo Documento</label>
            <select id="tipoDoc" name="tipoDoc">
              <option value="">Seleccione</option>
              <option value="dni">DNI</option>
              <option value="pasaporte">Pasaporte</option>
              <option value="lc">Libreta Cívica</option>
            </select>

            <label htmlFor="nroDoc">Nro. Documento</label>
            <input
              type="number"
              min="0"
              id="nroDoc"
              name="nroDoc"
              placeholder="99999999"
            />

            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ingrese su contraseña"
            />

            <button type="submit" className="btn-ingresar">
              Ingresar
            </button>
          </form>

          <div className="register-section">
            <span>¿No tenés cuenta?</span>
            <a href="/registro">Registrarse</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
