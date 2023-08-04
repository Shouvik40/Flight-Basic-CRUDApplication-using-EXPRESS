const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");
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
async function getAllFlights(query) {
  let customFilter = {};
  let sortFilter = [];
  // trips= MUM-DEL
  if (query.trips) {
    [departureAirportId, arrivalAirportId] = query.trips.split("-");
    // Added a check that they are not same
    if (departureAirportId === arrivalAirportId) {
      throw new AppError(
        "departure airport and arrival airport cannot be same",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    } else {
      customFilter.departureAirportId = departureAirportId;
      customFilter.arrivalAirportId = arrivalAirportId;
    }
  }
  // trips=MUM-DEL&price=1000-4000
  if (query.price) {
    console.log(query.price);
    const [minPrice, maxPrice] = query.price.split("-");
    customFilter.price = {
      [Op.between]: [minPrice, maxPrice == undefined ? 20000 : maxPrice],
    };
  }
  if (query.travellers) {
    customFilter.totalSeats = {
      [Op.gte]: query.travellers,
    };
  }
  if (query.tripDate) {
    let startDate = query.tripDate;
    const day = parseInt(startDate.slice(0, 2));
    const month = parseInt(startDate.slice(2, 4)) - 1; // Months are 0-indexed in JavaScript
    const year = parseInt(startDate.slice(4, 8));
    const dateObject = new Date(year, month, day);
    const nextDay = new Date(dateObject);
    nextDay.setDate(dateObject.getDate() + 1);

    const currentDate = new Date();
    // console.log(dateObject, currentDate);
    if (dateObject < currentDate) {
      throw new AppError(
        "Departure date cannot be before the current date.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    customFilter.departureTime = {
      [Op.gte]: dateObject,
      [Op.lt]: nextDay,
    };
  }
  if (query.sort) {
    console.log(query.sort);
    const params = query.sort.split(",");
    sortFilter = params.map((param) => param.split("_"));
  }
  try {
    const flights = await flightRepository.getAllFlights(
      customFilter,
      sortFilter
    );
    // departureAirportId
    return flights;
  } catch (error) {
    console.log(error);
    if (error.statusCode && error.explanation) {
      throw new AppError(error.explanation, error.statusCode);
    } else {
      throw new AppError(
        "Cannot fetch data of all the flights",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = {
  createFlight,
  getAllFlights,
};
