const mongoose = require("mongoose"); //11
mongoose.set("strictQuery", true); //12
async function connectToMonggoDb(url) {
  return mongoose.connect(url);
}

module.exports = { connectToMonggoDb };
