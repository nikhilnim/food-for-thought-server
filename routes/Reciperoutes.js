const express = require("express");
const router = express.Router();
const {
  getAllRecipes,
  createRecipe,
  getRecipesById,
  updateRecipe,
  deleteRecipe,
  getRecipeBySortProtein,
  getRecipeBySortCalories,
  getRecipeByProteinAndCalories
} = require("../controllers/recipeControllers");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filname = `${uniqueSuffix}${file.originalname}`;
    cb(null, `${filname}`);
  },
});

const upload = multer({ storage: storage });

router.route("/").get(getAllRecipes).post(upload.single("image"), createRecipe);

router
  .route("/:id")
  .get(getRecipesById)
  .put(upload.single("image"), updateRecipe)
  .delete(deleteRecipe);

router.route("/protein/:val").get(getRecipeBySortProtein);
router.route("/calories/:val").get(getRecipeBySortCalories);
router.route("/protein/:proVal/calories/:calVal").get(getRecipeByProteinAndCalories);
// router.route('/calories/:val/protein/:val').get()
module.exports = router;
