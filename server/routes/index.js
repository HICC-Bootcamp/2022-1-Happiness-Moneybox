var router = require('express').Router();

router.get('/', function(req, res){
    res.redirect('/auth/signup');
});

module.exports = router;