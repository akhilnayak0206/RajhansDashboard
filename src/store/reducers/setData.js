/* eslint-disable default-case */
import types from '../action_types/index';
const initState = { collectionState: {}, dataChanged: 0 };

const setData = (state = initState, action) => {
  // console.log(state.dataChanged, initState.dataChanged);
  switch (action.type) {
    case types.ON_SET_COLLECTION:
      state.dataChanged += 1;
      let payload = action.payload;
      return { payload, ...state };
    default:
      return state;
  }
};

export default setData;
