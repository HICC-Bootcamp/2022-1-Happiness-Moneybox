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

  router.get('/logout',isAuth,function(req,res){
    req.session.destroy(function(error){
      res.redirect('/auth/login')

    })
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
    req.app.db.collection('information').insertOne({userId: req.body.id, happy_money: parseInt(0) , nowdesign: '/public/images/pig.png'
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

 function isnotAuth(req,res,next){
  if(req.user){
      res.send('로그인하셨는데요?');
  }else{
      next();
  }
}

function isAuth(req,res,next){
  if(req.user){
   next()
  }else{
   res.send('로그인을 해주세요.')
 }
}

  return router;
}
