var express = require('express');
var router = express.Router();
var Sale_item = require('../models/add_sale_item_base');
var File_img = require('../models/file');
var File_Middlewware = require('../models/file_middleware');

router.post('/', async (req, res) => {

    var sale_item = Sale_item({
        main_img: req.body.choice_img,
        addition_img: req.body.multi_choice_img,
        title: req.body.title,
        description: req.body.describe,
        cost: req.body.price,
        Size_XS: req.body.count_item[0],
        Size_S: req.body.count_item[1],
        Size_M: req.body.count_item[2],
        Size_L: req.body.count_item[3]

    });

    try {
        await sale_item.save();
        res.redirect('/admin');
    } catch (err) {
        console.log(err);
    }


})

module.exports = router;