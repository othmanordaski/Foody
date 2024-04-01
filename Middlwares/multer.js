const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const sharp = require('sharp');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/Images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

const uploadMiddleware = upload.single('image');

const uploadImage = (req, res, next) => {
  uploadMiddleware(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    try {
      // Optimize the image using sharp
      const optimizedImage = await sharp(req.file.path)
        .resize(800, 600)
        .jpeg({ quality: 80 })
        .toBuffer();

      // Upload the optimized image to Cloudinary
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'menu_card' },
        (error, result) => {
          if (error) {
            console.error('Error uploading image:', error);
            return res.status(500).json({ error: 'Could not upload image to Cloudinary' });
          }
          req.image = result.secure_url;
          next();
        }
      );

      uploadStream.end(optimizedImage);
    } catch (error) {
      console.error('Error uploading image:', error);
      return res.status(500).json({ error: 'Could not upload image to Cloudinary' });
    }
  });
};

module.exports = uploadImage;