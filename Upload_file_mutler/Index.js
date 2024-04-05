const path = require("path");
const express = require("express");
const multer = require("multer");

const app = express();
const PORT = 9000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });
// const upload = multer({ dest: "uploads/" }); // to put file inside upload folder

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: true })); // middleware help tohandeldata in form type

app.get("/", (req, res) => {
  return res.render("homepage");
});

app.post(
  "/upload",
  upload.fields([{ name: "profileImage" }, { name: "coverImage" }]),
  (req, res) => {
    console.log(req.body);
    console.log(req.file);

    return res.redirect("/");
  }
);

app.listen(PORT, () => console.log(`server has started on port:${PORT}`));
