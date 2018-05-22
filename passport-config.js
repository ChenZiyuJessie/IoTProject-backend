var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var Member=require('./models/member');

/* User Login*/
passport.use('user-local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
   
},
    function (username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.isValid(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    },
));

/* User Login*/
passport.use('member-local', new LocalStrategy({
    usernameField: 'membername',
    passwordField: 'password',

},
    function (membername, password, done) {
        Member.findOne({ membername: membername }, function (err, member) {
            if (err) { return done(err); }
            if (!member) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!member.isPasswordValid(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, member);
        });
    },
));



passport.serializeUser(function (user, done) {
        done(null, user._id);
});
    
passport.deserializeUser(function (id, done) {
    Member.findById(id,function(err,member){
      if(err)return done(err);
      if(member)return done(null,member);
    User.findById(id, function (err, user) {
        done(err, user);
    
    });
});
});