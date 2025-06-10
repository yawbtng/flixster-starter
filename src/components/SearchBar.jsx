import '../css-components/search-and-sort.css'
import { useState, useEffect } from 'react';

const SearchBar = ({onSearchSubmit}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearchSubmit(e.target.value)
    }

    const handleClear = (e) => {
        e.preventDefault();
        onSearchSubmit("");
    }

    return (
        <form className="search-bar">
            <input type='text' onChange={onSearchSubmit} placeholder='Search for movies...'/>
            <button type='submit' onClick={handleSubmit}>Search</button>
            <button onClick={handleClear}>Clear</button>
        </form>
    )
}

export default SearchBar;
