const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports.AuthService = function() {
  // Create and Save a new Task
  async function signup(email, password) {
    // signup: async (email, password) => {
    // exports.signup = async (username, email, password) => {
    let user = await User.find({ email });

    if (user) {
      return new Error("Email is already in use");
    }

    // hash the password (argon2.hash)
    const hashedPassword = await argon2.hash(password);

    // create new user record with hashed password
    user = await new User({ email, password: hashedPassword });

    // ...and save
    await user.save(err => {
      // handle error
      if (err) {
        console.log(err);
        throw new Error("failed to save user document");
      } // done
    });

    // return user record (without password)
    return user;
  }

  // Validate User credentials and return JWT
  async function login(email, password) {
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
  }

  async function signupAndLogin(email, password) {
    // signup: async (email, password) => {
    // exports.signup = async (username, email, password) => {
    let user = User.find({ email });

    if (user) {
      throw new Error("Email is already in use");
    }

    // hash the password (argon2.hash)
    const hashedPassword = await argon2.hash(password);

    // create new user record with hashed password
    user = await new User({ email, password: hashedPassword });

    // ...and save
    await user.save(err => {
      // handle error
      if (err) console.log(err); // done
    });

    // se isso nao funcionar, gerar token
    const token = await jwt.sign(user.toJSON(), "heart-is-valuable");
    // return user record (without password)
    return { user, token };
  }

  return {
    login,
    signup,
    signupAndLogin
  };
};
