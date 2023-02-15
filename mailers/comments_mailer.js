const nodeMailer = require('../config/nodemailer');


//this is another way of exporting method
exports.newComment = (comment) => {
    
    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from:'shahbazpashauoh@gmail.com',
        to:comment.user.email,
        subject:"New Comment Publish",
        html:htmlString

    },(err,info) => {
        if(err){
            console.log("Error in sending mail",err);
            return;
        }
        console.log("Message send,", info);
        return;
    })
}