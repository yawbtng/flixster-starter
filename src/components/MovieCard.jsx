import '../css-components/movie-card.css'
import { useState, useEffect } from 'react';

const MovieCard = ({content, setMovieModalId, setIsModalOpen, handleModelClick }) => {
    const movie = content;

    const handleClick = (e) => {
        handleModelClick(movie.id)
        setMovieModalId(movie.id)
        setIsModalOpen(true)
        
    }

    return (
        <>
            <div className='movie-card' onClick={handleClick}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster}`} alt={movie.title}/>
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
                <p>Rating: {movie.rating}</p>
            </div>
        </>
    )
}

export default MovieCard;