// Sidebar.js
import React from 'react';
import '../css-components/sidebar.css'; // Import the CSS file
import { useMovieContext } from '../context/MovieContext';

function Sidebar({favorites, watched, home}) {

    const handleHomeClicked = (e) => {
        favorites(false);
        watched(false);
        home(true);
    }

    const handleWatchedClicked = (e) => {
        favorites(false);
        watched(true);
        home(false);
    }

    const handleLikedClicked = (e) => {
        favorites(true);
        watched(false);
        home(false);
    }



  return (
    <div className="sidebar">
      <nav>
        <ul className='navigation'>
          <li>
            <button onClick={handleHomeClicked}>Home</button>
          </li>
          <li>
            <button onClick={handleLikedClicked}>Favorites</button>
          </li>
          <li>
            <button onClick={handleWatchedClicked}>Watched</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;