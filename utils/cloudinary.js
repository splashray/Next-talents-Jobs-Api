require('dotenv').config();
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDAPIKEY,
    api_secret: process.env.CLOUDAPISECRET
});

const imageUploader = async (id, path) => {
    const result = await cloudinary.uploader.upload(path,{
        public_id:`${id}_profile`,
        width: 500,
        height: 500,
        crop: 'fill',
    });
    const image = result.url;
    return image;
}


module.exports = {imageUploader};