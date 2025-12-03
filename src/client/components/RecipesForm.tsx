import React, { useState, useEffect } from 'react';

/**
 * Unlikely that the app utilizes multiple forms as that currently is beyond scope
 * However, it seems prudent to separate this guy out from the main app component just in case, so I shall
 * 
 * @returns a form which gathers recipe criteria used to calculate the production requirements
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

  // TODO: is this even a decent approach? should i <any>
  const [recipe, setRecipe] = useState<Recipe>(BLANK_RECIPE);
  const [quantity, setQuantity] = useState(0);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  
  /**
   * Use Effect
   * fetch and set recipe options
   * in angular this would be in a service but it looks tidy at this scale & scope so it's fine
   * it would probably be best to use an await fetch format
   */
  useEffect(() => {
    fetch('/recipes')
    .then((res) => res.json())
    .then((data) => {
      setRecipes(data);
    })
    .catch((err) => {
      // TODO: communicate with user on failure
      console.log("NICO: " + err.message);
    });
  }, []);

  /**
   * Handle Recipe Change
   * set current recipe, reset other form fields, describe recipe for user
   */
  const handleRecipeChange = (recipeId : string) => {
    let currRecipe = recipes.find(({id}) => id === recipeId);
    if (currRecipe) {
      setQuantity(0);
      setRecipe(currRecipe);
    } else {
      console.log(`NICO: ${recipeId} does not correspond to a real recipe.`);
    }
    
  }
  /**  
   * Handle Quantity Change
   * trigger any non-range validation with user feedback
   */
  const handleQtyChange = (qty : string) => {
    if (!isNaN(Number(qty))) {
          setQuantity(Number(qty));
    } else {
      // TODO: communicate with user via decent visible error messages, this should be reusable
      console.log(`NICO: Somehow ${qty}, collected from a number input, is NaN.`);
    }
  }

  /**
   * Handle Submit
   * submit the form, send selected recipe and quantity for processing
   */
  const handleSubmit = (e : any) => {
   e.preventDefault();
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
          <button style={{display: "block", margin: "5px auto"}} type="submit" onClick={(e) => handleSubmit(e)}>Calculate Requirements</button>
      </form>
      <p>Current recipe: {recipe.type}: {quantity} {recipe.name}&#40;s&#41; in {recipe.unit}</p>
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