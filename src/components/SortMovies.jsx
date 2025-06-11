import '../css-components/search-and-sort.css'

const SortMovies = ({onSort}) => {

    const handleSort = (e) => {
        e.preventDefault();
        console.log(e)
        onSort(e.target.value)
    }

    return (
        <div className="sort-movies">
            <select id="sort" name="sort-movies" defaultValue="None" onChange={handleSort}>
                <option value="none">None</option>
                <option value="popularity">Popularity (Descending)</option>
                <option value="release">Release Date (Descending)</option>
                <option value="rating">Rating (Descending)</option>
                <option value="title">Title</option>
            </select>
        </div>
    )
}

export default SortMovies;