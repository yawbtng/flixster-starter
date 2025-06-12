import '../css-components/search-and-sort.css'
import { useState, useEffect } from 'react';

const SearchBar = ({setSearchQuery, searchQuery}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.input.value);
    };


    const handleClear = (e) => {
        e.preventDefault();
        setSearchQuery("")
    }

    const handleSearchInput = (e) => {
        e.preventDefault()
        setSearchQuery(e.target.value)
    }

    


    return (
        <form className="search-bar" onSubmit={handleSubmit} onReset={handleClear} >
            <input type='text' id='input' placeholder='Search for movies...' value={searchQuery} onChange={handleSearchInput}/>
            <button type='submit'>Search</button>
            <button type='reset' >Clear</button>
        </form>
    )
}

export default SearchBar;
