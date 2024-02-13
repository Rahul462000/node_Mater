const mongoose = require("mongoose"); //7

const urlSchema = new mongoose.Schema( //8
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
  { timeseries: true }
);

const Url = mongoose.model("URL", urlSchema); //9

module.exports = Url; //10
