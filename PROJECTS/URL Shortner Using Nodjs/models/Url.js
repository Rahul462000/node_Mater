const mongoose = require("mongoose");

const UrlSChema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true }
);

const Url = mongoose.model("Url", UrlSChema);

module.exports = Url;
