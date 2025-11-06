import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./AppRouter";
import { useAfiliadoDatos } from "./context/AfiliadoDatos";

export function App() {
  const { setDataAfiliado } = useAfiliadoDatos();

  // useEffect(() => {
  //   // Recuperar datos del afiliado desde sessionStorage solo una vez
  //   const afiliadoDatos = JSON.parse(sessionStorage.getItem("afiliadoDatos"));
  //   if (afiliadoDatos) {
  //     setDataAfiliado(afiliadoDatos);
  //   }
  // }, [setDataAfiliado]);

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
