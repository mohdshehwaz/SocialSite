const User = require('../models/user');

module.exports.profile = (req,res) => {
    return res.render('user_profile',{
        title:"Home is "
    });
};
// render the signup page
module.exports.signup = (req,res) =>{
    return res.render('user_sign_up',{
        title:"Codiel | Sign Up"
    });
    
}
// render the sign up page

module.exports.signIn = (req,res) => {
    return res.render('user_signin',{
        title:"Codiel | Sign In"
    });
}


// get the signup data
module.exports.create = (req,res) => {
    console.log(req.body);
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},(err,user) => {
        
        if(err){
            console.log("error in finding user in signing up");
            return;
        }
        if(!user){
            User.create(req.body,(err,user) => {
                if(err){
                    console.log("error in creating user while signing up");
                    return;
                    
                }
                return res.redirect('/users/sign-in');
            })
        }
        else{
            return res.redirect('back');
        }

    });

}

module.exports.createSession = (req,res) =>{

}