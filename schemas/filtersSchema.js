const mongoose = require("mongoose");

const filterSchema = new mongoose.Schema(
  {
    filter_name: String,
    filter_field: String,
    filters_values: [String],
  },
  {
    strict: false,
  }
);

module.exports = mongoose.model("Filter", filterSchema);
