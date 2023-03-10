import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Recipe() {
  const [recipe, setRecipe] = useState({});

  const { uri } = useParams();
  const decodedUri = decodeURIComponent(uri);


  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2/${decodedUri}?type=public&app_id=4e82b945&app_key=3bbe44949886764a36f0e18fcf1fc6dc`);
      const data = await response.json();
      setRecipe(data.recipe);
    }

    fetchRecipe();
  }, [decodedUri]);

  function formatNumber(number) {
    return Number(number.toFixed(0));
  }
  const renderNutrients=(arr)=>{
    if(!arr){
      return null;
    }
      return arr.map((nutrient )=>{
        if(nutrient.label === 'Fat' || nutrient.label === 'Carbs'){
          return(
            
              <div className='info'>
                
                  <span className='nutrient'>{nutrient.label} </span>
                  <div className="units-div">
                    <span className='unit'>{" "}{formatNumber((nutrient.total)/(recipe.yield))}{" "}{nutrient.unit}</span>
                    <span className='unit'>{" "}{formatNumber((nutrient.daily)/(recipe.yield))} %</span>
                  </div>
                
             
              
                <ul>
                  <div className='info sub-info'>
                    <li >
                      <span className='nutrient'>{nutrient?.sub[0].label} </span>
                      <div className="units-div">
                        <span className='unit'>{" "}{formatNumber((nutrient.sub[0].total)/(recipe.yield))}{" "}{nutrient.sub[0].unit}</span>
                        <span className='unit'>{" "}{formatNumber((nutrient.sub[0].daily)/(recipe.yield))} %</span>
                      </div>
                    </li>
                  </div>
                  <div className='info sub-info'>
                    <li >
                      <span className='nutrient'>{nutrient.sub[1].label} </span>
                      <div className="units-div">
                        <span className='unit'>{" "}{formatNumber((nutrient.sub[1].total)/(recipe.yield))}{" "}{nutrient.sub[1].unit}</span>
                        <span className='unit'>{" "}{formatNumber((nutrient.sub[1].daily)/(recipe.yield))} %</span>
                      </div>
                    </li>
                  </div>
                  <div className='info sub-info'>
                    <li >
                      <span className='nutrient'>{nutrient.sub[2].label} </span>
                      <div className="units-div">
                        <span className='unit'>{" "}{formatNumber((nutrient.sub[2].total)/(recipe.yield))}{" "}{nutrient.sub[2].unit}</span>
                        <span className='unit'>{" "}{formatNumber((nutrient.sub[2].daily)/(recipe.yield))} %</span>
                      </div>
                    </li>
                  </div>
                  <div className='info sub-info'>
                    <li >
                      <span className='nutrient'>{nutrient.sub[3].label}</span> 
                      <div className="units-div">
                        <span className='unit'>{" "}{formatNumber((nutrient.sub[3].total)/(recipe.yield))}{" "}{nutrient.sub[3].unit}</span>
                        <span className='unit'>{" "}{formatNumber((nutrient.sub[3].daily)/(recipe.yield))}%</span>
                      </div>
                    </li>
                  </div>
                </ul>
           </div>
          );
        }else {

          return(
            <div className='info'>
              <span className='nutrient'>{nutrient?.label}</span>
              <div className="units-div">
                <span className='unit'>{" "}{formatNumber((nutrient.total)/(recipe.yield))}{" "}{nutrient.unit}</span>
                <span className='unit'>{" "}{formatNumber((nutrient.daily)/(recipe.yield))} %</span>
              </div>
            </div>
        )
      }
      })
      
        
    }
  

  return (
    <div className='container'>
      <div className='header-recipe'>
        <div className='header-image'>
          <img src={recipe?.image} alt="" />
        </div>
        <div className='recipe-title'>
          <h1>{recipe?.label}</h1>
          <button>Add to Favorites</button>
        </div>
      </div>
      <div className='info-list'>
        <div className='ingredients'>
          <h3>{recipe?.ingredients?.length}{' '}Ingredients:</h3><hr></hr>
          {recipe?.ingredientLines?.map((line)=>{ return <p>{line}</p>})}
        </div>
        <div className='nutrients'>
          <h3>Nutrition :</h3><hr></hr>
          <div className='servings'>
            <div>
              <span>{formatNumber((recipe?.calories)/(recipe?.yield))}{" "}</span>
              <span>Calories / Serving</span>
            </div>
            <div>
              <span>{recipe?.yield}{" "}</span>
              <span>Servings</span>
            </div>
          </div>
          <div className='health-labels'>
           <hr></hr><span> {recipe?.healthLabels?.join(', ')}</span> <hr></hr>
          </div>
          <div className='recipe-digest'>
            {renderNutrients(recipe?.digest)}
          </div>
        </div>
      </div>
    </div>
  );
}
