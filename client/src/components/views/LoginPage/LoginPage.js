//  import axios from 'axios'
//  import { response } from 'express'
import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action';

function LoginPage(props) {

    const dispatch=useDispatch();

    //  onChange로 입력하는 값 변화 나타내기 위해서 state 만들어줌.
    //  타이핑을 할 때 onChange 이벤트로 onEmailHandler를 작동시키면 state를 바꿔주고 그게 value를 바꿔줌.
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler=(event)=>{
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler=(event)=>{
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler=(event)=>{
        //  페이지 리프레시 막아줌. 이거 안하면 이 뒤에 해야 할 내용들 못하고 그냥 페이지 리프레시 됨.
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        //  user_action.js  에 body 데이터 넘겨줌.
        dispatch(loginUser(body))
            //  로그인 성공 시 props를 사용하여 처음 LandingPage(/)로 다시 이동. 처음에 function LoginPage(props) 로 꼭 props 넣어줘야 함.
            .then(response=>{
                if(response.payload.loginSuccess) {
                    props.history.push('/')
                } else {
                    alert('Error')
                }
            })

    }
    
    return (
        <div style={{
            display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height: '100vh'
        }}>
            <form style={{ display:'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <br />

                <button>
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage
