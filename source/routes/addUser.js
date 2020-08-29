var express = require('express');
var router = express.Router();
var Users = require('../models/add_users');

router.post('/', async (req,res)=> {

    var user = new Users({
        email:    req.body.email,
        password: req.body.password,
        name:     req.body.name,
        phone:    req.body.phone
    });

    try{
        await user.save();
        res.redirect('/');
    }
    catch (err) {
        console.log(err);
    }

});

module.exports = router;
