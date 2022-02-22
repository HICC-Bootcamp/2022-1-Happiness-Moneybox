var router = require('express').Router();
var sha256= require('sha256');
var salt='10293018@!3$2%^';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

router.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
router.use(passport.initialize());
router.use(passport.session()); 

router.get('/login',function(req,res){
    res.render('login.ejs')
});

router.post('/login',   passport.authenticate('local',{
    failureRedirect:'/fail'
})  ,function(req,res){
    res.redirect('/')
});

router.get('/fail', function(req,res){
    res.render('login.ejs')
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
      var hash = sha256(InputId+salt)
      db.collection('post').insertOne({hashing: hash},function(error,result){
        console.log('저장완료');
      });
      if (InputPW== result.password) {
        return done(null, result)
      } else {
        return done(null, false, { message: '비번틀렸어요' })
      }
    })
  }));


module.exports = router;
