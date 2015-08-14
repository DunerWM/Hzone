var express = require('express');
var router = express.Router();
var State = require('../service/Stateprovider');
var MobileDetect = require('mobile-detect');

/* GET home page. */
router.get('/', function (req, res, next) {
    var state = new State();
    var ua = req.headers['user-agent'].toLowerCase();
    var md = new MobileDetect(ua);
    var user = req.session.user ? req.session.user : null;
    if (md.phone()) {
        console.log("手机访问");
        res.render('/mobile/index',{user: user});
    } else {
        if (md.tablet()) {
            console.log("平板访问");
            res.render('index',{user:user});
        } else {
            console.log("桌面访问");
            state.getAllStates(function (error, states) {
                if (error) {
                    console.log(error);
                }
                res.render('index', {
                    title: "states",
                    states: states,
                    user: user
                })
            })
        }
    }
});

router.get('/mobile', function (req, res, next) {
    state.getAllStates(function (error, states) {
        console.log(states);
        res.render('index', {
            title: "states",
            states: states
        })
    })
})

router.post('/state/send', function (req, res, next) {
    var data = req.body;
    console.log(data);
    //state.save(data, function (error, info) {
    //    if (error) {
    //        res.send({'message': error});
    //    } else {
    //        res.send({'infor': info});
    //    }
    //})
})

router.get('/template/emotions', function (req, res, next) {
    res.render('template/emotions', {})
})

router.get('/template/login', function (req, res, next) {
    res.render('template/login', {})
})

router.get('/template/register', function (req, res, next) {
    res.render('template/register', {})
})

router

module.exports = router;
