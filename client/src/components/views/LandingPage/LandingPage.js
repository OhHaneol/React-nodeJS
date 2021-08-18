import React, { useEffect } from 'react'
import axios from 'axios';
//  import { response } from 'express';

function LandingPage(props) {

    //  LandingPage에 들어오자 마자 이걸 실행함.
    useEffect(() => {
        //  get request를 server에 보내는 것(server/index.js 파일 app.get 으로)
        //  현재 client는 3000번 port인데 server는 5000번 port여서(server/index.js 파일에 명시) console에 오류 나타남.
        //  proxy 설정으로 오류 해결하기.(setupProxy.js)
        axios.get('/api/hello')
            //  보낸 다음 server에서 돌아오는 response를 console창에 보여줄 수 있도록 함.
            .then(response => { console.log(response) })
    }, [])

    const onClickHandler=()=>{
        axios.get(`/api/users/logout`)
            .then(response=>{
                if(response.data.success) {
                    props.history.push("/login")
                } else {
                    alert('로그아웃 실패')
                }
            })
    }

    return (
        <div style={{
            display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>

            <button onClick={onClickHandler}>
                로그아웃
            </button>

        </div>
    )
}

export default LandingPage
