const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
async function connectToMonggoDb(url) {
  return mongoose.connect(url);
}

module.exports = { connectToMonggoDb };
