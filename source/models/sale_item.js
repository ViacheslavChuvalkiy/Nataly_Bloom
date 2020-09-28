var mongoose = require('mongoose');

var SchemaSaleItems = mongoose.Schema(
    {

        tittle: {
            type: String,
            required: true
        },
        count: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'User',
            required: true
        }
    });

module.exports = mongoose.model('TemporaryCart',SchemaSaleItems);