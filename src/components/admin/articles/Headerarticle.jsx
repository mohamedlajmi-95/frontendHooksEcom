import React from 'react'

const Headerarticle = ({searchText, handleSearchChange }) => {
  return (
    <div>
      <div className="table-container-header">
        
      </div>
      <div className="search-container">
        <i className="fa-solid fa-search"></i>
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Rechercher des articles..."
          className="search-input"
        />
      </div>
    </div>
  )
}

export default Headerarticle
