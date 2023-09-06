// config firebase
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const firebaseConfig = {
  apiKey: "AIzaSyCk2ldqQjqPIPAUBhZ8mErl9wA8c2ynXEw",
  authDomain: "lauhigh-903b2.firebaseapp.com",
  projectId: "lauhigh-903b2",
  storageBucket: "lauhigh-903b2.appspot.com",
  messagingSenderId: "1029118328898",
  appId: "1:1029118328898:web:961f6520ab93a56f4ceddb",
  measurementId: "G-0MEPW2BT4Y",
};
module.exports = {
  upload,
  firebaseConfig,
};
