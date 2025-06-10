import '../css-components/movie-list.css'
import MovieCard from './MovieCard'

const MovieList = ({movies}) => {

    return (
        <div className='movie-grid'>
            {movies.map((movie) => (
                <MovieCard key={movie.id} content={movie} />
            ))}
        </div>
    )
}

export default MovieList;