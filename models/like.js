const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,

    },
    // this define the object id of the liked object
    likeable:{
        type:mongoose.Schema.ObjectId,
        required:true,
        refPath:'onModel'
    },
    // this feild is used for deleting the type of the liked object since this is a dynamic reference
    onModel:{
        type:String,
        required:true,
        enum:['post','Comment']
    }
},{
    timestamps:true
});
const Like = mongoose.model('Like',likeSchema);
module.exports = Like;
