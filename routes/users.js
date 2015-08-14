var express = require('express');
var router = express.Router();
var User = require('../service/Userprovider');
var md5 = require('md5');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

//登陆
router.post('/login', function (req, res, next) {
    var user = new User();
    user.get(req.body.user.nick, function (err, user) {
        if (!user) {
            res.json({message: "用户不存在"});
            return;
        }
        if (user.psw != req.body.user.psw) {
            res.json({message: "密码有误"});
            return;
        }
        req.session.user = user;
        res.json({success: true, message: "登陆成功"});
    })
});

//注册
router.post('/register', function (req, res, next) {
    var registerData = req.body.user;
    if (registerData.psw !== registerData.repsw) {
        res.json({message: "两次密码输入不一致,请重新输入"});
        return;
    }
    var newUser = new User({nick: registerData.nick, psw: registerData.psw});
    newUser.get(registerData.nick, function (err, user) {
        if (user) {
            res.json({message: "用户名已存在"});
            return;
        }
        if (err) {
            console.log(err);
            res.json({message: "出错了，稍后重试"});
            return;
        }
        newUser.set(function (err, user) {
            if (err) {
                res.json({message: "注册失败"});
                return;
            }
            req.session.user = user;
            res.json({success: true, message: "注册成功"});
            return;
        })
    })
})

module.exports = router;
