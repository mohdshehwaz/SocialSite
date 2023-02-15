const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){console.log('error in creating a post'); return;}
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post created!"

            })
        }
        return res.redirect('back');
    });
}


module.exports.destroy =async  function(req, res){
    let post = await Post.findById(req.params.id);
    if (post.user == req.user.id){
        post.remove();
        
        await Comment.deleteMany({post: req.params.id});
        
        if(req.xhr){
            
            return res.status(200).json({
                data:{
                    post_id:req.params.id
                },
                message:"post deleted "
            })
        }
    }else{
        return res.redirect('back');
    }
}