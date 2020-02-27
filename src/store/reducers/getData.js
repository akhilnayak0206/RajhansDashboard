/* eslint-disable default-case */
import types from '../action_types/index';
const initState = {
  collectionData: [],
  dataChanged: 0,
  message: '',
  collection: ''
};

const getData = (state = initState, action) => {
  // console.log(state.dataChanged, initState.dataChanged);
  switch (action.type) {
    case types.ON_GET_COLLECTION:
      state.dataChanged += 1;
      let payload = action.payload;
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default getData;
