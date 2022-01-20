export function setHome(isHome) {
  return (dispatch) => {
    const action = { type: "SetHome", isHome };
    dispatch(action);
  };
}

export function setExplore(isExplore) {
  return (dispatch) => {
    const action = { type: "SetExplore", isExplore };
    dispatch(action);
  };
}
