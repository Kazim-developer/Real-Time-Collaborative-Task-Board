const express = require("express");
const app = express();
const cors = require("cors");
const connectToDB = require("./connection");
const router = require("./routes/userLogin");

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(router);

connectToDB(
  "mongodb://adminUser:Admin106MongoDB@127.0.0.1:27017/boards-project?authSource=admin",
).then(() => {
  console.log("mongoDB is connected");
});

app.listen(3000, () => console.log("backend server is running"));
