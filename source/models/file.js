var mongoose = require('mongoose');

var File = new mongoose.Schema({

    file: {
        type: mongoose.Schema.Types.Object,
        required: true
    }
});


module.exports = mongoose.model("File", File);