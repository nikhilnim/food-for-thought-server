const express = require('express');
const router = express.Router();
const {getAllRecipes,createRecipe,getRecipesById,updateRecipe,deleteRecipe} = require('../controllers/recipeControllers')

router.route('/')
            .get(getAllRecipes)
            .post(createRecipe)

router.route('/:id')
            .get(getRecipesById)
            .put(updateRecipe)
            .delete(deleteRecipe)

module.exports = router;