const express = require("express");
const { InfoController } = require("../../controllers");
const router = express.Router();
// const { AirplaneMiddlewares } = require("../../middlewares");

// /api/v1/cities POST
router.get("/", InfoController.info);

module.exports = router;
