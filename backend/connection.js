const mongoose = require("mongoose");

async function connectToDB(url, authentication) {
  return mongoose.connect(url, authentication);
}

module.exports = connectToDB;
