var mongoose = require('mongoose');

var SchemaUser = new mongoose.Schema(
{
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    cart: {
        items : [
            {
               count: {
                   type : Number,
                   required: true,
                   default: 1
               },
               itemId : {
                   type: mongoose.Schema.Types.ObjectID,
                   ref: 'SaleItem',
                   required: true,
               }
            }
        ]
    }

});

module.exports = mongoose.model('User', SchemaUser);
