/* eslint-disable default-case */
import types from '../action_types/index';
const initState = { data: '', message: '' };

const auth = (state = initState, action) => {
  console.log('auth');
  switch (action.type) {
    case types.ON_SEND_LOGIN:
      return action.payload;
    case types.ON_SEND_LOGIN_DATA:
      return action.payload;
    case types.ON_SEND_LOGOUT:
      return action.payload;
    default:
      return state;
  }
};

export default auth;
