import username from "./reducers/username";
import { combineReducers } from "redux";
function counter(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "SUBTRACT":
      return state - 1;
    default:
      return state;
  }
}
const rootReducer = combineReducers({ counter, username });

export default rootReducer;
