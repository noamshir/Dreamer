export function setHome(isHome) {
  return (dispatch) => {
    const action = { type: "SetHome", isHome };
    dispatch(action);
  };
}

export function setDetails(isDetails) {
  return (dispatch) => {
    const action = { type: "SetDetails", isDetails };
    dispatch(action);
  };
}

export function setExplore(isExplore) {
  return (dispatch) => {
    const action = { type: "SetExplore", isExplore };
    dispatch(action);
  };
}

export function setScroll(isScroll) {
  return (dispatch) => {
    const action = { type: "SetScroll", isScroll };
    dispatch(action);
  };
}

export function setSearchDisplay(isSearchBar) {
  return (dispatch) => {
    const action = { type: "SetHomeSearchBar", isSearchBar };
    dispatch(action);
  };
}
