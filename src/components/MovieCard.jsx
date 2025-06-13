import '../css-components/movie-card.css'
import { useState, useEffect } from 'react';
import { useMovieContext } from '../context/MovieContext';

const MovieCard = ({content, setMovieModalId, setIsModalOpen, handleModelClick }) => {
    const movie = content;
    
    const {isFavorite, addToFavorites, removeFromFavorites, isWatched, addToWatched, removeFromWatched} = useMovieContext();

    const favorite = isFavorite(movie.id)
    const watched = isWatched(movie.id)

    const handleLikeClicked = (e) => {
        if (favorite) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie)
        }
    }

    const handleWatchedClicked = (e) => {
        e.preventDefault()
        if (watched) {
            removeFromWatched(movie.id);
        } else {
            addToWatched(movie)
        }
    }

    const handleClick = (e) => {
        e.preventDefault();
        if (e.target.className.includes("watch") || e.target.className.includes("like")) {
            return 
        }  else {
            handleModelClick(movie.id)
            setMovieModalId(movie.id)
            setIsModalOpen(true)
        }
    }


    return (
        <>
            <div className='movie-card' onClick={handleClick}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster}`} alt={movie.title}/>
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
                <div className='like-and-watch'>
                    <h1 onClick={handleWatchedClicked} className={`watch ${watched ? 'watched' : ''}`}>👁</h1>
                    <p className='movie-rating'>Rating: {movie.rating}</p>
                    <h1 onClick={handleLikeClicked} className={`like ${favorite ? 'liked' : ''}`}>♡</h1>
                </div>
                
            </div>
        </>
    )
}

export default MovieCard;