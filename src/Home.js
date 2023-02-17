import React from 'react'
import Recipe from './Recipe';
import Favorite from './Favorite';
import { BrowserRouter as Router, Link, Route  } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1 className='homePhrase'>Oh, no! You seem to have wandered into a food desert! You must be hungry...</h1>
      <Router>
        <Link to="/Recipe">
          <button>Search for a recipe</button>
        </Link>
        <Link to="/Favorite">
          <button>Favorite recipes</button>
        </Link>
          <Route exact path="/Recipe">
            <Recipe />
          </Route>
          <Route path="/Favorite">
            <Favorite />
          </Route> 
      </Router>
    </div>
  )
}
