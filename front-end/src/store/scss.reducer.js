const initialState = {
  isHome: true,
  isExplore: false,
  isDetails: false,
  isProfile: false,
  isScroll: false,
  isSearchBar: false
};

export function scssReducer(state = initialState, action) {
  let newState = state;
  switch (action.type) {
    case "SET_HOME":
      newState = { ...state, isHome: action.isHome };
      break;

    case "SET_EXPLORE":
      newState = { ...state, isExplore: action.isExplore };
      break;
    case "SET_DETAILS":
      newState = { ...state, isDetails: action.isDetails };
      break;
    case "SET_PROFILE":
      newState = { ...state, isProfile: action.isProfile };
      break;
    case "SET_SCROLL":
      newState = { ...state, isScroll: action.isScroll };
      break;
    case "SET_HOME_SEARCH_BAR":
      newState = { ...state, isSearchBar: action.isSearchBar };
      break;
  }
  return newState;
}
