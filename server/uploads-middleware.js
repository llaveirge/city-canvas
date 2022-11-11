const path = require('path');
const multer = require('multer');
const os = require('os');

const tmpDirectory = os.tmpdir();

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, tmpDirectory);
  },
  filename(req, file, callback) {
    const fileExtension = path.extname(file.originalname);
    const name = `${file.fieldname}-${Date.now()}${fileExtension}`;
    callback(null, name);
  }
});

const uploadsMiddleware = multer({ storage }).single('image');

module.exports = uploadsMiddleware;
