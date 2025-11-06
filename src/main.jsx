//import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { DatosAfiliadoProvider } from './context/AfiliadoDatos';



ReactDOM.createRoot(document.getElementById('root')).render(
      <DatosAfiliadoProvider>
            <App />
      </DatosAfiliadoProvider>

)
