import '../css-components/movie-card.css'
import { useState, useEffect } from 'react';

const MovieCard = ({content, setMovieModalId, setIsModalOpen, handleModelClick }) => {
    
    // state for watched and liked buttons
    const [isLiked, setIsLiked] = useState(false);
    const [isWatched, setIsWatched] = useState(false);

    const handleLikeClicked = () => {
        setIsLiked(!isLiked);
    }

    const handleWatchedClicked = () => {
        setIsWatched(!isWatched);
    }


    const movie = content;

    const handleClick = (e) => {
        console.log(e.target.className)

        if (e.target.className.includes("watch")) {
            handleWatchedClicked();
        } else if (e.target.className.includes("like")) {
            handleLikeClicked();
        } else {
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
                    <h1 onClick={handleWatchedClicked} className={`watch ${isWatched ? 'watched' : ''}`}>👁</h1>
                    <p className='movie-rating'>Rating: {movie.rating}</p>
                    <h1 onClick={handleLikeClicked} className={`like ${isLiked ? 'liked' : ''}`}>♡</h1>
                </div>
                
            </div>
        </>
    )
}

export default MovieCard;