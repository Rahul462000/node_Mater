const { Router } = require("express");
const multer = require("multer");
const router = Router();
const path = require("path");

const BLog = require("../models/Blog");

const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`));
  },
  filename: function (req, file, cb) {
    const fileNme = `${Date.now()}-${file.originalname}`;
    cb(null, fileNme);
  },
});

const upload = multer({ storage: Storage });

router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const { title, body } = req.body;
  const blog = await BLog.create({
    body,
    title,
    createdBY: req.user._id,
    coverimageURL: `/uploads/${req.file.filename}`,
  });

  //   return res.redirect(`/blog/${blog._id}`);
  return res.redirect("/");
});

module.exports = router;
