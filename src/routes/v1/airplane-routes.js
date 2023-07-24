const express = require("express");
const { AirplaneController } = require("../../controllers");
const router = express.Router();
const { AirplaneMiddlewares } = require("../../middlewares");

// /api/v1/airplanes POST
router.post(
  "/",
  AirplaneMiddlewares.validateCreateRequest,
  AirplaneController.createAirplane
);
router.get("/", AirplaneController.getAllAirplanes);
router.delete("/", AirplaneController.deleteAirplane);
module.exports = router;
