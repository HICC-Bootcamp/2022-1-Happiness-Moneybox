const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const session = require('express-session');

app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
app.use('/public', express.static('public'));

var passport= require('./lib/passport')(app);

app.use('/', require('./routes/index.js'));
app.use('/auth',require('./routes/auth.js')(passport));
app.use('/posts', require('./routes/posts.js'));
app.use('/design', require('./routes/design.js'));

var db;
MongoClient.connect('mongodb+srv://admin:qwer1234@cluster0.mj0ea.mongodb.net/moneybox?retryWrites=true&w=majority',{ useUnifiedTopology: true },function(error, client){
    if(error) return console.log(error);
    db=client.db('moneybox');
    app.db=db;
    app.listen(8080, function(){
        console.log('listening on 8080');
    });
});

app.get('/detail', function(req, res){
    res.render('detail.ejs')
  })
  
app.get('/detail/:id', function(req, res){
  db.collection('posts').findOne({ _id : parseInt(req.params.id) }, function(error, result){
    res.render('detail.ejs', {posts : result} )
  })
});
  