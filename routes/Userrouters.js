const express = require("express");
const router = express.Router();
const {addUser,loginUser,getUser,addToFav,removeFromFav} = require("../controllers/userController");
const jwt = require("jsonwebtoken");
const jsonSecretKey = "f91e4494-04b3-4d49-8c27-57faed9e5785";

router.use((req, res, next) => {
  if (req.url === "/signup" || req.url === "/login") {
    next();
  } else {
    // Format of request is BEARER <token>. Splitting on ' ' will create an
    // array where the token is at index 1
    const token = getToken(req);

    if (token) {
      console.log(req.headers.authorization);
      if (jwt.verify(token, jsonSecretKey)) {
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
router.route("/favrecipe").post(addToFav)
router.route("/favrecipe/:recipeId").delete(removeFromFav)

module.exports = router;