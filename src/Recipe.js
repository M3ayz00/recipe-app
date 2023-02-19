import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Recipe() {
  const [recipe, setRecipe] = useState({});

  const { uri } = useParams();
  const decodedUri = decodeURIComponent(uri);


  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2/${uri}?type=public&app_id=4e82b945&app_key=3bbe44949886764a36f0e18fcf1fc6dc`);
      const data = await response.json();
      setRecipe(data.recipe);
    }

    fetchRecipe();
  }, [uri]);

  function formatNumber(number) {
    return Number(number.toFixed(0));
  }
  const renderNutrients=(arr)=>{
      return arr.map((nutrient)=>{
        if(nutrient.label === 'Fat' || nutrient.label === 'Carbs'){
          return(
            <>
            <ul>
              <div>
                <li>{nutrient.label} </li>
                <span>{formatNumber((nutrient.total)/(recipe.yield))} {nutrient.unit}</span>
                <span>{formatNumber((nutrient.daily)/(recipe.yield))} %</span>
              </div>
              
                <ul>
                  <div>
                    <li>{nutrient?.sub[0].label} </li>
                    <span>{formatNumber((nutrient.sub[0].total)/(recipe.yield))} %</span>
                    <span>{formatNumber((nutrient.sub[0].daily)/(recipe.yield))} {nutrient.sub[0].unit}</span>
                  </div>
                  <div>
                    <li>{nutrient.sub[1].label} </li>
                    <span>{formatNumber((nutrient.sub[1].total)/(recipe.yield))} %</span>
                    <span>{formatNumber((nutrient.sub[1].daily)/(recipe.yield))} {nutrient.sub[1].unit}</span>
                  </div>
                  <div>
                    <li>{nutrient.sub[2].label} </li>
                    <span>{formatNumber((nutrient.sub[2].total)/(recipe.yield))} %</span>
                    <span>{formatNumber((nutrient.sub[2].daily)/(recipe.yield))} {nutrient.sub[2].unit}</span>
                  </div>
                  <div>
                    <li>{nutrient.sub[3].label} </li>
                    <span>{formatNumber((nutrient.sub[3].total)/(recipe.yield))} %</span>
                    <span>{formatNumber((nutrient.sub[3].daily)/(recipe.yield))} {nutrient.sub[3].unit}</span>
                  </div>
                </ul>
            </ul>
            </>
          )
        }else {

          return(
            <>
            <div>
              <span>{nutrient?.label}</span>
              <span>{formatNumber((nutrient.total)/(recipe.yield))} {nutrient.unit}</span>
              <span>{formatNumber((nutrient.daily)/(recipe.yield))} %</span>
            </div>
          </>
        )
      }
      })
      
        
    }
  

  return (
    <div>
      <div>
        <div>
          <img src={recipe?.image} alt="" />
        </div>
        <div>
          <h1>{recipe?.label}</h1>
          <button>Add to Favorites</button>
        </div>
      </div>
      <div>
        <div>
          <h3>Ingredients:</h3><hr></hr>
          <p> {recipe?.ingredientLines?.join(', ')}</p>
        </div>
        <div>
          <h3>Nutrition :</h3><hr></hr>
          <div>
            <span>{formatNumber((recipe?.calories)/(recipe?.yield))}</span>
            <span>Calories / Serving</span>
          </div>
          <div>
            <span>{recipe?.yield}</span>
            <span>Servings</span><hr></hr>
          </div>
          <div>
            {recipe?.healthLabels?.join(', ')}
          </div>
          <div>
            {renderNutrients(recipe?.digest)}
          </div>
        </div>
      </div>
    </div>
  );
}
