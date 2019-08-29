const mongoose = require("mongoose");
let mongooseHidden = require("mongoose-hidden")();

const UserSchema = mongoose.Schema(
  {
    username: String,
    email: String,
    password: { type: String, hide: true }
  },
  {
    timestamps: true
  }
);

UserSchema.plugin(mongooseHidden);

module.exports = mongoose.model("User", UserSchema);
