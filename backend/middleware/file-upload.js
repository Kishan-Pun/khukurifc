const multer = require("multer");
const uuid = require("uuid");
// const uuid4 = uuid.v4();
// const { v4: uuidv4 } = require('uuid');
// const path = require("path");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};


const fileUpload = multer({
  limits: 50000000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images');
      },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuid.v4() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    // console.log('MIME Type:', file.mimetype);
    let error = isValid ? null : new Error("Invalid mime type!");
    cb(error, isValid);
  },
});

module.exports = fileUpload;
