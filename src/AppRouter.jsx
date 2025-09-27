import { Route, Routes } from "react-router-dom";


import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import Footer from "./components/Footer/Footer";

export function AppRouter() {
  return (
    <Routes>
      {/* <Route path='/'/> */}
      <Route path='/' Component={Footer}/>
      
    </Routes>
  );
}