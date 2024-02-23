const express = require("express");
const path = require("path");
const { connectToMonggoDb } = require("./db/connections");
const URLRoute = require("./routes/Url");
const staticROUTe = require("./routes/staticROUTe");
const USerRoutes = require("./routes/User");
const URL = require("./Models/Url");
const app = express();
const PORT = 3000;

connectToMonggoDb("mongodb://127.0.0.1:27017/UserAuthURL").then(() => {
  console.log(`database connection established`);
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/url", URLRoute);
app.use("/user", USerRoutes);
app.use("/", staticROUTe);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const Entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(Entry.redirectUrl);
});

app.get("/analytics/:shortid", async (req, res) => {
  const shortid = req.params.shortid;
  const REsult = await URL.findOne({ shortid });

  return res.json({
    msg: "success",
    totalClicks: REsult.visitHistory.length,
    analytics: REsult.totalClicks,
  });
});

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
