const { StatusCodes } = require("http-status-codes");

const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { compareTime } = require("../utils/helpers/datetime-helpers");
const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    if (!compareTime(data.departureTime, data.arrivalTime)) {
      throw new AppError(
        "Departure time must be earlier than arrival time",
        StatusCodes.BAD_REQUEST
      );
    }
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    console.log(error, error.statusCode);
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    if (error.statusCode && error.explanation) {
      throw new AppError(error.explanation, error.statusCode);
    } else {
      throw new AppError(
        "Cannot create a new Flight object",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = {
  createFlight,
};
