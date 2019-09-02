const { AuthService } = require("../app/services/auth.service");

// Create and Login with new user
exports.signup = async (req, res) => {
  let payload,
    { email, password, passwordConfirmation } = req.body;

  if (!email || !password || !passwordConfirmation) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (password !== passwordConfirmation) {
    return res
      .status(400)
      .json({ error: "password and password confirmation don't match" });
  }
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
    res.status(400).json({ error: error.message });
  }

  // payload = await AuthService().login(user.email, password);

  res.json(payload);
};

// Create and return JWT token
exports.login = async (req, res) => {
  let payload,
    { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    payload = await AuthService().login(email, password);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(payload);
};
