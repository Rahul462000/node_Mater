const express = require("express");
const mongoose = require("mongoose");
const path = require("path"); //2 works with path for views folder
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const cookieParser = require("cookie-parser");

const blog = require("./models/Blog");

const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const app = express();
const PORT = 8000;

mongoose
  .connect("mongodb://127.0.0.1:27017/blogify")
  .then((e) => console.log("MongoDb connected"));

app.set("view engine", "ejs"); // 1.first middleware
app.set("views", path.resolve("./views")); // 2.setting path for viewa folder

app.use(express.urlencoded({ extended: false })); //this is the form data middleware
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

// 3. here we are rendering the HOME page with routing
app.get("/", async (req, res) => {
  const allBlogs = await blog.find({});
  res.render("Home", {
    user: req.user,
    blogs: allBlogs,
  });
});
// 3

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
  console.log(`server running on  port"${PORT}`);
});
