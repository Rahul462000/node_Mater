const shortid = require("shortid");
const URL = require("../Models/Url");

async function CreateNewUrl(req, res) {
  const bodyData = req.body;
  if (!bodyData.url) return res.status(404).json({ error: "Url is required" });
  console.log(bodyData.url);
  const ShortID = shortid();
  console.log(ShortID);
  await URL.create({
    shortId: ShortID,
    redirectUrl: bodyData.url,
    visitHistory: [],
  });
  return res.render("Home", { id: ShortID });
}

module.exports = {
  CreateNewUrl,
};
