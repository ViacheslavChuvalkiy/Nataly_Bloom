var express = require('express');
var router = express.Router();
var Users = require('../models/add_users');
var SaleItems = require('../models/sale_item.min');

router.post('/', async (req,res)=> {

   var sale_item = SaleItems.getById(req.body._id);
   User.addToCart(sale_item);

});

module.exports = router;