var router = require('express').Router();

function isAuth(req,res,next){
    if(req.user){
     next()
    }else{
     res.send('로그인을 해주세요.')
   }
}

router.use(isAuth);

router.get('/',function(req, res){
    res.render('design.ejs');
});

router.post('/', function(req, res){
   
    var design=req.body.design;

    if(design!='original'){
        req.app.db.collection('information').updateOne({userId : req.user.userId},{ $set: {nowdesign: design} },function(error,result){
            if(error){return console.log(error)}
        })
    }
    res.redirect('/posts');
 });

module.exports = router;