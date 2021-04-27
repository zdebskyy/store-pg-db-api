const { Router } = require("express");
const { create, getAll } = require("../controllers/brand.controller");

const brandRouter = Router();

brandRouter.post("/", create);
brandRouter.get("/", getAll);

module.exports = brandRouter;
