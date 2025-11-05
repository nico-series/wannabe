import express from "express";
import ViteExpress from "vite-express";

const PORT = process.env.PORT || 3000;
// begone lowercase const!!!
const APP = express();

// reserve 0000 for blank reipe
const recipes = [
  {id: "0001", name: "Iron Mining", type: "Extraction"},
  {id: "0002", name: "Engine Units", type: "Intermediate"},
  {id: "0003", name: "Lamps", type: "Logistics"}
]

APP.get("/recipes", (_, res) => {
  res.send(recipes);
});

ViteExpress.listen(APP, +PORT, () =>
  console.log("Server is listening on port 3000..."),
);
