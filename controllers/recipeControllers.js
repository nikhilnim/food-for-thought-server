const { v4: uuidv4 } = require("uuid");
const { loadRecipeData, saveRecipeData } = require("../models/recipeModels");

function getAllRecipes(req, res) {
  loadRecipeData((err, data) => {
    if (err) {
      res.send("error getting recipes data");
    } else {
      const recipes = JSON.parse(data);
      res.json(recipes);
    }
  });
}

function getRecipesById(req, res) {}

function createRecipe(req, res) {
  const { body: recipe } = req;
  console.log(recipe)
  if (
    !recipe.title ||
    !recipe.intro ||
    !recipe.type ||
    !recipe.prepTime ||
    !recipe.cookTime ||
    !recipe.serving ||
    !recipe.ingredient ||
    !recipe.nutrition.calories ||
    !recipe.nutrition.carbs ||
    !recipe.nutrition.protein ||
    !recipe.nutrition.fat || 
    !recipe.direction   
  ) {
    res.status(206).send('Partial Content')
    return
  }

  let newRecipe = {
    id:uuidv4(),
    title:recipe.title,
    type:recipe.type,
    image:recipe.image = 'default.jpg',
    cookTime:recipe.cookTime,
    direction:recipe.direction,
    nutrition:{
      calories:recipe.nutrition.calories,
      fat:recipe.nutrition.fat,
      protein:recipe.nutrition.protein,
      carbs:recipe.nutrition.carbs,
    },
    ingredient:recipe.ingredient,
    intro:recipe.intro,
    prepTime:recipe.prepTime,
    serving:recipe.serving,
    rating:[{
      rating: 4.5,
      memberId:1,
      comment:"added zucchinni and summer squash and really like it with more vegetables",
      timeStamp:1519211809934
    }]
  }
  console.log("new", newRecipe)
  // loadRecipeData((err, data)=>{
  //   if(err){
  //     res.send("error reading file")
  //   }else{
  //     let allRecipes = JSON.parse(data)
  //     let newRecipes = [...allRecipes,newRecipe]
  //     saveRecipeData(newRecipes)
  //     res.json(newRecipe)
  //   }

  // })

}

function updateRecipe(req, res) {}

function deleteRecipe(req, res) {}


module.exports = {
  getAllRecipes,
  createRecipe,
  getRecipesById,
  updateRecipe,
  deleteRecipe,
};
