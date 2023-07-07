const multer = require('multer')

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')){
        cb(null,true);
    }else {
         cb('please upload an image',false)
    }
}

const upload = multer({ storage, fileFilter });


module.exports = upload;