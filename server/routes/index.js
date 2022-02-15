var router = require('express').Router();

router.get('/', function(req, res){
    req.app.db.collection('user').find().toArray(function(error,result){
        res.render('index.ejs', {user:result});
    });
});

module.exports = router;