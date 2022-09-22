const express = require('express');
const router = express.Router();
const {getAllRecipes,createRecipe,getRecipesById,updateRecipe,deleteRecipe,getRecipeBySortProtein} = require('../controllers/recipeControllers')

const multer  = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function (req, file, cb) {
    console.log("file",file)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const filname = `${uniqueSuffix}${file.originalname}`
    file.imageName = filname
    cb(null, `${filname}`)
  }
});

const upload = multer({ storage: storage })

router.route('/')
            .get(getAllRecipes)
            .post(upload.single('image'),createRecipe);

// router.route("/sort").get(getRecipeBySort)  

router.route('/:id')
            .get(getRecipesById)
            .put(upload.single('image'),updateRecipe)
            .delete(deleteRecipe);
      


router.route('/protein/:val').get(getRecipeBySortProtein)
// router.route('/calories/:val').get()
// router.route('/protein/:val/calories/:val').get()
// router.route('/calories/:val/protein/:val').get()
module.exports = router;