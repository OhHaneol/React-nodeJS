const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//  bcrypt 사용법을 보면~ saltgen을 할 때 saltRounds 가 필요한데
//  10글자 짜리 saltRounds를 만들겠다는 뜻.
const saltRounds = 10
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        // 관리자와 일반 유저 구분(0, 1 ..)
        type: Number,
        default: 0
    },
    image: String,
    token: {
        // token으로 유효성 관리
        type: String
    },
    tokenExp: {
        // 토큰 유효기간
        type: Number
    }
})

//  bcrypt로 비밀번호 암호화 하고자 함
//  index.js 에서 user.save('save')를 하기 전에(pre) 무언가 기능(function)을 주고 나서
//  다음(user.save)으로 넘어가(next)겠다는 뜻
userSchema.pre('save', function (next) {
    //  여기서 this는 위에 있는 userSchema를 의미
    var user = this;

    //  email 변경 등에 따라서 매번 하면 안되니까 비밀번호를 변경 시에만 암호화를 한다고 조건 달기
    if (user.isModified('password')) {
        //  비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                //  hash로 암호화 완료 후
                user.password = hash
                //  원래 자리(index.js에서 user.save)로 돌아감.
                next()
            })
        })
    } else {
        //  비밀번호 말고 다른 거 바꾸는 경우 else 넣어줘야 바로 넘어갈 수 있음.
        //  이게 없으면 여기서 머물게 됨.
        next()
    }





})


userSchema.methods.comparePassword = function (plainPassword, cb) {

    //  plainPassword 1234567   암호화된 비밀번호 $2b$10$ubo01MCj8FINpELFl.k4y.kotV.DdPenvshdm2bFGkS/yUDMViCAK  둘을 비교해야 함.
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
            cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function (cb) {

    var user = this;

    //  jsonwebtoken을 이용해서 token을 생성하기.
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    //  아래 두 개를 합쳤을 때 token이 나옴.
    //  'secretToken'을 넣었을 때 user._id가 나와서 'secretToken'을 기억을 해줘야 한다고 함.... 응 뭔말.... 일단 해,,,,,,
    //  user._id + 'secretToken' = token

    user.token=token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })

}

userSchema.statics.findByToken=function(token, cb) {
    var user=this;

    //  토큰을 decode 한다. 여기서 decode 된 것은 user._id
    jwt.verify(token, 'secretToken', function(err, decoded) {
        //  유저 아이디를 이용해서 유저를 찾은 다음에
        //  클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인.

        user.findOne({"_id":decoded, "token": token}, function(err, user) {
            
            //  만약 에러가 있다면 return 하고 callback으로 에러를 전달해주고
            if(err) return cb(err);
            //  에러가 없다면 user 정보를 전달
            cb(null, user)
        })
    })

}


// 위의 schema 를 model로 감싸줌. model 이름인 User 와 userSchema 적어줌
const User = mongoose.model('User', userSchema)

// 다른 곳에서 재사용 할 수 있도록.
module.exports = { User }