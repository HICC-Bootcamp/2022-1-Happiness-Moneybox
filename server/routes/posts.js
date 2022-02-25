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

router.delete('/:id', function(req, res){
  var delete_data = {id: parseInt(req.params.id), userId: req.user.userId}   // 삭제할데이터={_id 로 수정 필수!!!!!!!}
  req.app.db.collection('posts').deleteOne( delete_data, function(error, result){
      res.status(204).send({message: '삭제 성공했습니다'});
  });
});

module.exports = router;