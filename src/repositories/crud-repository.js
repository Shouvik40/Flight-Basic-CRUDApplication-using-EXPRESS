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
    try {
      const response = await this.model.destroy({
        where: {
          id: data,
        },
      });
      return response;
    } catch (error) {
      Logger.error("Something went wrong in the Crud Repo : destroy");
      throw error;
    }
  }
  // Read
  async get(data) {
    try {
      const response = await this.model.findByPk(data);
    } catch (error) {
      Logger.error("Something went wrong in the Crud Repo : get");
      throw error;
    }

    return response;
  }
  // Read
  async getAll() {
    try {
      const response = await this.model.findAll();
      return response;
    } catch (error) {
      Logger.error("Something went wrong in the Crud Repo : getAll");
      throw error;
    }
  }
  // Update
  async update(id, data) {
    try {
      // data -> {col: value, ....}
      const response = await this.model.update(data, {
        where: {
          id: id,
        },
      });
      return response;
    } catch (error) {
      Logger.error("Something went wrong in the Crud Repo : update");
      throw error;
    }
  }
}

module.exports = CrudRepository;
