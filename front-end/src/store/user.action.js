import { userService } from "../services/user.service.js";

export function signUp(user) {
  return async (dispatch) => {
    var signedUpUser = await userService.signUp(user);
    const action = { type: "SET_USER", signedUpUser };
    dispatch(action);
  };
}

export function signIn(user) {
  return async (dispatch) => {
    var loggedUser = await userService.login(user);
    const action = { type: "SET_USER", loggedUser };
    dispatch(action);
  };
}