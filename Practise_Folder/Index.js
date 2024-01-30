const fs = require("fs");
const express = require("express");
const userRouter = require("./routes/Index");
const { connectMongoDB } = require("./DB/Connection");

const app = express();
const PORT = 4000;

connectMongoDB("mongodb://127.0.0.1:27017/learning_app2").then(() => {
  console.log(`database connection established`);
});

// a middleware to get the body data
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/users", userRouter);

app.listen(PORT, (req, res) => {
  console.log(`listening on port ${PORT}`);
});
