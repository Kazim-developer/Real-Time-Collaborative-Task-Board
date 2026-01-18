const express = require("express");
const app = express();
const cors = require("cors");
const connectToDB = require("./connection");
const router = require("./routes/userLogin");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api", router);

connectToDB(
  "mongodb://adminUser:Admin106MongoDB@127.0.0.1:27017/boards-project?authSource=admin",
).then(() => {
  console.log("mongoDB is connected");
});

app.listen(process.env.PORT, () => console.log("backend server is running"));
