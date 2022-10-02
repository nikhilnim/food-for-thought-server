const fs = require('fs');

function loadUserData(callback) {
  fs.readFile('./data/users.json', 'utf8', callback);
}

function saveUserData(data) {
  fs.writeFile('./data/users.json', data, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

module.exports = {
  loadUserData,
  saveUserData,
};
