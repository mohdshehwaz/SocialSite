const express = require('express');

const router = express.Router();
const home_controller = require('../controllers/home_controller');
console.log("router is loaded");

router.get('/',home_controller.home);
// router.post('/post',(req,res) => {
//     console.log(req.body);
//     res.end("successfuly  show the body");
// });

router.use('/users',require('./users'));
module.exports = router;