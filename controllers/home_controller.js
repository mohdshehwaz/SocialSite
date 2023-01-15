module.exports.home = (req,res) => {
    return res.render('home',{
        title:"Home is "
    });
};
module.exports.post = (req,res) => {
    console.log(req.body);
    res.end("Post successfully");
}