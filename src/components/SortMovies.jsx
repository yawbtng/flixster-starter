import '../css-components/search-and-sort.css'

const SortMovies = ({onSort}) => {

    const handleSort = (e) => {
        e.preventDefault();
        onSort(e.target.value)
    }

    return (
        <div className="sort-movies">
            <select id="sort" name="sort-movies" defaultValue="None" onChange={handleSort}>
                <option hidden value="none">None</option>
                <option value="release">Release Date (Descending)</option>
                <option value="rating">Vote Average (Descending)</option>
                <option value="title">Title</option>
            </select>
        </div>
    )
}

export default SortMovies;