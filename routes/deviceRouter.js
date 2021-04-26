const { Router } = require("express");

const deviceRouter = Router();

deviceRouter.post("/");
deviceRouter.get("/");
deviceRouter.get("/:id");

module.exports = deviceRouter;
