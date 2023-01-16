const User = require('../models/user');

module.exports.profile = (req,res) => {
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,(err,user) =>{
            if(user){
                return res.render('user_profile',{
                    title:'user profile',
                    user:user
                })
            }
        });
    }
    else{
        return res.redirect('/users/sign-in');
    }
    
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

    // steps to authenticate

    // find the user
    User.findOne({email:req.body.email},(err,user) => {
        if(err){
            console.log("error in creating user while signing up");
            return;   
        }
        //handle user found
        if(user){
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
        }
        else{
            return res.redirect('back');
        }
        // handle mismatching password which don't match
    

        // handle session creation

    })
    

    

    // handle user not found
}