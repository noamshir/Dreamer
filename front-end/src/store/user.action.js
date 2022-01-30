import { userService } from "../services/user.service.js";

export function signUp(user) {
  return async (dispatch) => {
    try {
      var signedUpUser = await userService.signUp(user);
      const action = { type: "SET_USER", user: signedUpUser };
      dispatch(action);
      return signedUpUser;
    } catch (err) {
      console.log("err", err);
    }
  };
}

export function setUser(user) {
  return (dispatch) => {
    const action = { type: "SET_USER", user: user };
    dispatch(action);
  };
}

export function googleLogin(googleId) {
  return async (dispatch) => {
    try {
      var loggedGoogleUser = await userService.getGoogleUser(googleId);
      const actionUser = { type: "SET_USER", user: loggedGoogleUser };
      dispatch(actionUser);
      return loggedGoogleUser;
    } catch (err) {
      return false;
    }
  };
}

export function signIn(user) {
  return async (dispatch) => {
    try {
      var loggedUser = await userService.login(user);
      console.log({ loggedUser });
      const action = { type: "SET_USER", user: loggedUser };
      dispatch(action);
      return loggedUser;
    } catch (err) {
      console.log("err", err);
    }
  };
}

export function logout(user) {
  return async (dispatch) => {
    try {
      await userService.logout(user);
      const action = { type: "SET_USER", user: null };
      dispatch(action);
    } catch (err) {
      console.log("err", err);
    }
  };
}

export function saveSellerInfo(sellerInfo) {
  return async (dispatch) => {
    try {
      const updatedUser = await userService.saveSellerInfo(sellerInfo);
      const action = { type: "SET_USER", user: updatedUser };
      dispatch(action);
    } catch (err) {
      console.log("err", err);
    }
  };
}

export function setMsg(msg) {
  return (dispatch) => {
    const actionMsg = { type: "SET_MSG", msg };
    dispatch(actionMsg);
  };
}

export function addNotification(user, notification) {
  return async (dispatch) => {
    const { _id, username } = notification.sender;
    notification.sender = { _id, username };
    if (!user.notifications) user.notifications = [notification];
    else user.notifications.unshift(notification);
    const updatedUser = await userService.saveUser(user);
    console.log("user", user);
    const action = { type: "SET_USER", user: updatedUser };
    dispatch(action);
  };
}
