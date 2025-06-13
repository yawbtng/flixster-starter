import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvier = ({children}) => {

    const [favorites, setFavorites] = useState([]);
    const [watched, setWatched] = useState([]);

    // favorites
    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")
        if (storedFavs) {
            setFavorites(JSON.parse(storedFavs))
        }
    }, [])

    // watched
    useEffect(() => {
        const storedWatched = localStorage.getItem("watched")
        if (storedWatched) {
            setFavorites(JSON.parse(storedWatched))
        }
    }, [])

    // favorites
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])

     // watched
    useEffect(() => {
        localStorage.setItem("watched", JSON.stringify(watched))
    }, [watched])

    // favorites
    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie])
    }

    // watched
    const addToWatched = (movie) => {
        setWatched(prev => [...prev, movie])
    }

    // favorites
    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }

    // watched
    const removeFromWatched = (movieId) => {
        setWatched(prev => prev.filter(movie => movie.id !== movieId))
    }

    // favorites
    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    // favorites
    const isWatched = (movieId) => {
        return watched.some(movie => movie.id === movieId)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        
        watched,
        addToWatched,
        removeFromWatched,
        isWatched
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}