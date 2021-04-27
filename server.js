require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const storeRouter = require("./store/store.router");
const sequelize = require("./db");
const ApiError = require("./utils/apiError");
const models = require("./models/models");
const fileUpload = require("express-fileupload");
const path = require("path");

const port = process.env.PORT || 3001;

module.exports = class StoreServer {
  constructor() {
    this.server = null;
  }

  async start() {
    // Input start middlwares here
    this.initPort();
    this.initServer();
    this.initMiddlwares();
    this.initRoutes();
    await this.initDatabase();
    this.errorHandling();
    this.startListening();
  }

  initServer() {
    this.server = express();
    console.log("server initialized");
  }

  initPort() {
    this.port = port;
    console.log("port initialized");
  }

  initMiddlwares() {
    this.server.use(express.json());
    this.server.use(express.static("static"));
    this.server.use(fileUpload({}));
    this.server.use(morgan("dev"));
    this.server.use(cors());
    console.log("middlewares initialized");
  }

  errorHandling() {
    let status = 500;
    this.server.use((error, req, res, next) => {
      if (error instanceof ApiError) {
        status = error.status;
      }

      return res.status(status).send({ message: error.message });
    });
  }

  initRoutes() {
    // input routers here
    this.server.use("/api/store", storeRouter);
    console.log("routes initialized");
  }

  async initDatabase() {
    try {
      await sequelize.authenticate();
      await sequelize.sync();
      console.log("Database connection successful");
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
    console.log("DB initialized");
  }

  startListening() {
    this.server.listen(this.port, () => {
      console.log("Server started at PORT:", this.port);
    });
  }
};
