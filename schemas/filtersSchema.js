const mongoose = require("mongoose");

const filterSchema = new mongoose.Schema(
  {
    filter_name: String,
    filters_values: [String],
  },
  {
    strict: false,
  }
);

module.exports = mongoose.model("Filter", filterSchema);
