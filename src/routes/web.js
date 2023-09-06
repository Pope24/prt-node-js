import express, { response } from "express";
import {
  getAboutPage,
  getBookingPage,
  getContactPage,
  getHomePage,
  getMenuPage,
} from "../controller/homeController";
import { saveNewBooking } from "../services/bookingService";
import { getAllDish, getAllMenu } from "../services/menuService";
// config firebase
const connection = require("../configs/database");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
const firebase = require("firebase/app");
const { getStorage, ref, uploadBytes } = require("firebase/storage");
const firebaseConfig = {
  apiKey: "AIzaSyCk2ldqQjqPIPAUBhZ8mErl9wA8c2ynXEw",
  authDomain: "lauhigh-903b2.firebaseapp.com",
  projectId: "lauhigh-903b2",
  storageBucket: "lauhigh-903b2.appspot.com",
  messagingSenderId: "1029118328898",
  appId: "1:1029118328898:web:961f6520ab93a56f4ceddb",
  measurementId: "G-0MEPW2BT4Y",
};
firebase.initializeApp(firebaseConfig);
const storage = getStorage();
const urlencodedParser = bodyParser.urlencoded({ extended: true });
// Send email
const nodemailer = require("nodemailer");

const router = express.Router();
router.get("/", async (req, res) => {
  let allMenu = await getAllMenu();
  let allDish = await getAllDish();
  return res.render("index.ejs", {
    message: req.flash("message"),
    menu: allMenu,
    dish: allDish,
  });
});
router.get("/about", (req, res) => {
  return res.redirect("/");
});
router.get("/menu", getMenuPage);
router.get("/booking", (req, res) => {
  return res.render("reservation.ejs", { message: req.flash("message") });
});
router.get("/contact", getContactPage);
router.post("/upload-image", upload.single("filename"), (req, res) => {
  const storageRef = ref(storage, req.file.originalname);
  uploadBytes(storageRef, req.file.buffer).then((snapshot) => {
    console.log("Upload successfully !!");
  });
});
router.post(
  "/booking",
  urlencodedParser,
  [
    check("nameCustomer", "Your name can not be blank").exists(),
    check("email", "Your email can not be blank").exists(),
    check("phoneNumber", "Your phone number can not be blank").exists(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.render("reservation.ejs");
    }
    const dateBooking = new Date(req.body.dateBooking);
    if (dateBooking < new Date()) {
      req.flash(
        "message",
        "Date booking must be greater or equally than today"
      );
      return res.redirect("/booking");
    }
    saveNewBooking(req, res);
    req.flash("message", "Booking successfully.");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "levanchinh2422003@gmail.com",
        pass: "osed ceou sddr bpzr",
      },
    });

    const mailOptions = {
      from: "chinhlvde170423@fpt.edu.vn", // sender address
      to: "levanchinh2422003@gmail.com", // list of receivers
      subject: "LauHigh Booking",
      template: "email", // the name of the template file i.e email.handlebars
      text: `Thông tin khách hàng đặt bàn:
            Tên: ${req.body.nameCustomer},
            Số điện thoại: ${req.body.phoneNumber},
            Email: ${req.body.email}
            Ngày đặt: ${req.body.dateBooking},
            Giờ đặt: ${req.body.timeBooking},
            Số lượng người: ${req.body.amountPerson}
            Vui lòng điện xác nhận !!!
      `,
    };

    // trigger the sending of the E-mail
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: " + info.response);
    });
    return res.redirect("/");
  }
);
router.post("/contact", (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "levanchinh2422003@gmail.com",
      pass: "osed ceou sddr bpzr",
    },
  });
  console.log(req.body);
  const mailOptions = {
    from: "chinhlvde170423@fpt.edu.vn", // sender address
    to: "levanchinh2422003@gmail.com", // list of receivers
    subject: "LauHigh Booking",
    template: "email", // the name of the template file i.e email.handlebars
    text: `Thông tin khách hàng cần liên hệ:
            Tên: ${req.body.nameCustomer},
            Số điện thoại: ${req.body.phoneNumber},
            Email: ${req.body.email},
            Số lượng người: ${req.body.message}
            Vui lòng điện xác nhận !!!
      `,
  };

  // trigger the sending of the E-mail
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: " + info.response);
  });
  return res.redirect("/");
});

export default router;
