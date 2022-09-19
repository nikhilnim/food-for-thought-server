const { v4: uuidv4 } = require('uuid');
const { loadRecipeData,
  saveRecipeData, } = require('../models/recipeModels');

function getAllRecipes(req,res){
  loadRecipeData((err, data) => {
        if (err) {
          res.send('error getting recipes data');
        } else {
          const recipes = JSON.parse(data);
          res.json(recipes);
        }
      });
}

function getRecipesById(req,res){

}

function createRecipe(req,res){

}

function updateRecipe(req,res){

}

function deleteRecipe(req,res){

}

module.exports = {
    getAllRecipes,createRecipe,getRecipesById,updateRecipe,deleteRecipe
}