import './App.css'
import Home from './pages/Home.jsx'
import Sidebar from './components/Sidebar.jsx'
import { MovieProvier } from './context/MovieContext.jsx'
import React from 'react'


const App = () => {
  return (
    <MovieProvier>
      <div className="App">
        <Home />
      </div>
    </MovieProvier>
  )
}

export default App;


