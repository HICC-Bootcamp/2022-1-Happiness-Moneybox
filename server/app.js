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