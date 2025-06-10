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

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies()
        const parsedMovies = popularMovies.map((movie) => parseMovieData(movie))
        setMovies(parsedMovies)
      } catch (err) {
        console.log(err)
        setError("Failed to load movies..")
      } finally {
        setLoading(false)
      }
    }

    loadPopularMovies();
  }, [])



  

  return (
    <div className="Home">

      <header className='home-header'>
        <h1>Flixster 🎥</h1>

        <div className='search-and-sort'>
          <SearchBar />
          <SortMovies />
        </div>
      </header>

      <main>
        {loading ? (<div className='loading'><h2>Loading...</h2></div>) : (<MovieList movies={movies}/>)}
      </main>

      <footer>
      </footer>
    </div>
  )
}

export default Home;
