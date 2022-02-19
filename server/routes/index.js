var router = require('express').Router();

router.get('/', function(req, res){
    //테스트용
    // req.app.db.collection('user').find().toArray(function(error,result){
    //     res.render('index.ejs', {user:result});
    // });
    res.redirect('/auth/signup'); //나중에 로그인 페이지로 변경하기
});

module.exports = router;