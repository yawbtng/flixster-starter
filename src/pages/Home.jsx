import { useState, useEffect } from 'react'
import './home.css'
import SortMovies from '../components/SortMovies'
import SearchBar from '../components/SearchBar'
import MovieList from '../components/MovieList'
import movieData from "../data/data.js";
import parseMovieData from '../utils/helpers.js'
import { searchMovies, getPopularMovies, getUpcomingMovies } from '../utils/api.js'


const Home = () => {
  // state for rendering movies
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // state for loading additional movies
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // state for searching for movies
  const [searchQuery, setSearchQuery] = useState("");
  const [moviesFound, setMoviesFound] = useState(true);

  // state for loading currently playing movies
  const [isUpcoming, setUpcoming] = useState(false);

// loading popular movies from movie API
  const loadPopularMovies = async () => {
    try {
      const popularMovies = await getPopularMovies(page)
      console.log(popularMovies)
      if (!popularMovies) {
        setHasMore(false);
      } else {
        const parsedMovies = popularMovies.map((movie) => parseMovieData(movie))

        if (page > 1) {
          setMovies([...movies, ...parsedMovies])
        } else {
          setMovies((movies) => parsedMovies);
        }
      }
    } catch (err) {
      console.log(err)
      setError("Failed to load popular movies..")
    } finally {
      setLoading(false)
    }
  }

  // loading upcoming movies from movie API
  const loadUpcomingMovies = async () => {
    try {
      const currMovies = await getUpcomingMovies(page)
      console.log(currMovies)
      const parsedMovies = currMovies.map((movie) => parseMovieData(movie))
      if (page === 1) {
        setMovies((movies) => parsedMovies);
      } else if (page > 1){
        setMovies([...movies, ...parsedMovies])
      }
    } catch (err) {
      console.log(err)
      setError("Failed to load current movies..")
    } finally {
      setLoading(false)
    }
  }

  // search movies
  const searchForMovies = async (query) => {
    const searchedMovies = await searchMovies(query);
    try {  
      if (!searchedMovies) {
        setMoviesFound(false);
      } else {
        setMoviesFound(true);
        const parsedMovies = searchedMovies.map((movie) => parseMovieData(movie))
        setMovies((movies) => parsedMovies)
      }
    } catch (err) {
        console.log(err)
        setError("Failed to search movies...")
    } finally {
        setLoading(false);
      }
  }

  useEffect(() => {
    if(searchQuery.trim() === "" || !searchQuery) {
        if (isUpcoming === false) {
          loadPopularMovies();
          console.log("displaying popular/current movies")
        } else {
          loadUpcomingMovies();
          console.log("displaying upcoming movies")
        }
    }
    else {
      searchForMovies(searchQuery)
    }
    
  }, [page, searchQuery, isUpcoming])

  // loading more pages
  const handleLoadMore = () => {
    setPage((page) => page + 1);
  }

  //
  const handleCurrentlyPlaying = () => {
    setUpcoming(!isUpcoming);
  }

  return (
    <div className="Home">

      <header className='home-header'>
        <h1>Flixster 🎥</h1>

        <div className='search-and-sort'>
          <SearchBar onSearchSubmit={setSearchQuery}/>
          <SortMovies />
          <button onClick={handleCurrentlyPlaying} className={isUpcoming ? "current-playing" : ""}>{isUpcoming ? "Upcoming" : "Currently Playing"}</button>
        </div>
      </header>

      <main className='main-section'>
          {loading ? (
            <div className='loading'><h2>Loading...</h2></div>
          ) : (
            moviesFound ? (
              <MovieList movies={movies}/>
            ) : (
              <div className="no-movies-found">
                <h2>No movies found...☹️</h2>
              </div>
            )
          )}
          <div className='loading-movies'>
            {hasMore && !loading && (<button onClick={handleLoadMore} className='load-more-movies'>Load More...</button>)}
            {!hasMore && <p>No more movies to load</p>}
          </div>
      </main>

    
      <footer>

      </footer>
    </div>
  )
}

export default Home;
