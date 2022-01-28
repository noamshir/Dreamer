const initialState = {
  notifications: [],
}

export function notificationReducer(state = initialState, action) {

  let newState = state;

  switch (action.type) {
    case 'SET_NOTIFICATIONS':
      newState = { ...state, notifications: [...action.notifications] }
      break;
    case 'ADD_NOTIFICATION':
      newState = { ...state, notifications: [...state.notifications, action.notification] }
      break;
    case 'UPDATE_NOTIFICATION':
      newState = { ...state, notifications: state.notifications.map(notification => notification._id === action.notification._id ? action.notification : notification) }
      break;
    case 'REMOVE_NOTIFICATION':
      newState = { ...state, notifications: state.notifications.filter(notification => notification._id !== action.notificationId) }
      break;
    default:
  }
  return newState;
}
