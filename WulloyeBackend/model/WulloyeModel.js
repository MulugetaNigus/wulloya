const mongoose = require("mongoose");

// model function
const WulloyeShape = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    MainPost: {
      type: String,
      required: true,
    },
    tags: {
      type: [],
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const WulloyeModel = mongoose.model("wulloyepost", WulloyeShape);
module.exports = WulloyeModel;
