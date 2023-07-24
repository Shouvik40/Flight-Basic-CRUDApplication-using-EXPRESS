const express = require("express");

const { InfoController } = require("../../controllers");
const airplaneRoutes = require("./airplane-routes");

const router = express.Router();

///api/v1/airplanes
router.use("/airplanes", airplaneRoutes);

module.exports = router;
