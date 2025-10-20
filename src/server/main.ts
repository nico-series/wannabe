import express from "express";
import ViteExpress from "vite-express";

const PORT = process.env.PORT || 3000;
// i understand that app is usually lowercase but if it is a const right next to other consts this is painful
const app = express();

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

ViteExpress.listen(app, +PORT, () =>
  console.log("Server is listening on port 3000..."),
);
