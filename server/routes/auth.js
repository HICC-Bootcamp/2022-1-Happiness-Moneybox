var router = require('express').Router();
var sha256= require('sha256');
var salt='10293018@!3$2%^';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb+srv://admin:qwer1234@cluster0.mj0ea.mongodb.net/moneybox?retryWrites=true&w=majority',{ useUnifiedTopology: true },function(error, client){
    if(error) return console.log(error);
    db=client.db('moneybox');
    router.db=db;
    
});

router.get('/login',function(req,res){
    res.render('login.ejs')
});

router.post('/login', passport.authenticate('local',{
    failureRedirect:'/auth/login'
})  ,function(req,res){
    res.redirect('/')
});

passport.use(new LocalStrategy({
    usernameField: 'userId',
    passwordField: 'password',
    session: true,
    passReqToCallback: false,
  }, function (InputId, InputPW, done) {
    console.log(InputId, InputPW);
    db.collection('user').findOne({ userId: InputId }, function (error, result) {
      if (error) return done(error)

      if (!result) return done(null, false, { message: '존재하지않는 아이디요' })
      var hash = sha256(InputPW+salt)
      if (hash == result.password) {
        return done(null, result)
      } else {
        return done(null, false, { message: '비번틀렸어요' })
      }
    })
  }));

passport.serializeUser(function (user, done) {
    done(null, user.userId)
});
  

passport.deserializeUser(function (아이디, done) {
    db.collection('user').findOne({ userId: 아이디 }, function (error, result) {
      done(null, result)
    })
}); 


router.get('/mypage',isAuth,function(req,res){
  res.render('mypage.ejs')
});

function isAuth(req,res,next){
  if(req.user){
      next()
  }else{
      res.send('로그인안하셨는데요?')
  }
}

module.exports = router;
