const User = require("../app/models/user.model");

exports.attachUser = async (req, res, next) => {
  console.log("searching for...");
  console.log("token");
  console.log(req.token);
  console.log("tokenData");
  console.log(req.tokenData);
  console.log("user");
  console.log(req.user);

  const user = await User.findOne({ email: req.tokenData.email });

  // overwrite user with the actual user, not only the data from jwt
  req.user = user;

  next();
};
