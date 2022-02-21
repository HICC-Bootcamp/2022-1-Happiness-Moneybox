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
var db;
var sha256 = require('sha256');
var salt = '10293018@!3$2%^'

MongoClient.connect('mongodb+srv://admin:qwer1234@cluster0.mj0ea.mongodb.net/moneybox?retryWrites=true&w=majority',function(error, client){
    if(error) return console.log(에러);
    db=client.db('moneybox');
    app.db=db;
    //db에 데이터 저장하기
    /*db.collection('post').insertOne({아이디 :'yejee', 비밀번호: 'yexxi'},function(에러,결과){
      console.log('저장완료');
    });
    */

    app.listen(8080, function(){
        console.log('listening on 8080');
    });
});

app.use('/', require('./routes/index.js'));


//어떤사람이 /login으로 접속을 하면,
app.get('/login',function(요청,응답){
    응답.render('login.ejs')
});

app.post('/login',   passport.authenticate('local',{
    failureRedirect:'/fail'//회원인증 실패 시, /fail로 이동
    


})  ,function(요청,응답){
    응답.redirect('/')//로그인 성공 시, 메인화면으로 이동
});

//로그인 실패시 /fail로 이동하면 로그인 화면이 뜸
app.get('/fail', function(요청,응답){
  응답.render('login.ejs')
})


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
    usernameField: 'userId',
    passwordField: 'password',
    session: true,
    passReqToCallback: false,
  }, function (입력한아이디, 입력한비번, done) {
    console.log(입력한아이디, 입력한비번);
    db.collection('user').findOne({ userId: 입력한아이디 }, function (에러, 결과) {
      if (에러) return done(에러)

      if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })
      var hash = sha256(입력한비번)
      console.log(hash); 
      db.collection('post').insertOne({암호화 : hash},function(에러,결과){
        console.log('저장완료');
      });
      if (sha256(입력한비번) == 결과.password) {
        return done(null, 결과)
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
