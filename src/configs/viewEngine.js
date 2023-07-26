import express from "express";
const configViewEngine = (app) => {
  // Config static file
  app.use(express.static("./src/public"));

  // Config template engine
  app.set("view engine", "ejs");
  app.set("views", "./src/views");
};
export default configViewEngine;
