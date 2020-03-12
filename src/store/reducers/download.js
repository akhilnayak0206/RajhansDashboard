/* eslint-disable default-case */
import types from '../action_types/index';
const initState = {
  wellWishers: [],
  expenses: [],
  allWings: [],
  dataChanged: 0,
  message: '',
  collection: ''
};

const download = (state = initState, action) => {
  // console.log(state.dataChanged, initState.dataChanged);
  switch (action.type) {
    case types.ON_GET_CSV:
      state.dataChanged += 1;
      let payload = action.payload;
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default download;
