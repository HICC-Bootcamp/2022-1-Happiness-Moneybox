var router = require('express').Router();
function isAuth(req,res,next){
    if(req.user){
     next()
    }else{
     res.send('로그인을 해주세요.')
   }
}

router.use(isAuth);

router.get('/', function(req, res){
  req.app.db.collection('posts').find({userId:req.user.userId}).toArray(function(error, result){
    var posts=result;
    req.app.db.collection('information').find({userId:req.user.userId}).toArray(function(error, result){
      res.render('list.ejs', { posts : posts, user: req.user, money:result[0].happy_money});
    });
  });
});

module.exports = router;