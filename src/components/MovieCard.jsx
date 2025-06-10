import '../css-components/movie-card.css'


const MovieCard = ({content}) => {
    const movie = content
    return (
        <div className='movie-card'>
            <img src={`https://image.tmdb.org/t/p/w500${movie.image}`} alt={movie.title}/>
            <h3>{movie.title}</h3>
            <p>Rating: {movie.rating}</p>
        </div>
    )
}

export default MovieCard;