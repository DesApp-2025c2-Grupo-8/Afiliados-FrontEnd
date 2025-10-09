import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import styles from './SearchBarConsultarRecetas.module.css'

const SearchBarConsultarRecetas = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <div className={styles.searchBarra}>
        <button className={styles.botonLimpiar} onClick={props.limpiarFiltros}><MdCancel/></button>
        <input
          type="text"
          placeholder="Ingrese un medicamento..."
          value={props.valorInput}
          onChange={(e) => props.filtrarPorMedicamento(e.target.value)}
        />
        <FaSearch className={styles.iconoBusqueda} />
      </div>
    </form>
  );
}

export default SearchBarConsultarRecetas;
