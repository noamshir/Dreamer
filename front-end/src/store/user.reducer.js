import { userService } from "../services/user.service";

const initialState = {
  user: userService.getLoggedinUser(),
  msg: '',
};

export function userReducer(state = initialState, action) {
  let newState = state;
  switch (action.type) {
    case "SET_USER":
      newState = { ...state, user: action.user };
      break;
    case "SET_MSG":
      console.log('reducer msg:', action.msg);

      newState = { ...state, msg: action.msg };
      break;
  }
  return newState;
}