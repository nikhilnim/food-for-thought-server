const { v4: uuidv4 } = require("uuid");
const { loadUserData,saveUserData } = require("../models/userModels");
const jsonSecretKey = "f91e4494-04b3-4d49-8c27-57faed9e5785";
const jwt = require("jsonwebtoken");

function addUser(req, res){
  const { email, name, password } = req.body;
  loadUserData((err,data)=>{
    if(err){
      console.log(err)
    }else{
      const usersList = JSON.parse(data);
      const isUserPresent= usersList.some((user)=>{
        return user.email === email
      })
      if(!isUserPresent){
        let newUser = {
          id:uuidv4(),
          name:name,
          email:email,
          password:password,
          favRecipes:[]
        }
        let newUsersList = [...usersList,newUser]
        saveUserData(JSON.stringify(newUsersList))
        res.json({ success: "true" });
      }else{
        res.status(404).json("email id is already registered")
      }
      
    }
  })
}

function loginUser(req, res) {
  const { email, password } = req.body;
  loadUserData((err,data)=>{
    if(err){
      console.log(err)
    }else{
      const usersList = JSON.parse(data);
      let user = usersList.find((user)=>{
        if(user.email === email && user.password === password){
          return true
        }else{
          return false
        }
      })
      if(!user){
        res.status(404).send("no user")
      }else{
        res.json({ token: jwt.sign({ id: user.id }, jsonSecretKey) });
      }
    }
  })
};


function getUser(req,res){
  const {id:userId} = req.decode;
  loadUserData((err,data)=>{
    if(err){
      console.log(err)
    }else{
      const usersList = JSON.parse(data);
      let user = usersList.find((user)=>{
        if(userId === user.id){
          return true
        }else{
          return false
        }
      })
      let payload = {
        id:user.id,
        name:user.name,
        favRecipes:user.favRecipes
      }
      res.json(payload);
    }
  })
}

function addToFav(req,res){
  const {userId,recipeId} = req.body
  loadUserData((err,data)=>{
    if(err){
      console.log(err)
    }else{
      let usersList = JSON.parse(data)
      let indexOfUser = usersList.findIndex((user)=>{
        return user.id === userId
      })

      if(indexOfUser==-1){
        res.send("no user found")
        return 
      }

      const hasRecipe = usersList[indexOfUser].favRecipes.some((recipes)=>{
        return recipes.recipeId === recipeId
      })

      if(!hasRecipe){
        usersList[indexOfUser].favRecipes.push({recipeId:recipeId})
        saveUserData(JSON.stringify(usersList))
        res.send("recipe favroutie")
      }else{
        res.send("already has recipie to favourite")
      }
    }
  })
}
function removeFromFav(req,res){
  const {id:userId} = req.decode;
  const {recipeId} = req.params
  loadUserData((err,data)=>{
    if(err){
      console.log(err)
    }else{
      let userList = JSON.parse(data);
      let userIdx = userList.findIndex((user)=>{
        return userId === user.id
      })
      if(userIdx!==-1){
        let favRecipeIdx = userList[userIdx].favRecipes.findIndex((favRecipe)=>{
          return favRecipe.recipeId === recipeId
        })
        if(favRecipeIdx!==-1){
          let deletedRecipe = userList[userIdx].favRecipes.splice(favRecipeIdx,1)
          saveUserData(JSON.stringify(userList))
          res.json(deletedRecipe[0])
        }else{
          res.send("no recipe found")
        }
      }else{
        res.send("no user found")
      }
      
    }
  })
}
module.exports = {
  addUser,loginUser,getUser,addToFav,removeFromFav
}