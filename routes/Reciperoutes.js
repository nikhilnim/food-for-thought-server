const express = require('express');
const router = express.Router();
const {getAllRecipes,createRecipe,getRecipesById,updateRecipe,deleteRecipe} = require('../controllers/recipeControllers')

const multer  = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage })

router.route('/')
            .get(getAllRecipes)
            .post(createRecipe,upload.single('fileImg'))

router.route('/:id')
            .get(getRecipesById)
            .put(updateRecipe)
            .delete(deleteRecipe)

module.exports = router;