import { Route, Routes } from "react-router-dom";


import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./Screens/Home/Home";
import Login from "./Screens/Login/Login"

export function AppRouter() {
  return (
    <>
      <Header/>
      <main className="main">
        <Routes>
          {/* <Route path='/'/> */}
          <Route path='/' Component={Home}/>
          <Route path="/login" Component={Login}/>
          
        </Routes>
      </main>
      <Footer/>
    </>
  );
}