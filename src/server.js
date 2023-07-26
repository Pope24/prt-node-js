import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./routes/web";

const app = express();
const port = process.env.PORT;
require("dotenv").config();

// Configure view engine for server-side rendering of views using ReactJS
configViewEngine(app);
// Configure init web router
initWebRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
