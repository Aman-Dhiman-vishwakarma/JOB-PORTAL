import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDNARY_API, 
    api_secret: process.env.CLOUDNARY_SECRET
});

export default cloudinary;