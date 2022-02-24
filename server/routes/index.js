var router = require('express').Router();
function isAuth(req,res,next){
    if(req.user){
     next()
    }else{
     res.send('로그인안하셨는데요?')
   }
  }
router.get('/' ,isAuth,function(req, res){
    res.render('index.ejs');
});

module.exports = router;