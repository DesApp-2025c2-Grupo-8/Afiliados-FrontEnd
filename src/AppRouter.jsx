import { Route, Routes } from "react-router-dom";


import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./Screens/Home/Home";
import Login from "./Screens/Login/Login";
import Registro from './Screens/Registrarse/Registrate';
import FormRecetas from "./Screens/FormRecetas/FormRecetas";
import ConsultarRecetas from "./Screens/ConsultarRecetas/ConsultarRecetas";
import CartillaPrestadores from "./Screens/CartillaPrestadores/CartillaPrestadores";
import ConsultarAutorizaciones from "./Screens/ConsultarAutorizaciones/ConsultarAutorizaciones";
import ConsultarReintegros from "./Screens/ConsultarReintegros/ConsultarReintegros";

import NotFound from "./Screens/NotFound/NotFound";
import ConsultarTurnos from "./Screens/ConsultarTurnos/ConsultarTurnos";

export function AppRouter() {
  return (
    <>
      <Header/>
      <main className="main">
        <Routes>
          {/* <Route path='/'/> */}
          <Route path='/' exact={true} Component={Home}/>
          <Route path="/login" Component={Login}/>
          <Route path="/registro" Component={Registro}/>
          {/* <Route path='/solicitar-turno' Component={}/> */}
          <Route path='/cargar-receta' Component={FormRecetas}/>
          <Route path='/consultar-recetas' Component={ConsultarRecetas}/>
          <Route path='/consultar-turnos' Component={ConsultarTurnos}/>
          {/* <Route path='/cargar-autorizacion' Component={}/> */}
          <Route path='/consultar-autorizaciones' Component={ConsultarAutorizaciones}/>
          {/* <Route path='/solicitar-reintegro' Component={}/> */}
          <Route path='/consultar-reintegros' Component={ConsultarReintegros}/>
          <Route path='/cartilla-prestadores' Component={CartillaPrestadores}/>
          {/* <Route path='/contacto' Component={}/> */}
          {/* <Route path='/perfil' Component={}/> */}
          
          {/* El de 404 debe siempre estar a lo último, si agregan páginas haganlo por encima de esta. */}
          <Route path="/*" Component={NotFound}></Route>
        </Routes>
      </main>
      <Footer/>
    </>
  );
}