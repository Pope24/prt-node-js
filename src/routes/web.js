import express from "express";
let router = express.Router();
const initWebRoute = (app) => {
  router.get("/", (req, res) => {
    res.render("index.ejs");
  });
  router.get("/infor", (req, res) => {
    res.send("Thong tin them");
  });
  return app.use("/", router);
};
export default initWebRoute;
