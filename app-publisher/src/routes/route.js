'use strict'

var express = require("express");

const router = express.Router();
const controller = require('../controllers/controller');

router.post("/sendmessage", controller.post);

module.exports = router;