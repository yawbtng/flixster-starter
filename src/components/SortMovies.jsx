import "./search-and-sort.css";

const SortMovies = () => {
    return (
        <div className="sort-movies">
            <select id="sort" name="sort-movies" defaultValue="None">
                <option>None</option>
                <option>Popularity (Descending)</option>
                <option>Release Date (Descending)</option>
                <option>Rating (Descending)</option>
                
            </select>
        </div>
    )
}

export default SortMovies;