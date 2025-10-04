import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import './SearchBarConsultarRecetas.css'

const SearchBarConsultarRecetas = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-barra">
        <button className='boton-limpiar' onClick={props.limpiarFiltros}><MdCancel/></button>
        <input
          type="text"
          placeholder="Ingrese un medicamento..."
          value={props.valorInput}
          onChange={(e) => props.filtrarPorMedicamento(e.target.value)}
        />
        <FaSearch className="icono-busqueda" />
      </div>
    </form>
  );
}

export default SearchBarConsultarRecetas;
