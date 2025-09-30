import { Route, Routes } from "react-router-dom";


import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./Screens/Home/Home";
import ConsultarRecetas from "./Screens/ConsultarRecetas/ConsultarRecetas";
import CartillaPrestadores from "./Screens/CartillaPrestadores/CartillaPrestadores"

import NotFound from "./Screens/NotFound/NotFound";

export function AppRouter() {
  return (
    <>
      <Header/>
      <main className="main">
        <Routes>
          {/* <Route path='/'/> */}
          <Route path='/' exact={true} Component={Home}/>
          <Route path='/consultar-recetas' Component={ConsultarRecetas}/>
          <Route path='/cartilla-prestadores' Component={CartillaPrestadores}/>
          
          {/* El de 404 debe siempre estar a lo último, si agregan páginas haganlo por encima de esta. */}
          <Route path="/*" Component={NotFound}></Route>
        </Routes>
      </main>
      <Footer/>
    </>
  );
}