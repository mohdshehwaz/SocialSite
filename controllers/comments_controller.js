const Comment = require('../models/comment');
const Post = require('../models/post');
const commentMailer=require('../mailers/comments_mailer');


module.exports.create = function(req, res){
    Post.findById(req.body.post, function(err, post){

        if (post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            },async  function(err, comment){
                // handle error

                post.comments.push(comment);
                post.save();
                comment = await comment.populate('user','name email');
                commentMailer.newComment(comment);

                res.redirect('/');
            });
        }

    });
}


module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err, post){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    });
}