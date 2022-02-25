var router = require('express').Router();
var sha256= require('sha256');
const crypto = require('crypto');

module.exports = function(passport){
  router.get('/login',isnotAuth,function(req,res){
    res.render('login.ejs')
  });

  router.post('/login', passport.authenticate('local',{
    failureRedirect:'/auth/login'
    })  ,function(req,res){
    res.redirect('/posts')
  });

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
      }
     ,function(error, result){
      console.log(error);
    });
    req.app.db.collection('happymoney').insertOne({userId: req.body.id, Happy_money: parseInt(0)
      },function(error, result){
    res.redirect('/auth/login');
 })
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

router.get('/list',function(req,res){
  res.render('list.ejs');
})

router.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html')
});

router.get('/write',function(req,res){
  res.render('write.ejs')
});

router.post('/add',function(req,res){//req에 입력한 값이 저장되어있음
  res.send('전송완료')
  app.db.collection('counter').findOne({name : '게시물갯수'}, function(에러, 결과){
      console.log(결과.totalPost)
      var 총게시물갯수 = 결과.totalPost;
      app.db.collection('list').insertOne( {_id: 총게시물갯수 +1, 제목 : req.body.title, 날짜 : req.body.date, 내용:req.body.text 
      ,해피머니: req.body.money} , function(){
          console.log('저장완료')
          app.db.collection('counter').updateOne( {name: '게시물갯수'} ,{ $inc: {totalPost:12}} , function(에러, 결과){
              console.log('수정완료')
            })
        });
  });
});

router.get('/list', function(요청, 응답){
  app.db.collection('list').find().toArray(function(에러, 결과){
    console.log(결과)
    응답.render('list.ejs', { posts : 결과 })
  })
})

router.get('/detail', function(요청, 응답){
    응답.render('detail.ejs')
})

router.get('/detail/:id', function(요청, 응답){
  app.db.collection('list').findOne({ _id : parseInt(요청.params.id) }, function(에러, 결과){
    응답.render('detail.ejs', {data : 결과} )
  })
});

 function isnotAuth(req,res,next){
  if(req.user){
      res.send('로그인하셨는데요?');
  }else{
      next();
  }
}

  return router;
}
