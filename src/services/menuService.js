const connection = require("../configs/database");
const getAllMenu = async (req, res) => {
  let [results, fields] = await connection.execute(`select * from menu`);
  return [...results];
};
const getAllDish = async (req, res) => {
  let [results, fields] = await connection.execute(
    `select * from menu where is_food = 1`
  );
  return [...results];
};
module.exports = { getAllMenu, getAllDish };
