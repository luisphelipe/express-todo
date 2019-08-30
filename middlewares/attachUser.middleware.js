const User = require("../app/models/user.model");

exports.attachUser = async (req, res, next) => {
  const user = await User.findOne({ email: req.token.email });

  // overwrite user with the actual user, not only the data from jwt
  req.user = user;

  next();
};
