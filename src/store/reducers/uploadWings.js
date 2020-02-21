/* eslint-disable default-case */
import types from '../action_types/index';
const initState = {
  totalWings: [],
  lok: 'aas',
  same: 'not there',
  me: {}
};

const uploadWings = (state = initState, action) => {
  switch (action.type) {
    case types.ON_SET_UPLOAD:
      let payload = action.payload;
      return { ...state, totalWings: payload };
    default:
      return state;
  }
};

export default uploadWings;
