const express = require("express");
const shortid = require("shortid");
const { connectToMonggoDb } = require("./DB/Index");
const UrlData = require("./Models/url");
const app = express();
const PORT = 4001;

connectToMonggoDb("mongodb://127.0.0.1:27017/serverSideUrl").then(() => {
  console.log(`database connection established `);
});

app.use(express.json()); // middleware to take input from the body of postman

app.post("/shortURL", async (req, res) => {
  const bodyDAta = req.body;
  if (!bodyDAta.url) return res.status(404).json({ error: "url is required" });
  console.log(bodyDAta.url);
  const shortID = shortid();
  await UrlData.create({
    shortId: shortID,
    redirectUrl: bodyDAta.url,
    visitHistory: [],
  });
  return res.json({ msg: "success" });
});

app.get("/shortURL/:shortId", async (req, res) => {
  const shortID = req.params.shortId;
  const EntryUpdate = await UrlData.findOneAndUpdate(
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
  res.redirect(EntryUpdate.redirectUrl);
});

app.get("/analytics/:shortId", async (req, res) => {
  const shortID = req.params.shortId;
  const result = await UrlData.findOne({ shortID });
  return res.json({
    msg: "success",
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
});

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
