const authService = require("./auth.service");

async function login(req, res) {
  var { user } = req.query;
  user = JSON.parse(user);
  const { username, password } = user;
  try {
    const user = await authService.login(username, password);
    req.session.user = user;
    res.json(user);
  } catch (err) {
    res.status(401).send({ err: "Failed to Login" });
  }
}

async function signUp(req, res) {
  var signedUser = req.body;
  try {
    const user = await authService.signUp(signedUser);
    req.session.user = user;
    res.json(user);
  } catch (err) {
    res.status(500).send({ err: "Failed to signup" });
  }
}

async function logOut(req, res) {
  try {
    req.session.destroy();
    res.send("logged out succesfully!");
  } catch (err) {
    res.status(500).send({ err: "Failed to logout" });
  }
}

module.exports = {
  login,
  signUp,
  logOut,
};
