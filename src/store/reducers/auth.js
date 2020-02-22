/* eslint-disable default-case */
import types from '../action_types/index';
const initState = {
  data: {},
  message: '',
  dataLogin: {},
  messageLogin: '',
  dataEmail: {},
  messageEmail: '',
  errorEmail: false,
  errorObjEmail: {},
  messageUsers: '',
  users: [],
  dataAddUser: {},
  messageAddUser: '',
  errorAddUser: false,
  errorObjAddUser: {},
  errorUsers: false,
  errorObjUsers: {}
};

const auth = (state = initState, action) => {
  // console.log('auth');
  switch (action.type) {
    case types.ON_SEND_LOGIN:
      return { ...state, ...action.payload };
    case types.ON_EMAIL_DATA:
      return { ...state, ...action.payload };
    case types.ON_GET_USERS:
      return { ...state, ...action.payload };
    case types.ON_ADD_USERS:
      return { ...state, ...action.payload };
    case types.ON_SEND_LOGOUT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default auth;
