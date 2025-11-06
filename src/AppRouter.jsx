import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./Screens/Home/Home";
import Login from "./Screens/Login/Login";
import Registro from "./Screens/Registrarse/Registrate";
import FormRecetas from "./Screens/FormRecetas/FormRecetas";
import ConsultarRecetas from "./Screens/ConsultarRecetas/ConsultarRecetas";
import CartillaPrestadores from "./Screens/CartillaPrestadores/CartillaPrestadores";
import ConsultarAutorizaciones from "./Screens/ConsultarAutorizaciones/ConsultarAutorizaciones";
import ConsultarReintegros from "./Screens/ConsultarReintegros/ConsultarReintegros";
import FormAutorizaciones from "./Screens/FormAutorizaciones/FormAutorizaciones";
import NotFound from "./Screens/NotFound/NotFound";
import ConsultarTurnos from "./Screens/ConsultarTurnos/ConsultarTurnos";
import Perfil from "./Screens/Perfil/Perfil";
import FormularioReintegros from "./Screens/FormularioReintegros/FormularioReintegros";

export function AppRouter() {
  const location = useLocation();

  // Rutas donde no se deben mostrar Header y Footer, si ven una mas agreguen aca
  const hideLayout = ["/login", "/registro"].includes(location.pathname);

  return (
    <>
      {!hideLayout && <Header />}

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/cargar-receta" element={<FormRecetas />} />
          <Route path="/consultar-recetas" element={<ConsultarRecetas />} />
          <Route path="/consultar-turnos" element={<ConsultarTurnos />} />
          <Route path="/cargar-autorizacion" element={<FormAutorizaciones />} />
          <Route path="/consultar-autorizaciones" element={<ConsultarAutorizaciones />} />
          <Route path="/solicitar-reintegro" element={<FormularioReintegros />} />
          <Route path="/consultar-reintegros" element={<ConsultarReintegros />} />
          <Route path="/cartilla-prestadores" element={<CartillaPrestadores />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </>
  );
}
