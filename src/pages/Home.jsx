import { useState, useEffect } from 'react'
import './home.css'
import SortMovies from '../components/SortMovies'
import SearchBar from '../components/SearchBar'
import MovieList from '../components/MovieList'
import movieData from "../data/data.js";
import parseMovieData from '../utils/helpers.js'
import { searchMovies, getPopularMovies } from '../utils/api.js'

const Home = () => {
  
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [moviesFound, setMoviesFound] = useState(false);

// loading from movie api
  const loadMovies = async () => {
    try {
      const popularMovies = await getPopularMovies(page)
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
      setError("Failed to load movies..")
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
      console.log("loaded movies")
        loadMovies();
    }
    else {
      searchForMovies(searchQuery)
    }
    
  }, [page, searchQuery])

  // loading more pages
  const handleLoadMore = () => {
    setPage((page) => page + 1);
  }


  // searching for content
  const handleSearchChange = (search) => {
    setSearchQuery(search.target.value);
  }

  return (
    <div className="Home">

      <header className='home-header'>
        <h1>Flixster 🎥</h1>

        <div className='search-and-sort'>
          <SearchBar onSearchSubmit={handleSearchChange}/>
          <SortMovies />
          
        </div>
      </header>

      <main className='main-section'>
        
          {loading ? (<div className='loading'><h2>Loading...</h2></div>) : (<MovieList movies={movies}/>)}
          <div className='loading-movies'>
            {hasMore && !loading && (<button onClick={handleLoadMore} className='load-more-movies'>Load More...</button>)}
            {!hasMore && <p>No more items to load</p>}
          </div>

      </main>

    
      <footer>

      </footer>
    </div>
  )
}

export default Home;
