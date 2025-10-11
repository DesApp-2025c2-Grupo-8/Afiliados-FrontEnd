import React, { useEffect } from "react";
import './Registro.css';

const Registro = () => {
  useEffect(() => {
    document.title = 'Registrarse - Medicina Integral';
  }, []);

  return (
    <>
      <div className="registro-container">
        <div className="registro-box">
          <h2>Registrate</h2>

          <form method="POST" action="/">
            <div className="input-group">
              <label htmlFor="nombre">Nombre/s</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Ingrese su/s nombre/s"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="apellido">Apellido/s</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                placeholder="Ingrese su/s apellido/s"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="fechaNac">Fecha Nacimiento</label>
              <input
                type="date"
                id="fechaNac"
                name="fechaNac"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="tipoDoc">Tipo Documento</label>
              <select id="tipoDoc" name="tipoDoc" required>
                <option value="">Seleccione</option>
                <option value="dni">DNI</option>
                <option value="pasaporte">Pasaporte</option>
                <option value="lc">Libreta Cívica</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="nroDoc">Nro. Documento</label>
              <input
                type="number"
                id="nroDoc"
                name="nroDoc"
                placeholder="99999999"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Ingrese su email"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                placeholder="Ingrese su teléfono"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Ingrese su contraseña"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirme su contraseña"
                required
              />
            </div>

            <button type="submit" className="btn-registrar">
              Registrar
            </button>
          </form>

          <div className="login-section">
            <span>¿Ya tenés cuenta?</span>
            <a href="/login">Iniciar Sesión</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registro;
