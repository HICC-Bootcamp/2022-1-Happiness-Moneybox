var router = require('express').Router();



router.get('/before', function(req, res){
    req.app.db.collection('user').findOne({userId : req.user.userId}, function(error,result){
      res.render('dday.ejs',{ username: result.nickname});
    });
})


module.exports = router;