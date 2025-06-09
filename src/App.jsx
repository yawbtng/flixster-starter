import { useState } from 'react'
import './App.css'
import SortMovies from './components/SortMovies'
import SearchBar from './components/SearchBar'

const App = () => {
  return (
    <div className="App">

      <header className='App-header'>
        <h1>Flixster 🎥</h1>

        <div className='search-and-sort'>
          <SearchBar />
          <SortMovies />
        </div>
      </header>

      <main>





      </main>
      
      <footer>



      </footer>
    </div>
  )
}

export default App
