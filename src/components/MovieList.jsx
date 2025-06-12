import '../css-components/movie-list.css'
import MovieCard from './MovieCard'

const MovieList = ({movies, setMovieModalId, setIsModalOpen}) => {


    return (
        <div className='movie-grid'>
            {movies.map((movie) => (
                <MovieCard key={movie.id} content={movie} setMovieModalId={setMovieModalId} setIsModalOpen={setIsModalOpen} />
            ))}
        </div>
    )
}

export default MovieList;