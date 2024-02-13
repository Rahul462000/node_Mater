const express = require("express"); //1
const path = require("path");
const UrlRoute = require("./routes/Url");
const { connectToMonggoDb } = require("./db/connection");
const staticRoute = require("./routes/StaticRouter");
const URL = require("./models/Url"); //6

const app = express(); //2
const PORT = 5001; //3

connectToMonggoDb("mongodb://127.0.0.1:27017/serversideurl").then(() => {
  console.log("database connection established");
}); //4
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json()); // middleware to take input from the body of postman   //5
app.use(express.urlencoded({ extended: true }));

app.use("/url", UrlRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
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
