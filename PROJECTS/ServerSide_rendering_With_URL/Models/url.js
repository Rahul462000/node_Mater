const mongoose = require("mongoose");

const urlSChema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitHistory: [{ timeStamp: { type: Number } }],
  },

  { timestamps: true }
);

const UrlData = mongoose.model("UrlData", urlSChema);

module.exports = UrlData;
