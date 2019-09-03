/* eslint-disable default-case */
import types from '../action_types/index'
const initState = {}

const auth = (state=initState, action) =>{
  switch(action.type){
    case types.ON_AUTH :
      console.log("created reducer", action.payload)
      return action.payload
  }
  return state
}

export default auth