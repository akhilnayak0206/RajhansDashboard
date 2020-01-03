/* eslint-disable default-case */
import types from '../action_types/index';
const initState = { collectionState: {} };

const collectionData = (state = initState, action) => {
  switch (action.type) {
    case types.ON_GET_COLLECTION:
      return action.payload;
    default:
      return state;
  }
};

export default collectionData;
