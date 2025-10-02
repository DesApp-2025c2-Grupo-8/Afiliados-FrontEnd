import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBarConsultarRecetas.css'

const SearchBarConsultarRecetas = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
  <div className="search-barra">
    <input
      type="text"
      placeholder="Ingrese un medicamento..."
      onChange={(e) => props.filtrarPorMedicamento(e.target.value)}
    />
    <FaSearch className="icono-busqueda" />
  </div>
</form>

  );
}

export default SearchBarConsultarRecetas;
