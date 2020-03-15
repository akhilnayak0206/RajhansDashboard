import types from '../action_types/index';
const initState = {
  error: false,
  message: '',
  description: '',
  collection: '',
  document: '',
  token: '',
  dataChanged: 0,
  mail: false,
  url: ''
};

const share = (state = initState, action) => {
  switch (action.type) {
    case types.ON_SHARE_RECEIPT:
      state.dataChanged += 1;
      let payload = action.payload;
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default share;
