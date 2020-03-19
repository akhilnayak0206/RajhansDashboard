/* eslint-disable default-case */
import types from '../action_types/index';
const initState = {
  dataChanged: 0,
  totalWingA: 0,
  totalWingB: 0,
  totalWingC: 0,
  totalWingD: 0,
  totalWingE: 0,
  totalWellWishers: 0,
  totalExpenses: 0,
  totalBankBook: 0,
  totalCollection: 0,
  cashInHand: 0
};

const totalData = (state = initState, action) => {
  // console.log(state.dataChanged, initState.dataChanged);
  switch (action.type) {
    case types.ON_GET_TOTAL_DATA:
      state.dataChanged += 1;
      let payload = action.payload;
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default totalData;
