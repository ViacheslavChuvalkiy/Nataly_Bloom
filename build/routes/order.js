var express = require('express');
var router = express.Router();
var Order = require('../models/sale_item.min');


router.post('/', async (req,res)=> {

    var order = new Order({
        id:     req.body.id,
        tittle: req.body.tittle,
        count:  req.body.count,
        userId:   req.user
    });

    try{
        await order.save();
        res.redirect('/');
    }
    catch (err) {
        console.log(err);
    }

});

module.exports = router;
