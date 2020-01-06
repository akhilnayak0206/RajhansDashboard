/* eslint-disable default-case */
import types from '../action_types/index';
const initState = { deleteDataChanged: 0 };

const deleteData = (state = initState, action) => {
  // console.log(state.dataChanged, initState.dataChanged);
  switch (action.type) {
    case types.ON_DELETE_COLLECTION:
      state.deleteDataChanged += 1;
      let payload = action.payload;
      return { payload, ...state };
    default:
      return state;
  }
};

export default deleteData;
