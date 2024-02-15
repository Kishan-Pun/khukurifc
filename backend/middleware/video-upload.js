const multer = require("multer");
const uuid = require("uuid");

const MIME_TYPE_MAP = {
  "video/mp4": "mp4",
  "video/mpeg": "mpeg",
  "video/avi": "avi",
  "video/mov": "mov",
  "video/mkv": "mkv",
  // Add more video MIME types as needed
};

const videoUpload = multer({
  limits: 500000000, // Adjust as per your requirements
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/videos');
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuid.v4() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type!");
    cb(error, isValid);
  },
});

module.exports = videoUpload;
