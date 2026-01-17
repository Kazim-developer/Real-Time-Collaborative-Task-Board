const express = require("express");
const app = express();
const connectToDB = require("./connection");

connectToDB(
  "mongodb://adminUser:Admin106MongoDB@127.0.0.1:27017/boards-project?authSource=admin",
).then(() => {
  console.log("mongoDB is connected");
});

app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => console.log("backend server is running"));
