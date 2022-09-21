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

function getRecipesById(req, res) {
  loadRecipeData((err,data)=>{
    if(err){
      res.status(500).send('File Read err')
    }else{
      let allRecipes = JSON.parse(data)
      let foundRecipe = allRecipes.find((e)=>{
        return e.id === req.params.id
      })
      res.json(foundRecipe)
    }
  })
}

function createRecipe(req, res) {
  const { body: recipe } = req;
  if (
    !recipe.title ||
    !recipe.intro ||
    !recipe.type ||
    !recipe.prepTime ||
    !recipe.cookTime ||
    !recipe.serving ||
    !recipe.ingredient ||
    !recipe.calories ||
    !recipe.carbs ||
    !recipe.protein ||
    !recipe.fat || 
    !recipe.direction   
  ) {
    res.status(206).send('Partial Content')
    return
  }

  let newRecipe = {
    id:uuidv4(),
    title:recipe.title,
    type:recipe.type,
    image:req.file ? req.file.imageName  : 'placeimg_633_411_tech.jpg',
    cookTime:recipe.cookTime,
    direction:recipe.direction,
    nutrition:{
      calories:recipe.calories,
      fat:recipe.fat,
      protein:recipe.protein,
      carbs:recipe.carbs,
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
    }],
    timeStamp:Date.now()
  }

  loadRecipeData((err, data)=>{
    if(err){
      res.send("error reading file")
    }else{
      let allRecipes = JSON.parse(data)
      let newRecipes = [...allRecipes,newRecipe]
      saveRecipeData(JSON.stringify(newRecipes))
      res.end()
    }

  })

}

function updateRecipe(req, res) {
  const { body: recipe } = req;
  if (
    !recipe.title ||
    !recipe.intro ||
    !recipe.type ||
    !recipe.prepTime ||
    !recipe.cookTime ||
    !recipe.serving ||
    !recipe.ingredient ||
    !recipe.calories ||
    !recipe.carbs ||
    !recipe.protein ||
    !recipe.fat || 
    !recipe.direction   
  ) {
    res.status(206).send('Partial Content')
    return
  }

  let updatedRecipe = {
    id:req.params.id,
    title:recipe.title,
    type:recipe.type,
    image:req.file ? req.file.imageName  : recipe.ogiImageName,
    cookTime:recipe.cookTime,
    direction:recipe.direction,
    nutrition:{
      calories:recipe.calories,
      fat:recipe.fat,
      protein:recipe.protein,
      carbs:recipe.carbs,
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
    }],
    timeStamp:Date.now()
  }
  console.log(updatedRecipe)
  loadRecipeData((err, data)=>{
    if(err){
      res.send("error reading file")
    }else{
      let allRecipes = JSON.parse(data)
      let recipeIndex = allRecipes.findIndex((e)=>{
          return e.id === req.params.id
      })
      allRecipes.splice(recipeIndex,1,updatedRecipe)
      console.log(allRecipes)
      saveRecipeData(JSON.stringify(allRecipes))
      res.json(updatedRecipe)
    }
  })
}

function deleteRecipe(req, res) {}


module.exports = {
  getAllRecipes,
  createRecipe,
  getRecipesById,
  updateRecipe,
  deleteRecipe,
};
