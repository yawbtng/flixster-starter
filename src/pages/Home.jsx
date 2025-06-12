import { useState, useEffect } from 'react'
import './home.css'
import SortMovies from '../components/SortMovies'
import SearchBar from '../components/SearchBar'
import MovieList from '../components/MovieList'
import movieData from "../data/data.js";
import parseMovieData from '../utils/helpers.js'
import { searchMovies, getPopularMovies, getUpcomingMovies, getMovieGenres, getMovieSpecificInfo } from '../utils/api.js'
import MovieCardModal from "../components/MovieCardModal.jsx"



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

  // state for sorting movies
  const [sortType, setSortType] = useState("none");

  // state for movie-modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieModalContent, setMovieModalContent] = useState();
  const [movieModalId, setMovieModalId] = useState(123456);

// loading popular movies from movie API
  const loadPopularMovies = async () => {
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
      setError("Failed to load popular movies..")
    } finally {
      setLoading(false)
    }
  }

  // loading upcoming movies from movie API
  const loadUpcomingMovies = async () => {
    try {
      const currMovies = await getUpcomingMovies(page)
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


  // sort movies
  const sortMoviesBySortType = (moviesToSort, sortType) => {
    let sortedMovies;
    // sort by release date (descending)
    if (sortType === "release") {
      sortedMovies = [...moviesToSort].sort((movieA, movieB) => {
        const dateA = new Date(movieA.release_date);
        const dateB = new Date(movieB.release_date);
        return dateB - dateA;
      })
    // sort by rating aka vote average (descending)
    } else if (sortType === "rating") {
      sortedMovies = [...moviesToSort].sort((movieA, movieB) => {
        return movieB.rating - movieA.rating; 
      })
    } else if (sortType === "title") {
        sortedMovies = [...moviesToSort].sort((movieA, movieB) => {
            return movieA.title.localeCompare(movieB.title);
        })
    // no sorting implemented (default option)
    } else {
      sortedMovies = moviesToSort;
    }
    return sortedMovies;
  }


    // getting the movie genres for the modal
  const getMovieSpecificContent = async (id) => {
        const movieSpecific = await getMovieSpecificInfo(id)
        setMovieModalContent(movieSpecific)
    }

    // 
  useEffect(() => {
      getMovieSpecificContent(movieModalId)
  }, [movieModalId])


  // sorting movies
  useEffect(() => {
    if (movies) {
      const newSortedMovies = sortMoviesBySortType(movies, sortType)
      setMovies(newSortedMovies)
    }
  }, [sortType])


// loading movies and searching
  useEffect(() => {
    if(searchQuery.trim() === "" || !searchQuery) {
        if (isUpcoming === false) {
          loadPopularMovies();
        } else {
          loadUpcomingMovies();
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

  // upcoming movies
  const handleUpcoming = () => {
    setUpcoming(!isUpcoming);
  }

  return (
    <div className="Home">

      <header className='home-header'>
        <h1>Flixster 🎥</h1>

        <div className='search-and-sort'>
          <SearchBar onSearchSubmit={setSearchQuery}/>
          <SortMovies onSort={setSortType}/>
          <button onClick={handleUpcoming} className={isUpcoming ? "current-playing" : ""}>{isUpcoming ? "Upcoming" : "Currently Playing"}</button>
        </div>
      </header>

      <main className='main-section'>
          {loading ? (
            <div className='loading'><h2>Loading...</h2></div>
          ) : (
            moviesFound ? (
              <MovieList movies={movies} setMovieModalId={setMovieModalId} setIsModalOpen={setIsModalOpen} />
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

          {isModalOpen && <MovieCardModal content={movieModalContent} handleOpen={setIsModalOpen} setMovieModalContent={setMovieModalContent} />}
      </main>

    
      <footer>

      </footer>
    </div>
  )
}

export default Home;
