import { Route, Routes } from "react-router-dom";


import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./Screens/Home/Home";
import FormRecetas from "./Screens/FormRecetas/FormRecetas";


export function AppRouter() {
  return (
    <>
      <Header/>
      <main className="main">
        <Routes>
          {/* <Route path='/'/> */}
          <Route path='/' Component={Home}/>
          {/* <Route path='/formRecetas' Component={FormRecetas}/> */}
          
          
        </Routes>
      </main>
      <Footer/>
    </>
  );
}