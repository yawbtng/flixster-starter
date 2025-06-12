import '../css-components/movie-card.css'
import { useState, useEffect } from 'react';

const MovieCard = ({content, setMovieModalId, setIsModalOpen }) => {
    const movie = content;
    const movieDate = (release_date) => {
        const date = new Date(release_date);
        const formatter = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        const formattedDate = formatter.format(date);
        return formattedDate
    }

    const handleClick = (e) => {
        setMovieModalId(movie.id)
        setIsModalOpen(true)
    }

    return (
        <>
            <div className='movie-card' onClick={handleClick}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster}`} alt={movie.title}/>
                <h3>{movie.title}</h3>
                <p>{movieDate(movie.release_date)}</p>
                <p>Rating: {movie.rating}</p>
            </div>
        </>
    )
}

export default MovieCard;