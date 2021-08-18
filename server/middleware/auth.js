const { User } = require("../models/User");

let auth = (req, res, next) => {
    //  인증처리를 하는 곳

    //  클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;

    //  토큰을 복호화 한 후 유저를 찾는다
    User.findByToken(token, (err,user)=>{
        if(err) throw err;
        //  user가 없다면
        if(!user) return res.json({isAuth:false,error:true})

        //  user가 있다면
        //  request에다 token과 user를 넣어주는 이유?
        //  index.js의 app.get에서 req, user 정보를 받고 나서 메소드 안에 req.user/req.token을 하면 user/token 정보를 가질 수 있도록 함. (사용 할 수 있도록 하기 위해서.)
        req.token=token;
        req.user=user;
        //  next() 를 하는 이유? auth 는 middleware 이기 때문에. 안하면 안에 계속 갖히게 됨. 할 거 다 했으면 갈 수 있도록!
        next();
    })

    //  유저가 있으면 인증 Okay


    //  유저가 없으면 인증 No !
}

module.exports = { auth };