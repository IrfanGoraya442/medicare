import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
import streamifier from "streamifier";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//to upload files to cloudinary
// export async function uploadToCloudinary(filePath, folder="Doctor") {
//     try{
//         const result = await cloudinary.uploader.upload(filePath, {
//         folder,
//         resource_type: "image",
//     });
//     // remove the local file after upload
//     fs.unlinkSync(filePath);
//     return result;
// }
// catch (err) {
//     console.error("Cloudinary upload Error:", err);
//     throw err;
// }
// }

export async function uploadToCloudinary(fileBuffer, folder = "Doctor") {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
}






// to delete an image that is present in cloudinary if user removes from the UI.
export async function deleteFromCloudinary(publicId) {
    try {
        if (!publicId) return;
        await cloudinary.uploader.destroy(publicId);
    }
    catch (err) {
        console.error("Cloudinary delete Error:", err);
        throw err;
    }
}

export default cloudinary;