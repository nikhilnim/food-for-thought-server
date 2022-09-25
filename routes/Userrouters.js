const express = require("express");
const router = express.Router();
const {addUser,loginUser,getUser} = require("../controllers/userController");
const jwt = require("jsonwebtoken");
const jsonSecretKey = "f91e4494-04b3-4d49-8c27-57faed9e5785";

router.use((req, res, next) => {
  // Signup and login are public URLs that don't require a token
  if (req.url === "/signup" || req.url === "/login") {
    next();
  } else {
    // Format of request is BEARER <token>. Splitting on ' ' will create an
    // array where the token is at index 1
    const token = getToken(req);

    if (token) {
      console.log('Auth Token:', token);
      if (jwt.verify(token, jsonSecretKey)) {
        // Decode the token to pass along to end-points that may need
        // access to data stored in the token.
        req.decode = jwt.decode(token);
        next();
      } else {
        res.status(403).json({ error: "Not Authorized." });
      }
    } else {
      res.status(403).json({ error: "No token. Unauthorized." });
    }
  }
});

function getToken(req) {
  return req.headers.authorization.split(" ")[1];
}


router.route("/signup").post(addUser);
router.route("/login").post(loginUser);
router.route("/profile").get(getUser)
module.exports = router;