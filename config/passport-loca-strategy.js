const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email'
    },
    (email,password,done) =>{
        // find the user and establish the identity
        User.findOne({email:email},(err,user) => {
            if(err){
                console.log("Error in finding user -> Passport");
                return done(err);
            }
            if(!user || user.password != password){
                console.log("Invalid username password");
                return done(null,false);
            }
            return done(null,user);
        });
    }




));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error in finding user -> Passport");
            return done(err);
        }
        return done(null,user);
    });
});
// check user is authenticated
passport.checkAuthentication  = (req,res,next) => {
    // if the user sign in pass on the request to the next function

    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser = (req,res,next) => {
    if(req.isAuthenticated()){
        // req.user contains the curr signed in user from the session cookie and we are sending this 
        res.locals.user = req.user;
    }
    next();

}

module.exports = passport;