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
    if(error) return console.log(error);
    db=client.db('moneybox');
    app.db=db;
    app.listen(8080, function(){
        console.log('listening on 8080');
    });
});



function isAuth(req,res,next){
    if(req.user){
        next()
    }else{
        res.send('로그인안하셨는데요?')
    }
}
