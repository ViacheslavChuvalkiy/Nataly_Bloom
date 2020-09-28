var multer = require('multer');

var storage = multer.diskStorage({

    destination(req,file, cb){

        cb(null,'build/images/item_photos')},

    filename(req,file, cb){
        cb(null,file.originalname) //new Date().toISOString() + '-' +
    }

});

var allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

var fileFilter = (req,file, cb) =>{

    if(allowedTypes.includes(file.mimetype)){
        cb(null, true)
    }
    else {
        cb(null,false)
    };

};

module.exports = multer({storage, fileFilter});