const { Router } = require("express");

const userRouter = Router();

userRouter.post("/register");
userRouter.post("/login");
userRouter.get("/auth");

module.exports = userRouter;
