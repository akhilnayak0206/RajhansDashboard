/* eslint-disable default-case */
import types from "../action_types/index";
const initState = {message:""};

const auth = (state = initState, action) => {
  switch (action.type) {
    case types.ON_SEND_LOGIN:
      return action.payload;
    case types.ON_SEND_LOGIN_ERROR:
      return action.payload;
      case types.ON_SEND_LOGOUT:
      return action.payload;
    case types.ON_SEND_LOGOUT_ERROR:
      return action.payload;
    default:
      return state;
  }
};

export default auth;
