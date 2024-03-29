// const multer = require('multer')
// const storage = multer.diskStorage ({
//  destination : (req, file, cb) => {
//   cb(null, './public/Images')
//  },
//  filename : (req, file , cb) => {
//   cb(null, Date.now() + '-' + file.originalname)
//  }
// })


// const upload = multer({storage})
// module.exports = upload.single('image')
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/Images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

const uploadImage = (req, res, next) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      req.image = result.secure_url;
      next();
    } catch (error) {
      return res.status(500).json({ error: 'Could not upload image to Cloudinary' });
    }
  });
};

module.exports = uploadImage;
