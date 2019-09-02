const { AuthService } = require("../app/services/auth.service");

// Create and Login with new user
exports.signup = async (req, res) => {
  let payload,
    { email, password, passwordConfirmation } = req.body;

  // TODO
  // validate username, email, password and password_confirmation
  //     - return error if not valid

  try {
    payload = await AuthService().signupAndLogin(
      email,
      password,
      passwordConfirmation
    );
  } catch (error) {
    res.status(400).json({ error });
  }

  // payload = await AuthService().login(user.email, password);

  res.json(payload);
};

// Create and return JWT token
exports.login = async (req, res) => {
  let payload,
    { email, password } = req.body;

  try {
    payload = await AuthService().login(email, password);
  } catch (error) {
    res.status(400).json({ error });
  }

  res.json(payload);
};
