var express = require('express');
var router = express.Router();
var Sale_item = require('../models/sale_item.min');
var Users = require('../models/add_users');

router.post('/', async (req,res)=> {

    var sale_item = Sale_item.getById(req.body._id);

    if(sale_item) {

        try {
            await Users.addToCart(sale_item);
        } catch (err) {
            console.log(err);
        }
    }
});

module.exports = router;
