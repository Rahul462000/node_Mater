const express = require("express");
const path = require("path");
const urlRoute = require("./routes/Url");
const { connectToMonggoDb } = require("./DB/Connections");
const Static = require("./routes/Static");
const URLDAta = require("./models/Index");
const UserRouter = require("./routes/UserAuth");

const app = express();
const PORT = 3000;

connectToMonggoDb("mongodb://127.0.0.1:27017/UrlWITHAuth").then(() => {
  console.log("+ve db connected");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/url", urlRoute);
app.use("/user", UserRouter);
app.use("/", Static);

app.get("/:shortID", async (req, res) => {
  const shortID = req.params.shortID;
  const EntredURL = await URLDAta.findOneAndUpdate(
    {
      shortID,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(EntredURL.redirectUrl);
});
app.get("/analytics/:shortID", async (req, res) => {
  const shortID = req.params.shortID;
  const REsult = await URLDAta.findOne({ shortID });
  return res.json({
    msg: "success",
    totalClicks: REsult.visitHistory.length,
    analytics: REsult.visitHistory,
  });
});
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
