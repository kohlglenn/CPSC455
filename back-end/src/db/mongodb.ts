const mongoose = require("mongoose");
const queries = require("./queries");
const generateData = require("./generateData").generateData;

dbstart().catch((err) => console.log(err));
async function dbstart() {
  // await mongoose.connect('mongodb://localhost:27017/sandbox');
  //generateData();
}

module.exports = queries;
