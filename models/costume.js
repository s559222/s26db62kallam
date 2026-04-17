var mongoose = require("mongoose");

var costumeSchema = mongoose.Schema({
  costume_type: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  }
});

module.exports = mongoose.model("Costume", costumeSchema);