const express = require("express");
const UrlRoute = require("./routes/Url");
const { connectToMonggoDb } = require("./DB/connection");
const URL = require("./models/Url");
const app = express();
const PORT = 8001;

connectToMonggoDb("mongodb://127.0.0.1:27017/UrlShortner").then(() => {
  console.log("database connection established");
});
app.use(express.json()); // middleware to take input from the body of postman
app.use("/url", UrlRoute);

app.get("/:shortId", async (req, res) => {
  // fetch the corrsponding redirectUrl linked with the provided shortId
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
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
  res.redirect(entry.redirectUrl);
});

app.get("/analytics/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  // console.log(result);

  return res.json({
    msg: "success",
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
