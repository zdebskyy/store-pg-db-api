const { Router } = require("express");
const { create, getAll } = require("../controllers/type.controller");
const checkRole = require("../middlewares/roleMiddleware");

const typeRouter = Router();

typeRouter.post("/", checkRole("ADMIN"), create);
typeRouter.get("/", getAll);

module.exports = typeRouter;
