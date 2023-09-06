require("dotenv").config();
import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./routes/web";

const app = express();
const port = process.env.PORT;
const session = require("express-session");
const flush = require("connect-flash");
const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Configure session
app.use(
  session({
    secret: "secret",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flush());
// Configure view engine for server-side rendering of views using ReactJS
configViewEngine(app);
// Configure init web router
app.use("/", initWebRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
