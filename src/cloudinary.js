const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function uploadBuffer(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'portfolio/blog', quality: 'auto', fetch_format: 'auto', width: 1200, crop: 'limit' },
      (err, result) => err ? reject(err) : resolve(result.secure_url)
    );
    const { Readable } = require('stream');
    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);
    readable.pipe(stream);
  });
}

module.exports = { cloudinary, uploadBuffer };
