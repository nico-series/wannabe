import { response } from 'express';
import { resolve } from 'node:path';
import React, { useState, useEffect, FormEvent } from 'react';

/**
 * Unlikely that the app utilizes multiple forms as that currently is beyond scope
 * However, it seems prudent to separate this guy out from the main app component just in case, so I shall
 * 
 * @returns a form which gathers recipe criteria used to calculate the production requirements
 */
export default function RecipesForm() {
  // not sure how I feel about declaring a bunch of empty items long before they are needed
  const [recipe, setRecipe] = useState({} as Recipe);
  const [quantity, setQuantity] = useState(0);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [requirements, setRequirements] = useState({} as Goal);
  
  /**
   * Use Effect - RECIPES
   * Fetch and set recipe options
   * In Angular this would be in a service but it looks tidy at this scale & scope so it's fine
   */
  useEffect(() => {
    fetch('/recipes')
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data[0]);
        setRecipes(data);
      })
      .catch((err) => {
        // TODO: communicate with user on failure
        console.log("NICO : failed initial recipe fetching : " + err.message);
      });
  }, []);

  /**
   * Use Effect - REQUIREMENTS
   * Display the requirements
   * Don't really like that the fetch is in the useEffect above and triggering useEffect below it feels inconsistent
   */
  useEffect(() => {
    console.log(`NICO: The requirements are ${requirements?.id} ${requirements?.qty}`);
  }, [requirements]);

  /** ----- HANDLE INTERACTIONS ----- */

  /**
   * Handle Recipe Change
   * Set current recipe, reset other form fields, describe recipe for user
   */
  const handleRecipeChange = (recipeId : string) => {
    let currRecipe = recipes.find(({id}) => id === recipeId);
    if (currRecipe) {
      setQuantity(0);
      setRecipe(currRecipe);
    } else {
      console.log(`NICO : ${recipeId} does not correspond to a real recipe.`);
    }
  }

  /**  
   * Handle Quantity Change
   * Trigger any non-range validation with user feedback
   */
  const handleQtyChange = (qty : string) => {
    if (!isNaN(Number(qty))) {
          setQuantity(Number(qty));
    } else {
      // TODO: communicate with user via decent visible error messages, this should be reusable
      console.log(`NICO : Somehow ${qty}, collected from a number input, is NaN`);
    }
  }

  /**
   * Handle Submit
   * Submit the form, send selected recipe and quantity for processing
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const recipeId = recipe.id; 

    const goal : Goal = {id: recipeId, qty: quantity};

    // fetch
    fetch('/requirements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(goal)
    })
    .then(res => res.json())
    .then(reqs => setRequirements(reqs))
    .catch((err) => {
      // TODO: communicate with user on failure
      console.log("NICO : failed post to calculate requirements : " + err.message);
    });
  }

  /** ----- RETURN ----- */

  return (
    <>
      <p>Given a production recipe, the form should return the necessary build requirements.</p>
      { recipes.length > 0 && (
        <form>
          <label htmlFor="recipe">Recipe:
            <select id="recipe" name="recipe" onChange={(e) => handleRecipeChange(e.target.value)} defaultValue={recipe.id}>
              { recipes.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </label>
          <label htmlFor="quantity">Quantity: 
            <input type="number" id="quantity" min={recipe.minQty} max={recipe.maxQty} value={quantity} onChange={(e) => handleQtyChange(e.target.value)}></input>
            <span>{recipe.unit}</span>
          </label>
          <button style={{display: "block", margin: "5px auto"}} type="submit" onClick={(e) => handleSubmit(e)}>Calculate Requirements</button>
        </form>
      )}
      <p>Current recipe: {quantity} {recipe.name} &#40;id#{recipe.id}&#41; in {recipe.unit} </p>
      { requirements && (
        <p>Submitted recipe: {requirements?.qty} id#{requirements?.id}</p>
      )}
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

interface Goal {
  id: string;
  qty: number;
}