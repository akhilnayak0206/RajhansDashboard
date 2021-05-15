/* eslint-disable default-case */
import types from '../action_types/index';
const initState = { resetDataChanged: 0 };

const resetData = (state = initState, action) => {
  // console.log(state.dataChanged, initState.dataChanged);
  switch (action.type) {
    case types.ON_RESET_COLLECTION:
      state.resetDataChanged += 1;
      let payload = action.payload;
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default resetData;
