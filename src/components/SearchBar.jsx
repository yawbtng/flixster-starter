import '../css-components/search-and-sort.css'
import { useState, useEffect } from 'react';

const SearchBar = ({onSearchSubmit}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearchSubmit(e.target.input.value)
    }

    return (
        <form className="search-bar" onSubmit={handleSubmit} >
            <input type='text' id='input' placeholder='Search for movies...'/>
            <button type='submit'>Search</button>
            <button type='reset' >Clear</button>
        </form>
    )
}

export default SearchBar;
