const { Router } = require("express");
const brandRouter = require("../routes/brandRouter");
const userRouter = require("../routes/userRouter");
const deviceRouter = require("../routes/deviceRouter");
const typeRouter = require("../routes/typeRouter");

const storeRouter = Router();

storeRouter.use("/user", userRouter);
storeRouter.use("/type", typeRouter);
storeRouter.use("/brand", brandRouter);
storeRouter.use("/device", deviceRouter);

module.exports = storeRouter;
