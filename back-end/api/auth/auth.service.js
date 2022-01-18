const userService = require("../users/user.service");
const bcrypt = require("bcrypt");

async function login(username, password) {
  const user = await userService.getByUsername(username);
  if (!user) return Promise.reject("no such user");
  // const match = await bcrypt.compare(password, user.password);
  // console.log(password, user.password);
  const match = password === user.password ? true : false;
  if (!match) return Promise.reject("wrong password");
  delete user.password;
  return user;
}

async function signUp(user) {
  try {
    const addedUser = await userService.addUser(user);
    delete addedUser.password;
    return addedUser;
  } catch (err) {
    console.log("error while signing up: ", err);
    throw err;
  }
}
module.exports = {
  login,
  signUp,
};
