import express from "express";
import ViteExpress from "vite-express";

const PORT = process.env.PORT || 3000;
// begone lowercase const!!!
const APP = express();

// reserve 0000 for blank reipe
const recipes = [
  {id: "0001", name: "Small Thing", type: "Extraction", unit: "units/second", minQty: 0, maxQty: 5},
  {id: "0002", name: "Big Thing", type: "Intermediate", unit: "units/minute", minQty: 0, maxQty: 10000},
  {id: "0003", name: "Bright Thing", type: "Logistics", unit: "units/second", minQty: 0, maxQty: 10000}
]

APP.get("/recipes", (_, res) => {
  res.send(recipes);
});

ViteExpress.listen(APP, +PORT, () =>
  console.log("Server is listening on port 3000..."),
);
