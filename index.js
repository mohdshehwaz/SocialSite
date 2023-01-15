const express = require('express');

const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');


app.use(express.static('./assets'));

app.use(expressLayouts);
// extract styles and scripts of subpages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//use express router
app.use('/',require('./routes/index'));

// ejs engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,(err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log("Server is running on port", port);
});
