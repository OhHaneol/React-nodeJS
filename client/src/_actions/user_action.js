import axios from "axios";
import {
    LOGIN_USER,
    REGISTER_USER
} from './types';

export function loginUser(dataToSubmit) {

    //  원하는 페이지(login)에 저장된 정보(dataToSubmit)를 보내줌.
    //  이 경우 server/index.js 파일(backend)에 작성된 내용대로 이메일이 존재하는지와 비밀번호는 맞는지,
    //  맞다면 토큰을 생성하여 쿠키에 저장 후 로그인 성공 등의 메시지를 client에 전해준다.
    //  이후 서버에서 받은 데이터(response.data)를 request에 저장.
    const request = axios.post('/api/users/login', dataToSubmit)
    .then(response => response.data)

    //  return으로 reducer로 보냄.
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {

    //  원하는 페이지(login)에 저장된 정보(dataToSubmit)를 보내줌.
    //  이 경우 server/index.js 파일(backend)에 작성된 내용대로 이메일이 존재하는지와 비밀번호는 맞는지,
    //  맞다면 토큰을 생성하여 쿠키에 저장 후 로그인 성공 등의 메시지를 client에 전해준다.
    //  이후 서버에서 받은 데이터(response.data)를 request에 저장.
    const request = axios.post('/api/users/register', dataToSubmit)
    .then(response => response.data)

    //  return으로 reducer로 보냄.
    return {
        type: REGISTER_USER,
        payload: request
    }
}