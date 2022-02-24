var router = require('express').Router();

router.get('/',function(req, res){
    res.redirect('/auth/login');
});

module.exports = router;