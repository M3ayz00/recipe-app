import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Search() {
  const [meal,setMeal] = useState('')
  const [recipes,setRecipes] = useState([])


  const handleclick = async (event) => {
    if(event.key==='Enter'){
      try {
        const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${meal}&app_id=4e82b945&app_key=3bbe44949886764a36f0e18fcf1fc6dc`);
        const data = await response.json();
        setRecipes(data.hits);
        console.log(recipes);
      } catch (error) {
        console.error(error);
      }
    }
  }
  
  const renderRecipe = (arr) =>{
    function formatNumber(number) {
      return Number(number.toFixed(2));
    }
  
    const recipeId = encodeURIComponent(arr.recipe.uri.split('#')[1]);
  
    return (
      <Link to={`/recipe/${recipeId}`}>
        <div className='recipe-thumbnail'>
          <div>
            <img className='thumbnail' src={arr.recipe.images.THUMBNAIL.url} alt='' />
            <p>{arr.recipe.label}</p>
          </div>
          <div>
            <p>{formatNumber(arr.recipe.calories)} CALORIES | {arr.recipe.ingredients.length} INGREDIENTS</p>
          </div>
        </div>
      </Link>
    );
  }
  
  
  

  

  return (
    <div className='recipes-list'>
        <h1>Get ready to be amazed !</h1>
        <div>
            <input 
            value={meal}
            onChange={(e)=>setMeal(e.target.value)}
            onKeyDown={handleclick}
            type="text"
            placeholder='Find the best recipes from across the web'
            />
        </div>
        <div className='recipes'>
          {recipes.map((recipe)=>
            renderRecipe(recipe)
           )}
        </div>
      
    </div>
  )
}
