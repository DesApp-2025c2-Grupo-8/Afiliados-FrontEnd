//import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { NumeroAfiliadoProvider } from './context/NumeroAfiliado';



ReactDOM.createRoot(document.getElementById('root')).render(
      <NumeroAfiliadoProvider>
            <App />
      </NumeroAfiliadoProvider>

)
