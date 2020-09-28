var mongoose = require('mongoose');

var Sale_Item_Base = new mongoose.Schema(
    {

        main_img: {
            type: String,
            required: true
        },
        addition_img: {
            type: Array,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        cost: {
            type: Number,
            required: true
        },
        Size_XS: {
            type: Number,
            required: true
        },
        Size_S: {
            type: Number,
            required: true
        },
        Size_M: {
            type: Number,
            required: true
        },
        Size_L: {
            type: Number,
            required: true
        }

    });



module.exports = mongoose.model('Sale_Item', Sale_Item_Base);