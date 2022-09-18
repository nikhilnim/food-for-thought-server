const fs = require('fs');

function loadRecipeData(callback) {
  fs.readFile('./data/recipes.json', 'utf8', callback);
}

function saveRecipeData(data) {
  fs.writeFile('./data/recipes.json', data, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

module.exports = {
  loadRecipeData,
  saveRecipeData,
};
