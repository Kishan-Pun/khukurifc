const express = require("express");
const { check } = require("express-validator");

const admincontrollers = require("../controllers/admin-controllers");

const fileUpload = require("../middleware/file-upload");
// const videoUpload = require("../middleware/video-upload");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const multer = require("multer");

const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }

    if (!fs.existsSync("uploads/videos")) {
      fs.mkdirSync("uploads/videos");
    }
    cb(null, "uploads/videos");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);

    if (
      ext !== ".mkv" &&
      ext !== ".mp4" &&
      ext !== "mpeg" &&
      ext !== "avi" &&
      ext !== "mov" &&
      ext !== "mkv"
    ) {
      return cb(new Error("Only videos are allowed!"));
    }

    cb(null, true);
  },
});

router.get("/shortabouttable", admincontrollers.getshortabouttable);
router.get("/longfcabouttable", admincontrollers.getlongfcabouttable);
router.get("/longteamabouttable", admincontrollers.getlongteamabouttable);
router.get("/contactstable", admincontrollers.getcontacttable);
router.get("/newstable", admincontrollers.getnewstable);
router.get("/playertable", admincontrollers.getplayertable);
router.get("/candmtable", admincontrollers.getcandmtable);
router.get("/contactquerytable", admincontrollers.getcontactquery);
router.get("/activitiestable", admincontrollers.getactivitiestable);

//login/signin

router.post(
  "/signin",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  admincontrollers.signin
);
router.post("/login", admincontrollers.login);

//login/signin closed

router.use(checkAuth);

router.post(
  "/shortaboutform",
  fileUpload.single("aboutimg"),
  [
    check("shorttitle").not().isEmpty(),
    check("shortabout").isLength({ min: 5 }),
  ],
  admincontrollers.shortaboutform
);

router.post(
  "/longfcaboutform",
  fileUpload.single("aboutfclongimg"),
  [
    check("aboutfclongtitle").not().isEmpty(),
    check("aboutfclong").isLength({ min: 5 }),
    // check("aboutfclongimg").not().isEmpty(),
    // check("aboutfclongimg"),
  ],
  admincontrollers.longfcaboutform
);
router.post(
  "/longteamaboutform",
  fileUpload.single("aboutteamlongimg"),
  [
    check("aboutteamlongtitle").not().isEmpty(),
    check("aboutteamlong").isLength({ min: 5 }),
    // check("aboutteamlongimg").not().isEmpty(),
    // check("aboutteamlongimg"),
  ],
  admincontrollers.longteamaboutform
);
router.post(
  "/contactsform",
  [
    // check("phnum").matches(
    //   /^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/
    // ),
    check("phnum").not().isEmpty(),
    check("email").normalizeEmail().isEmail().not().isEmpty(),
    check("address").not().isEmpty(),
    check("srcformap").not().isEmpty(),
  ],
  admincontrollers.contactform
);
router.post(
  "/newsform",
  fileUpload.single("img"),
  [
    check("title").not().isEmpty(),
    check("newsdetail").isLength({ min: 5 }),
    check("publisher").not().isEmpty(),
    check("date").not().isEmpty(),
    // check("img").not().isEmpty(),
    // check("img"),
  ],
  admincontrollers.newsform
);
router.post(
  "/playerform",
  fileUpload.single("playerimg"),
  [
    check("playername").not().isEmpty(),
    check("playerposition").not().isEmpty(),
    check("playerfblink").not().isEmpty(),
    check("playerinstalink").not().isEmpty(),
    // check("playerimg").not().isEmpty(),
    // check("playerimg"),
  ],
  admincontrollers.playerform
);
router.post(
  "/candmform",
  fileUpload.single("CandMimg"),
  [
    check("CandMname").not().isEmpty(),
    check("CandMposition").not().isEmpty(),
    check("CandMfblink").not().isEmpty(),
    check("CandMinstalink").not().isEmpty(),
    // check("CandMimg").not().isEmpty(),
    // check("CandMimg"),
  ],
  admincontrollers.candmform
);
router.post(
  "/activitiesform",
  fileUpload.single("img"),
  [
    check("title").not().isEmpty(),
    check("detail").not().isEmpty(),
    check("date").not().isEmpty(),
  ],
  admincontrollers.activitiesform
);
router.post(
  "/videoupload",
  upload.single("video"), // Using upload.single for a single video upload
  admincontrollers.activitiesvideoform
);

router.delete("/shortabouttable", admincontrollers.deleteShortabout);
router.delete("/longfcabouttable", admincontrollers.deleteLongfcabout);
router.delete("/longteamabouttable", admincontrollers.deleteLongteamabout);
router.delete("/contacttable", admincontrollers.deleteContact);
router.delete("/newstable", admincontrollers.deleteNews);
router.delete("/playertable", admincontrollers.deletePlayer);
router.delete("/candmtable", admincontrollers.deleteCandM);
router.delete("/contactquerytable", admincontrollers.deleteContactQuery);
router.delete("/activitiestable", admincontrollers.deleteActivities);

router.get("/usertable", admincontrollers.usertable);

module.exports = router;
