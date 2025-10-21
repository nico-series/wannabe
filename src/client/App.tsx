import "./App.css";

import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Wannabe</h1>
      <p>Another Factorio tool</p>
      <p>Given a production goal, the form should return the necessary build requirements.</p>
      <form>
        <label htmlFor="goal">Production Goal:
          <input type="text" id="goal"></input>
        </label>
        <label htmlFor="quantity">Quantity: 
          <input type="number" id="quantity"></input>
        </label>
      </form>
    </div>
  );
}

export default App;
