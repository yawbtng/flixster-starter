import '../css-components/movie-list.css'
import MovieCard from './MovieCard'

const MovieList = ({movies, setMovieModalId, setIsModalOpen, handleModelClick}) => {


    return (
        <div className='movie-grid'>
            {movies.map((movie) => (
                <MovieCard key={movie.id} content={movie} setMovieModalId={setMovieModalId} setIsModalOpen={setIsModalOpen} handleModelClick={handleModelClick}/>
            ))}
        </div>
    )
}

export default MovieList;