const initialState = {
  isHome: true,
  isExplore: false,
  isDetails: false,
  isScroll: false,
  isSearchBar: false,
  isBecomeSeller: false,
  isJoinModal: false,
  isModalSign: false,
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
    case "SetDetails":
      newState = { ...state, isDetails: action.isDetails };
      break;
    case "SetScroll":
      newState = { ...state, isScroll: action.isScroll };
      break;
    case "SetHomeSearchBar":
      newState = { ...state, isSearchBar: action.isSearchBar };
      break;
    case "setBecomeSeller":
      newState = { ...state, isBecomeSeller: action.isBecomeSeller };
      break;
    case "setSigninModal":
      newState = { ...state, isModalSign: action.isModalSign };
      break;
    case "setJoinModal":
      newState = { ...state, isJoinModal: action.isJoinModal };
      break;
  }
  return newState;
}
