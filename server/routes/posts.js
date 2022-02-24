var router = require('express').Router();

router.get('/write', function(req, res){

    req.app.db.collection('happymoney').findOne({userId : 'shw1234'}, function(error,result){
      res.render('write.ejs',{currentMoney:result.Happy_money});
    });
  })
  
  router.post('/write', function (req, res) {
      req.app.db.collection('counter').findOne({name : '게시물갯수'}, function(error,result){
        var postNumber = result.totalPost;
       
        req.app.db.collection('happymoney').findOne({userId : 'shw1234'}, function(error,result){
  
          var money=parseInt(req.body.money);
  
          req.app.db.collection('happymoney').updateOne({userId:'shw1234'},{ $inc: {Happy_money:money} },function(error,result){
            if(error){return console.log(error)}
            })
          })
  
        req.app.db.collection('posts').insertOne({ _id : postNumber + 1, Happy_money:parseInt(req.body.money), 날짜: req.body.date, 제목 : req.body.title, 내용 : req.body.content }
          ,function (error, result) {
          req.app.db.collection('counter').updateOne({name:'게시물갯수'},{ $inc: {totalPost:1} },function(error,result){
          if(error){return console.log(error)}
            res.send('전송완료');
  
          })
        })
    
      })
    })

module.exports = router;