import "./search-and-sort.css";

const SearchBar = () => {

    return (
        <form className="search-bar">
            <input type='text' placeholder='Search for movies' />
            <button type='submit'>Search</button>
            <button>Clear</button>
        </form>
    )
}

export default SearchBar;
