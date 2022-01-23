import { userService } from "../services/user.service.js";

export function signUp(user) {
  return async (dispatch) => {
    var signedUpUser = await userService.signUp(user);
    const action = { type: "SET_USER", user: signedUpUser };
    dispatch(action);
  };
}

export function signIn(user) {
  return async (dispatch) => {
    var loggedUser = await userService.login(user);
    const action = { type: "SET_USER", user: loggedUser };
    dispatch(action);
  };
}

export function logout() {
  return async (dispatch) => {
    await userService.logout();
    const action = { type: "SET_USER", user: null };
    dispatch(action);
  };
}

// export function onSaveReview(rate, txt) {
//   return async (dispatch) => {
//     const action = { type: "SET_USER", loggedUser: updatedUser };
//     dispatch(action);
//   };
// }