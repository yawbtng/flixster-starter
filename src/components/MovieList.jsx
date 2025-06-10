import './movie-list.css'
import MovieCard from './MovieCard'

const MovieList = () => {

    return (
        <div className='movie-grid'>
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
        </div>
    )
}

export default MovieList;