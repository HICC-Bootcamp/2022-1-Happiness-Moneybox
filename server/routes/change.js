var router = require('express').Router();

router.get('/',function(req, res){
    res.render('change.ejs');
});

router.post('/', function(req, res){
   
    var design=req.body.design;

    req.app.db.collection('information').updateOne({userId : req.user.userId},{ $set: {nowdesign: design} },function(error,result){
        if(error){return console.log(error)}
    })

    res.send("응답완료");

 });

module.exports = router;