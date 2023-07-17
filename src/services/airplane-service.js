const { AirplaneRepository } = require("../repositories");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    console.log("Inside service");
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    throw error;
  }
}
async function getAllAirplane() {
  try {
    console.log("Inside service");
    const airplane = await airplaneRepository.getAll();
    return airplane;
  } catch (error) {
    throw error;
  }
}
async function deleteAirplane(data) {
  try {
    console.log("Inside service");
    const airplane = await airplaneRepository.destroy(data);
    return airplane;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createAirplane,
  getAllAirplane,
  deleteAirplane,
};
