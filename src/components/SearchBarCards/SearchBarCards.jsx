import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import styles from './SearchBarCards.module.css'

const SearchBarCards = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <div className={styles.searchBarra}>
        <button type='button' className={styles.botonLimpiar} onClick={props.limpiarFiltros}><MdCancel/></button>
        <input
          type="text"
          placeholder={props.placeholder}
          value={props.valorInput}
          onChange={(e) => props.filtro(e.target.value)}
        />
        <FaSearch className={styles.iconoBusqueda} />
      </div>
    </form>
  );
}

export default SearchBarCards;
