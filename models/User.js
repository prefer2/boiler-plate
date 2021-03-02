const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//salt를 이용해서 암호화 해야 -> salt를 먼저 생성
//saltRounds: salt가 몇글자인지
const saltRounds = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email:{
        type: String,
        trim:true,
        unizue:1
    },
    password:{
        type: String,
        minlength: 5
    },
    lastname:{
        type:String,
        maxlength: 50
    },
    role:{
        type:Number,
        default:0
    },
    image:String,
    token:{
        type:String
    },
    tokenExp:{
        type:Number
    }
})

//mongoose의 기능, 저장하기 전에 function 실행
userSchema.pre('save', function (next){
    var user = this;

    //password가 변환될때만 암호화
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash){ //hash: 암호화된 비밀번호
                if(err) return next(err)
                user.password=hash
                next()
            })
        })
    }
    else{ next() }
   
})

const User = mongoose.model('User', userSchema)

module.exports={User}