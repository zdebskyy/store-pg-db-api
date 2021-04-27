const { Router } = require("express");
const { create, getAll } = require("../controllers/type.controller");

const typeRouter = Router();

typeRouter.post("/", create);
typeRouter.get("/", getAll);

module.exports = typeRouter;
