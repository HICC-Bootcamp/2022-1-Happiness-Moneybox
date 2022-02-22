const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 
app.use('/public', express.static('public'));
app.use('/', require('./routes/index.js'));
app.use('/auth',require('./routes/auth.js'));
app.use('/posts', require('./routes/posts.js'));

var db;
var router = require('express').Router();
var sha256= require('sha256');
var salt='10293018@!3$2%^';

MongoClient.connect('mongodb+srv://admin:qwer1234@cluster0.mj0ea.mongodb.net/moneybox?retryWrites=true&w=majority',{ useUnifiedTopology: true },function(error, client){
    if(error) return console.log(에러);
    db=client.db('moneybox');
    app.db=db;
    app.listen(8080, function(){
        console.log('listening on 8080');
    });
});

app.get('/login',function(req,res){
    res.render('login.ejs')
});

app.post('/login', passport.authenticate('local',{
    failureRedirect:'/fail'
})  ,function(req,res){
    res.redirect('/')
});

app.get('/fail', function(req,res){
    res.render('/login')
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
      if (InputPW == result.password) {
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
    db.collection('user').findOne({ userId: 아이디 }, function (에러, 결과) {
      done(null, 결과)
    })
}); 


/*app.get('/mypage',isAuth,function(req,res){
    res.render('mypage.ejs')
});
*/
/*function isAuth(req,res,next){
    if(req.user){
        next()
    }else{
        res.send('로그인안하셨는데요?')
    }
}*/
