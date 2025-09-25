import { Route, Routes } from "react-router-dom";


import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

export function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={
        <Box sx={{ typography: 'h5', color: grey[900] }}>
          Elija una opción del menú
        </Box>
      } />
    </Routes>
  );
}