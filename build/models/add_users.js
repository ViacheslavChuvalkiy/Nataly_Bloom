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
                        required: true
                    },
                    date_purchase : {
                        type: Date,
                        required: true
                    }
                }
            ]
        }

    });

SchemaUser.methods.addToCart = function(saleitem){

    var items = this.cart.items;
    var idx = items.findIndex(c => {
        return c.itemId.toString() === saleitem._id.toString() && c.date_purchase.toDateString() === saleitem.date_purchase.toDateString();
    })

    if(idx >= 0){
        items[idx].count++;
    } else {
        items.push({
            itemId: saleitem._id,
            count: 1,
            date_purchase: Date.now().toDateString(),
        })
    }

    this.cart = {items};
    return this.save();
}

module.exports = mongoose.model('User', SchemaUser);
