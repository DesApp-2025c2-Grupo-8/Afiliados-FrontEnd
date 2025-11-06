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
import FormularioTurnos from "./Screens/FormularioTurnos/FormularioTurnos";

export function AppRouter() {
  const location = useLocation();

  // Rutas donde no se deben mostrar Header y Footer, si ven una mas agreguen aca
  const hideLayout = ["/login", "/registro"].includes(location.pathname);

  return (
    <>
      {!hideLayout && <Header />}

      <main className="main">
        <Routes>
          {/* <Route path='/'/> */}
          <Route path='/' exact={true} Component={Home}/>
          <Route path="/login" Component={Login}/>
          <Route path="/registro" Component={Registro}/>
          <Route path='/solicitar-turno' Component={FormularioTurnos}/>
          <Route path='/cargar-receta' Component={FormRecetas}/>
          <Route path='/consultar-recetas' Component={ConsultarRecetas}/>
          <Route path='/consultar-turnos' Component={ConsultarTurnos}/>
          <Route path='/cargar-autorizacion' Component={FormAutorizaciones}/>
          <Route path='/consultar-autorizaciones' Component={ConsultarAutorizaciones}/>
          <Route path='/solicitar-reintegro' Component={FormularioReintegros}/>
          <Route path='/consultar-reintegros' Component={ConsultarReintegros}/>
          <Route path='/cartilla-prestadores' Component={CartillaPrestadores}/>
          {/* <Route path='/contacto' Component={}/> */}
          <Route path='/perfil' Component={Perfil}/>
          
          {/* El de 404 debe siempre estar a lo último, si agregan páginas haganlo por encima de esta. */}
          <Route path="/*" Component={NotFound}></Route>
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </>
  );
}
