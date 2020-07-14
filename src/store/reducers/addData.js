/* eslint-disable default-case */
import types from '../action_types/index';
const initState = {};

const addData = (state = initState, action) => {
  switch (action.type) {
    case types.ON_ADD_COLLECTION:
      let payload = action.payload;
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default addData;
