const express = require("express");

const { check } = require("express-validator");

const fccontrollers = require("../controllers/fc-controllers");

const router = express.Router();

router.get("/", fccontrollers.getfclanding);

router.get("/aboutus", fccontrollers.getabout);

router.get("/activities", fccontrollers.getactivities);

router.get("/players", fccontrollers.getplayerandcm);

router.get("/contact", fccontrollers.getcontact);

// router.get('/contactquerytable', fccontrollers.getcontactquery);

router.post(
  "/contact",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail().not().isEmpty(),
    check("phone").not().isEmpty(),
    check("subject").not().isEmpty(),
    check("message").not().isEmpty(),
  ],
  fccontrollers.contactqueryform
);

// router.delete('/contactquerytable', fccontrollers.deleteContactQuery)

module.exports = router;
