const { StatusCodes } = require("http-status-codes");
const { Logger } = require("../config");
const AppError = require("../utils/errors/app-error");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }
  // Create
  async create(data) {
    const response = await this.model.create(data);
    return response;
  }
  //
  // Delete
  async destroy(data) {
    const response = await this.model.destroy({
      where: {
        id: data,
      },
    });
    return response;
  }
  // Read singele data
  async get(data) {
    const response = await this.model.findByPk(data);
    if (!response) {
      throw new AppError(
        "Not able to find the resourse",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }
  // Read
  async getAll() {
    const response = await this.model.findAll();
    return response;
  }
  // Update
  async update(id, data) {
    // data -> {col: value, ....}
    const response = await this.model.update(data, {
      where: {
        id: id,
      },
    });
    return response;
  }
}

module.exports = CrudRepository;
