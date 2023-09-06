const connection = require("../configs/database");
const saveNewBooking = (req, res) => {
  console.log("new booking :" + JSON.stringify(req.body));
  const dateString = req.body.dateBooking;
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1; // Note: Month is zero-based in JavaScript, so add 1
  const day = dateObject.getDate();

  // Ensure that month and day have two digits (e.g., 01 for January, 07 for July)
  const formattedMonth = month.toString().padStart(2, "0");
  const formattedDay = day.toString().padStart(2, "0");

  // Create the MySQL-compatible date string
  const mysqlDate = `${year}-${formattedMonth}-${formattedDay}`;
  connection.query(
    `INSERT INTO booking (
        name_customer, phone_number, email, 
        date_booking, time_booking, 
        amount_customer, status_booking)
    VALUES (?, ?, ?, ?, ?, ?, ?);`,
    [
      req.body.nameCustomer,
      req.body.phoneNumber,
      req.body.email,
      mysqlDate,
      req.body.timeBooking,
      req.body.amountPerson,
      0,
    ],
    function (err, results) {
      console.log(results);
      console.log(err);
    }
  );
};
module.exports = {
  saveNewBooking,
};
