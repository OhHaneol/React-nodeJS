//  reducer로 여러 기능 만들고 하나로 합쳐줌(combineReducers)
import { combineReducers } from "redux";
import user from './user_reducer';

const rootReducer=combineReducers({
    user,
})

export default rootReducer;