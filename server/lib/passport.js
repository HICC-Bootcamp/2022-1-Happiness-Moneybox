module.exports=function(app){

    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;

    app.use(passport.initialize());
    app.use(passport.session()); 

    var sha256= require('sha256');
    const crypto = require('crypto');
    
  passport.use(new LocalStrategy({
    usernameField: 'userId',
    passwordField: 'password',
    session: true,
    passReqToCallback: false,
  }, function (InputId, InputPW, done) {
    console.log(InputId, InputPW);
    app.db.collection('user').findOne({ userId: InputId }, function (error, result) {
      if (error) return done(error)

      if (!result) return done(null, false, { message: '존재하지않는 아이디요' })
      var hash = sha256(InputPW+result.saltname)
      if (hash == result.password) {
        return done(null, result)
      } else {
        return done(null, false, { message: '비번틀렸어요' })
      }
    })
  }));

   passport.serializeUser(function (user, done) {
    done(null, user.userId)
   });


   passport.deserializeUser(function (아이디, done) {
      app.db.collection('user').findOne({ userId: 아이디 }, function (error, result) {
      done(null, result)
       })
    });

    return passport;
}

