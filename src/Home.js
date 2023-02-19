import React from 'react'
import Search from './Search';
import Favorite from './Favorite';
import {Routes, Link, Route  } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1 className='homePhrase'>Oh, no! You seem to have wandered into a food desert! You must be hungry...</h1>
            <Link to="/Search">
              <button className='button1'>
                  Search for a recipe
              </button>
            </Link>
            <Link to="/Favorite">
              <button className='button2'>
                  Favorite recipes
              </button>
              </Link>
      <Routes>
        <Route path="/Search" element={<Search />} />
        <Route path="/Favorite" element={<Favorite />} />
      </Routes>
    </div>
  )
}
