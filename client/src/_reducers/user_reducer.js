import {
    LOGIN_USER,
    REGISTER_USER
} from '../_actions/types'


//  reducer 는 전의 state와 현재를 nextState로 만듦.
//  (previousState, action) => nextState
//  state = {} : 현재 상태 비어있음~
export default function (state={}, action) {
    //  action의 인자값의 type이 맞으면 state를 변화시킴.
    switch (action.type) {
        case LOGIN_USER:
            //  user_action.js의 action.payload를 loginSuccess에 넣어줌.
            return {...state, loginSuccess: action.payload}   //  ... 은 spread operator: state 값을 복사해옴.
            break;
        case REGISTER_USER:
            return { ...state, register: action.payload}
            break;
        default:
            return state;
    }
}

