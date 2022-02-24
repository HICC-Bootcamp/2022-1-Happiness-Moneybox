var router = require('express').Router();
var sha256= require('sha256');
const crypto = require('crypto');

router.get('/signup', function(req, res){
    res.render('signup.ejs');
});

router.post('/signup', function(req, res){

    var salt=crypto.randomBytes(20).toString('hex')

     req.app.db.collection('user').insertOne({
         userId:req.body.id, 
         email:req.body.email1+'@'+req.body.email2, 
         password:sha256(req.body.password+salt), 
         nickname:req.body.nickname,
         saltname:salt
        }, 
     function(error, result){
        res.redirect('/'); //나중에 로그인 페이지로 변경하기
    });
});

router.post('/signup/id-check', function(req, res){
    req.app.db.collection('user').findOne(req.body, function(error, result){
        if(result){
            res.send("실패");
        }
        else{
            res.send("성공");
        }
    });
});

module.exports = router;