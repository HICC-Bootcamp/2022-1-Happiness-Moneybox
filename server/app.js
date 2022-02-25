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

var db;
MongoClient.connect('mongodb+srv://admin:qwer1234@cluster0.mj0ea.mongodb.net/moneybox?retryWrites=true&w=majority',{ useUnifiedTopology: true },function(error, client){
    if(error) return console.log(error);
    db=client.db('moneybox');
    app.db=db;
    app.listen(8080, function(){
        console.log('listening on 8080');
    });
});

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html')
});

app.get('/write',function(req,res){
    res.sendFile(__dirname+'/write.html')
});

app.post('/add',function(req,res){//req에 입력한 값이 저장되어있음
    res.send('전송완료')
    db.collection('counter').findOne({name : '게시물갯수'}, function(에러, 결과){
        console.log(결과.totalPost)
        var 총게시물갯수 = 결과.totalPost;
        db.collection('list').insertOne( {_id: 총게시물갯수 +1, 제목 : req.body.title, 날짜 : req.body.date, 내용:req.body.text 
        ,해피머니: req.body.money} , function(){
            console.log('저장완료')
            db.collection('counter').updateOne( {name: '게시물갯수'} ,{ $inc: {totalPost:1}} , function(에러, 결과){
                console.log('수정완료')
              })
          });
    });
});

app.get('/list', function(요청, 응답){
    db.collection('list').find().toArray(function(에러, 결과){
      console.log(결과)
      응답.render('list.ejs', { posts : 결과 })
    })
})

app.get('/detail', function(요청, 응답){
      응답.render('detail.ejs')
})

app.get('/detail/:id', function(요청, 응답){
    db.collection('list').findOne({ _id : parseInt(요청.params.id) }, function(에러, 결과){
      응답.render('detail.ejs', {data : 결과} )
    })
  });