import React, { useState, useEffect } from 'react';

/**
 * Unlikely that the app utilizes multiple forms as that currently is beyond scope
 * However, it seems prudent to separate this guy out from the main app component just in case, so I shall
 * 
 * @returns a view of the production recipes form prompting the user for a recipe to calculate requirements for
 */
export default function RecipesForm() {
  const BLANK_RECIPE = "0000";

  const [recipe, setRecipe] = useState(BLANK_RECIPE);
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
      // TODO: will want to verify error behavior is satisfactory once API is active
      console.log("NICO: " + err.message);
    });
  }, []);

  return (
    <>
      <p>Given a production recipe, the form should return the necessary build requirements.</p>
      <form>
        <label htmlFor="recipe">Recipe:
          <select id="recipe" name="recipe" value={recipe} onChange={(e) => setRecipe(e.target.value)}>
            { recipes.map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </label>
        <label htmlFor="quantity">Quantity: 
          <input type="number" id="quantity"></input>
        </label>
      </form>
      <p>Current recipe: { recipe }</p>
    </>
  );
}

interface Recipe {
  id: string;
  name: string;
  type: string;
}