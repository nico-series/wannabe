import React, { useState, useEffect } from 'react';

/**
 * Unlikely that the app utilizes multiple forms as that currently is beyond scope
 * However, it seems prudent to separate this guy out from the main app component just in case, so I shall
 * 
 * @returns a view of the production recipes form prompting the user for a recipe to calculate requirements for
 */
export default function RecipesForm() {
  const BLANK_RECIPE : Recipe = {
    id: "0000",
    name: "Please select a recipe",
    type: "",
    unit: "",
    minQty: 0,
    maxQty: 1,
  }
  // so in a work setting ive seen folks just slap <any> here but id like to know a better way to force type it and not fly by the seat of my pants
  // i could also just lock the quantity field rather than filling it with blank data, see if there is a way for it to not be upset until the fields are set
  const [recipe, setRecipe] = useState<Recipe>(BLANK_RECIPE);
  const [quantity, setQuantity] = useState(0);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  
  // fetch recipe options, should run once on initial render due to empty dependencies
  useEffect(() => {
    fetch('/recipes')
    .then((res) => res.json())
    .then((data) => {
      setRecipes(data);
    })
    .catch((err) => {
      console.log("NICO: " + err.message);
    });
  }, []);

  /**
   * since recipe select will grab an id which we need multiple recipe fields pertaining to
   * we need to grab the recipe, then set the relevant validation and notes
   */
  const handleRecipeChange = (recipeId : string) => {
    let currRecipe = recipes.find(({id}) => id === recipeId);
    if (currRecipe) {
      setRecipe(currRecipe);
    } else {
      console.log(`NICO: ${recipeId} does not correspond to a real recipe.`);
    }
    
  }
  /**  
   * quantity will likely have recipe-specific validation
   * but only whats needed for user ease (what ranges are acceptable)
   * most safety checking should be in the backend
   * because all the client tomfoolery is visible in the browser
   */
  const handleQtyChange = (qty : string) => {
    if (!isNaN(Number(qty))) {
          setQuantity(Number(qty));
    } else {
      // TODO: communicate with user via decent visible error messages
      console.log(`NICO: Somehow ${qty}, collected from a number input, is NaN.`);
    }
  }

  return (
    <>
      <p>Given a production recipe, the form should return the necessary build requirements.</p>
      <form>
        <label htmlFor="recipe">Recipe:
          <select id="recipe" name="recipe" onChange={(e) => handleRecipeChange(e.target.value)}>
            { recipes.map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </label>
          { recipe.id !== "0000" && (
            <label htmlFor="quantity">Quantity: 
              <input type="number" id="quantity" min={recipe.minQty} max={recipe.maxQty} value={quantity} onChange={(e) => handleQtyChange(e.target.value)}></input>
              <span>{recipe.unit}</span>
            </label>
          )}
      </form>
      <p>Current recipe: { recipe.name }</p>
    </>
  );
}

interface Recipe {
  id: string;
  name: string;
  type: string;
  unit: string;
  minQty: number;
  maxQty: number;
}