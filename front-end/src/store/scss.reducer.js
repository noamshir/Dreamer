const initialState = {
  isHome: true,
  isExplore: false,
};

export function scssReducer(state = initialState, action) {
  let newState = state;
  switch (action.type) {
    case "SetHome":
      newState = { ...state, isHome: action.isHome };
      break;

    case "SetExplore":
      newState = { ...state, isExplore: action.isExplore };
      break;
  }
  return newState;
}
