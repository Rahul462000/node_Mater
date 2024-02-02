const shortid = require("shortid");
const Url = require("../models/Url");

// fucntion to create a shorturl from a given URL
async function generateNewShortUrl(req, res) {
  // validation
  const body = req.body;
  if (!body.url) return res.status(404).json({ error: "url is requried" });
  console.log(body.url);

  const shortID = shortid();
  console.log(shortID);
  await Url.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
  });

  return res.json({ msg: "sucess" });
}

module.exports = {
  generateNewShortUrl,
};
