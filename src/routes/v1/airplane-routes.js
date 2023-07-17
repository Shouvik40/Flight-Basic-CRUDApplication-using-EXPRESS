const express = require("express");
const { AirplaneController } = require("../../controllers");
const router = express.Router();

console.log("Inside airplane routes");

// /api/v1/airplanes POST
router.post("/", AirplaneController.createAirplane);
router.get("/", AirplaneController.getAllAirplanes);
router.delete("/", AirplaneController.deleteAirplane);
module.exports = router;
