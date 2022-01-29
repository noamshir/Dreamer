import { userService } from "../services/user.service";

const initialState = {
  user: userService.getLoggedinUser(),
  msg: '',
  notifications: [],
};

export function userReducer(state = initialState, action) {
  let newState = state;
  switch (action.type) {
    case "SET_USER":
      newState = { ...state, user: action.user };
      break;
    case "SET_MSG":
      newState = { ...state, msg: action.msg };
      break;
    case "ADD_NOTIFICATION":
      newState = { ...state, notifications: [action.notification, ...this.state.notifications] }
      break;
  }
  return newState;
}