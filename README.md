# Wannabe
Another Factorio App, *Author: nico-series*

## Behavior
As it's currently not past dev, run with: `npm run dev` then navigate to `http://localhost:3000/`.

It opens directly on the form, which allows the input of a recipe.

**WIP:** Given a production recipe, it should print out (_recursively_ for each input/ingredient):
- Fuel/Electricity consumed
- The number of perquisite buildings
- Pollution (pollution/minute)

The excel sheet it is replacing's niche is that it is extremely configurable by the user. The app aims to distinguish itself by _minimizing configuration effort_. Everything that can be safely assumed should be. ***This thing should be one page. No extra.***

### The Base Printout
There are three segments to the process of gathering input from the user. 
1. Global Configuration, which should definitely not need to be configured more than once a session
2. Production Goal, literally just the item and the rate of production needed
3. Assuming there are some assumptions we cannot make, some follow-up to answer those questions 

Then we do the calculations and print the thing. 

## Development Process

### Context
- Need to practice + showcase React 
- Spouse plays Factorio, has a nice excel sheet for calculating recipes but it is excessively configurable
- An app can do the same while automating away many of the tedious config

### Progress
- [x] 1. Base installation
    - Wanted to try out a **Node** alternative, therefore **Vite**
    - Wanted a monorepo **React**+**Express** setup for convenience, chose **Vite-Express** for this purpose
        - Despite choosing a Node alternative, I appear to still be using a lot of Node
    - Installed **Vitest** because it works with **Vite** and **Jest** didn't appear friendly to my setup on cursory look 
- [ ] 2. Build recipes form that uses mock data
    - 2 inputs, recipe and quantity
    - Mocked recipes should be fetched from the api
    - Relevant restrictions should be applied to quantity based on recipe
    - Test form behavior
- [ ] 3. Form submission and basic processing
    - Add submit button, send a recipe and quantity to backend
    - On backend, accept a recipe and quantity, validate it, error if incorrect, send ingredients back
    - Test submit button and backend erroring
- [ ] 4. Start playing with _a sample of_ actual data
    - Since this is a playful, experimental project, I will cross the "which database" bridge when I get to it
- [ ] 5. Add global config settings
    - Game state select, technology select
    - Send in api request
    - Support it on backend
- [ ] 6. Answer questions better left till we've seen basic app behavior
    - How difficult is it to include technologies as a recipe?
    - How difficult is it to model nuclear power?
    - Do I want to calculate optimal beacon/module config for the printout?
    - What do I want to do about data visualization?
    - Do I want to support mods?
- [ ] 7. Make it PRETTY
- [ ] 8. Add full dataset

### Open Questions

#### A Data Visualization Element
Recursive recipes could be visualized as a flow chart. If multiple paths are available, either multiple independent charts could be generated, or they could be visualized as a color-coded tree displaying the requirements for each recipe. In said tree, as a path diverges based on some decision, it would be identified by a different colors. Perhaps at render, if a preferred path is selected, it might be green, and deviations would be tones off from that green based on their efficiency / desirability. 

## Credits
- https://github.com/DaTrueBrad/ for the `vite-express` setup overview
