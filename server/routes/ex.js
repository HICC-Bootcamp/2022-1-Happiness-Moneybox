var router = require('express').Router();
var sha256= require('sha256')

var salt='10293018@!3$2%^';

router.get('/register', function(req, res){
    res.render('signex.ejs');
});

router.post('/register', function(req, res){
     req.app.db.collection('user').insertOne({password:sha256(req.body.password+salt), nickname:req.body.nickname}, 
     function(error, result){
        res.redirect('/'); //나중에 로그인 페이지로 변경하기
    });
});


module.exports = router;