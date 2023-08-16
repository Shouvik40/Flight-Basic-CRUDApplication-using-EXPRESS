const CrudRepository = require("./crud-repository");
const { Flight, Airport, City, Airplane } = require("../models");
const db = require("../models");
const { Sequelize, Op } = require("sequelize");
const { convertToBoolean } = require("../utils/helpers/conversion-herpers");
class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }
  async getAllFlights(filter, sort) {
    const response = await Flight.findAll({
      where: filter,
      order: sort,
      include: [
        {
          model: Airplane,
          as: "airplaneDetail",
          required: true,
        },
        {
          model: Airport,
          as: "departureAirport",
          required: true,
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.departureAirportId"),
              "=",
              Sequelize.col("departureAirport.code")
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
        {
          model: Airport,
          as: "arrivalAirport",
          required: true,
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.arrivalAirportId"),
              "=",
              Sequelize.col("arrivalAirport.code")
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
      ],
    });
    return response;
  }
  async updateRemainingSeats(flightId, seats, dec = true) {
    await db.sequelize.query(
      `SELECT * from Flights WHERE Flights.id = ${flightId} FOR UPDATE;`
    );

    let ifDecrease = convertToBoolean(dec);
    const flight = await Flight.findByPk(flightId);

    if (ifDecrease) {
      await flight.decrement("totalSeats", { by: seats });
    } else {
      await flight.increment("totalSeats", { by: seats });
    }
    return flight;
  }
}

module.exports = FlightRepository;
