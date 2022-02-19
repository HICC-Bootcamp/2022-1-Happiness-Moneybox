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
var db;
MongoClient.connect('mongodb+srv://admin:qwer1234@cluster0.mj0ea.mongodb.net/moneybox?retryWrites=true&w=majority',function(error, client){
    if(error) return console.log(에러);
    db=client.db('moneybox');
    app.db=db;
    app.listen(8080, function(){
        console.log('listening on 8080');
    });
});

app.use('/', require('./routes/index.js'));



app.get('/login',function(요청,응답){
    응답.render('login.ejs')
});

app.post('/login',   passport.authenticate('local',{
    failureRedirect:'/fail'
})  ,function(요청,응답){
    응답.redirect('/')
});

app.get('/mypage',로그인했니,function(요청,응답){
    응답.render('mypage.ejs')
});

function 로그인했니(요청,응답,next){
    if(요청.user){
        next()
    }else{
        응답.send('로그인안하셨는데요?')
    }
}



passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw',
    session: true,
    passReqToCallback: false,
  }, function (입력한아이디, 입력한비번, done) {
    console.log(입력한아이디, 입력한비번);
    db.collection('login').findOne({ id: 입력한아이디 }, function (에러, 결과) {
      if (에러) return done(에러)

      if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })
      if (입력한비번 == 결과.pw) {
        return done(null, 결과)
      } else {
        return done(null, false, { message: '비번틀렸어요' })
      }
    })
  }));


  passport.serializeUser(function (user, done) {
    done(null, user.id)
  });
  

  passport.deserializeUser(function (아이디, done) {
    db.collection('login').findOne({ id: 아이디 }, function (에러, 결과) {
      done(null, 결과)
    })
  }); 
