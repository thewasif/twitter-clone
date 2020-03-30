import { combineReducers } from "redux";
function counter(state = 0, action) {
    switch (action.type) {
        case 'ADD':
            return state + 1;
        case 'SUBTRACT':
            return state - 1;
        default:
            return state;
    }
}
const rootReducer = combineReducers({counter});

export default rootReducer;