const AuthService = require("../app/services/auth.service");

// Create and Return a new User
exports.signup = async (req, res) => {
  // get email, user, password and password confirmation(must validate)
  const { username, email, password } = req.body;

  // validate username, email, password and password_confirmation
  //     - return error if not valid

  // send email and password to the auth service
  const user = await AuthService.signup(username, email, password);

  // return user record (without email)
  res.json(user);
};

// Create and return JWT token
exports.login = async (req, res) => {
  // get email and password (must validate)
  const { email, password } = req.body;

  // send email and password to the auth service
  const loginPayload = await AuthService.login(email, password);

  // return loginPaylod: { user, token }
  res.json(loginPayload);
};
