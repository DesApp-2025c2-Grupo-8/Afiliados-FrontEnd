
import { createContext, useContext, useState } from "react";

const DATA_AFILIADO = sessionStorage.getItem("afiliadoDatos")
  ? JSON.parse(sessionStorage.getItem("afiliadoDatos"))
  : null;
const AfiliadoDatosContext = createContext(null);

export const DatosAfiliadoProvider = ({ children }) => {
  const [dataAfiliado, setDataAfiliado] = useState(DATA_AFILIADO);

  return (
    <AfiliadoDatosContext.Provider value={{ dataAfiliado, setDataAfiliado }}>
      {children}
    </AfiliadoDatosContext.Provider>
  );
};

export const useAfiliadoDatos = () => {
  const context = useContext(AfiliadoDatosContext);
  if (!context) {
    throw new Error("useAfiliadoDatos debe usarse dentro de un AfiliadoDatosProvider");
  }
  return context;
};
