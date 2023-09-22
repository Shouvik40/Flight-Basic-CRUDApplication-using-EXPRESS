const express = require("express");

const airplaneRoutes = require("./airplane-routes");
const cityRoutes = require("./city-routes");
const airportRoutes = require("./airport-routes");
const flightRoutes = require("./flight-routes");
const infoRoutes = require("./info-routes");

const router = express.Router();

///api/v1/airplanes
router.use("/airplanes", airplaneRoutes);
router.use("/cities", cityRoutes);
router.use("/airports", airportRoutes);
router.use("/flights", flightRoutes);
router.use("/info", infoRoutes);
module.exports = router;
