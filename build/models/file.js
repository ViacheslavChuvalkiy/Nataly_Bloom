var multer = require('multer');

var storage = multer.diskStorage({

    destination(req,file, cb){
        cb(null,'images')},
    filename(req,file, cb){
        cb(null,new Date().toISOString() + '-' + file.originalname)
    }

});

var allowedTypes = ['image/png','image/jpg','image/jpeg'];

var fileFilter = (req,file, cb) =>{

    if(allowedTypes.includes(file.mimetype)){
        cb(null, true)
    }
    else {
        cb(null,false)
    };

};

module.exports = multer({storage, fileFilter});