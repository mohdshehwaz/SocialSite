const Like = require('../models/like');
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.toggleLike = async (req,res) => {
    try{
        //like/toggle/:id/type=Post
        let likeable;
        let deleted=false;
        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');

        }
        else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }
        //check if like already exists
        let existingLike = await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user._id
        });
        //if like already exist delete it
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted = true
        }
        else{
            let newLike = await Like.create({
                user:req.user._id,
                likeable:req.query.id,
                onModel:req.query.type
            })
            likeable.likes.push(like._id);
            likeable.save();
        }
        return res.json(200,{
            message:"Request successful",
            data:{
                deleted:deleted
            }
        })
    }
    catch(err){
        if(err){
            console.log("error in likes toggle",err);

            return res.json(500,{
                message:"Internam server error"
            });
        }
    }
}