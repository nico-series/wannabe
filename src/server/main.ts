import express from "express";
import ViteExpress from "vite-express";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

// reserve 0000 for blank reipe
const recipes = [
  {id: "0001", name: "Small Thing", type: "Extraction", unit: "units/second", minQty: 0, maxQty: 5},
  {id: "0002", name: "Big Thing", type: "Intermediate", unit: "units/minute", minQty: 0, maxQty: 10000},
  {id: "0003", name: "Bright Thing", type: "Logistics", unit: "units/second", minQty: 0, maxQty: 10000}
]

app.get("/recipes", (_, res) => {
  res.send(recipes);
});

app.post("/requirements", (req, res) => {
  const goal = req.body;
  // validate the goal, does it match available recipes

  // do stuff with the goal
  
  res.send(JSON.stringify(goal));
});

ViteExpress.listen(app, +PORT, () => {
  console.log("Server is listening on port 3000...");
});
