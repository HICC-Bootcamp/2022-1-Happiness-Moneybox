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
      res.render('list.ejs', { posts : posts, user: req.user, happymoney:result});
    });
  });
});

router.get('/write', function(req, res){

  req.app.db.collection('information').findOne({userId : req.user.userId}, function(error,result){
    res.render('write.ejs',{currentMoney:result.happy_money, currentdesign:result.nowdesign});
  });
})

router.post('/write', function (req, res) {
    req.app.db.collection('counter').findOne({name : '게시물갯수'}, function(error,result){
      var postNumber = result.totalPost;
     
      req.app.db.collection('information').findOne({userId : req.user.userId}, function(error,result){

        var currentmoney=parseInt(req.body.money);

        req.app.db.collection('information').updateOne({userId:req.user.userId},{ $inc: {happy_money: currentmoney} },function(error,result){
          if(error){return console.log(error)}
          })
        })

      req.app.db.collection('posts').insertOne({ _id: postNumber + 1, date: req.body.date, money: parseInt(req.body.money), userId:req.user.userId, text: req.body.content, title : req.body.title,  }
        ,function (error, result) {
        req.app.db.collection('counter').updateOne({name:'게시물갯수'},{ $inc: {totalPost:1} },function(error,result){
        if(error){return console.log(error)}
          res.send('전송완료');

        })
      })
  
    })
  })

module.exports = router;