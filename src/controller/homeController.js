const connection = require("../configs/database");
const { getAllMenu, getAllDish } = require("../services/menuService");

const getHomePage = (req, res) => {
  return res.render("index.ejs");
};
const getAboutPage = (req, res) => {
  return res.render("about.ejs");
};
const getMenuPage = async (req, res) => {
  let allMenu = await getAllMenu();
  let allDish = await getAllDish();
  return res.render("menu.ejs", {
    menu: allMenu,
    dish: allDish,
  });
};
const getBookingPage = (req, res) => {
  return res.render("reservation.ejs");
};
const getContactPage = (req, res) => {
  return res.render("contact.ejs");
};
module.exports = {
  getAboutPage,
  getHomePage,
  getMenuPage,
  getBookingPage,
  getContactPage,
};
