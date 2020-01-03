/* eslint-disable default-case */
import types from '../action_types/index';
const initState = { wingState: {} };

const wings = (state = initState, action) => {
  switch (action.type) {
    case types.ON_GET_WING:
      return action.payload;
    default:
      return state;
  }
};

export default wings;
