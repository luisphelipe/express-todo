const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Create and Save a new Task
exports.signup = async (username, email, password) => {
  // hash the password (argon2.hash)
  const hashedPassword = await argon2.hash(password);

  // create new user record with hashed password
  const user = await new User({ username, email, password: hashedPassword });

  // ...and save
  user.save(err => {
    // handle error
    if (err) console.log(err); // done
  });

  // return user record (without password)
  return { username: user.username, email: user.email };
};

// Validate User credentials and return JWT
exports.login = async (email, password) => {
  let user = await User.findOne({ email });

  // return error if user not found
  if (!user) {
    console.log("Wrong email or password (email)");
  }

  // use argon2 to verify if password match records (argon2.verify)
  const match = await argon2.verify(user.password, password);

  // remove unwanted fields from the user
  // user = { _id: user._id, username: user.username, email: user.email };

  //     - return error if not match
  if (!match) {
    console.log("Wrong email or password (password)");
  }

  // create JWT token of the user record (with generate token)
  const token = await jwt.sign(user.toJSON(), "heart-is-valuable");

  return { user, token };
};
