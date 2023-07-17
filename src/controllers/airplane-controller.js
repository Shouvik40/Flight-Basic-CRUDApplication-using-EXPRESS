const { response } = require("express");
const { AirplaneService } = require("../services");
const { StatusCodes } = require("http-status-codes");

/**
 * POST : /airplane
 * req-body {modelNumber :"airbus320", capacity:200}
 *
 */

async function createAirplane(req, res) {
  try {
    console.log("Inside controller");
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Successfully created an airplane",
      data: airplane,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Successfully went wrong while creating  airplane",
      data: {},
      error: error,
    });
  }
}
async function getAllAirplanes(req, res) {
  try {
    console.log("Inside controller");
    const airplane = await AirplaneService.getAllAirplane();
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Successfully got all the airplanes",
      data: airplane,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Successfully went wrong while creating  airplane",
      data: {},
      error: error,
    });
  }
}
async function deleteAirplane(req, res) {
  try {
    console.log("Inside controller");
    const airplane = await AirplaneService.deleteAirplane(req.body.id);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Successfully deleted an airplane",
      data: airplane,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Successfully went wrong while creating  airplane",
      data: {},
      error: error,
    });
  }
}

module.exports = {
  createAirplane,
  getAllAirplanes,
  deleteAirplane,
};
