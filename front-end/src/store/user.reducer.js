const initialState = {
    user: null,
  };
  
  export function userReducer(state = initialState, action) {
    let newState = state;
    switch (action.type) {
      case "SET_USER":
        newState = { ...state, user: action.user };
        break;
    }
    return newState;
}