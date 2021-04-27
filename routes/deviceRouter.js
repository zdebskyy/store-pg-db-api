const { Router } = require("express");
const {
  create,
  getAll,
  getOneById,
} = require("../controllers/device.controller");

const deviceRouter = Router();

deviceRouter.post("/", create);
deviceRouter.get("/", getAll);
deviceRouter.get("/:id", getOneById);

module.exports = deviceRouter;
