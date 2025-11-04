import React, { useState, useEffect } from 'react';

/**
 * Unlikely that the app utilizes multiple forms as that currently is beyond scope
 * However, it seems prudent to separate this guy out from the main app component just in case, so I shall
 * 
 * @returns a view of the production goals form prompting the user for a goal to calculate requirements for
 */
export default function ProdGoalsForm() {
  const [goal, setGoal] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [goalOpts, setGoalOpts] = useState(['goal1', 'goal2', 'goal3']);
  
  // fetch goal options, should run once on initial render due to empty dependencies
  useEffect(() => {
    fetch('what the heck our api does')
    .then((res) => res.json())
    .then((data) => {
      setGoalOpts(data);
    })
    .catch((err) => {
      // TODO: will want to verify error behavior is satisfactory
      console.log(err.message);
    });
  }, []);

  // form behavior
  function handleGoalChange() {
    // TODO: set the goal
  };

  return (
    <>
      <p>Given a production goal, the form should return the necessary build requirements.</p>
      <form>
        <label htmlFor="goal">Goal:
          <select id="goal" name="goal" value={goal} onChange={handleGoalChange}>
            { goalOpts.map(goal => (
              <option key={goal} value={goal}>{goal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="quantity">Quantity: 
          <input type="number" id="quantity"></input>
        </label>
      </form>
    </>
  );
}
