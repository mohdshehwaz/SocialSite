const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// use for session cookie
const session = require('express-session');
const passport = require('passport');

const passportLocat =  require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo');

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
///make the uploads path visible  to the user
app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(expressLayouts);
// extract styles and scripts of subpages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);




// ejs engine
app.set('view engine','ejs');
app.set('views','./views');
// mongo store is used to store the session cookie in the db

app.use(session({
    name:'codieal',
    //TODO change the secret before deployment in production code
    secret:'secret123',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:MongoStore.create({
        mongoUrl:'mongodb://127.0.0.1:27017/AppData',
       autoRemove:'disabled'
    })
}));
// ,function(err) {
//     console.log(err || 'connect to mongodb -store');
// }

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//use express router
app.use('/',require('./routes/index'));

app.listen(port,(err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log("Server is running on port", port);
});
