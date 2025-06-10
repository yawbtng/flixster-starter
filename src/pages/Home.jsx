import { useState } from 'react'
import './home.css'
import SortMovies from '../components/SortMovies'
import SearchBar from '../components/SearchBar'
import MovieList from '../components/MovieList'
import movieData from "../data/data.js";
import parseMovieData from '../utils/helpers.js'

const Home = () => {
  const parsedMovies = movieData.results.map((movie) => parseMovieData(movie))
  console.log(parsedMovies)

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
        <MovieList movies={parsedMovies}/>
      </main>

      <footer>
      </footer>
    </div>
  )
}

export default Home;
