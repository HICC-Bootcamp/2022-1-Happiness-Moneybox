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
    req.app.db.collection('happymoney').find({userId:req.user.userId}).toArray(function(error, result){
      res.render('list.ejs', { posts : posts, user: req.user, happymoney:result});
    });
  });
});

router.delete('/:id', function(요청, 응답){
  var 삭제할데이터 = {id: parseInt(요청.params.id), userId: 요청.user.userId}   // 삭제할데이터={_id 로 수정 필수!!!!!!!}
  요청.app.db.collection('posts').deleteOne( 삭제할데이터, function(에러, 결과){
      응답.status(204).send({message: '삭제 성공했습니다'});
  });
});

module.exports = router;