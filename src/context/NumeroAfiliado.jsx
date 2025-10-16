// NumeroAfiliado.jsx
import { createContext, useContext, useState } from "react";

const NUMERO_AFILIADO = 663459901;
const NumeroAfiliadoContext = createContext(null);

export const NumeroAfiliadoProvider = ({ children }) => {
  const [numeroAfiliado, setNumeroAfiliado] = useState(NUMERO_AFILIADO);

  return (
    <NumeroAfiliadoContext.Provider value={{ numeroAfiliado, setNumeroAfiliado }}>
      {children}
    </NumeroAfiliadoContext.Provider>
  );
};

export const useNumeroAfiliado = () => {
  const context = useContext(NumeroAfiliadoContext);
  if (!context) {
    throw new Error("useNumeroAfiliado debe usarse dentro de un NumeroAfiliadoProvider");
  }
  return context;
};
