const { Router } = require("express");
const {
  registration,
  login,
  checkAuth,
} = require("../controllers/user.controller");

const userRouter = Router();

userRouter.post("/register", registration);
userRouter.post("/login", login);
userRouter.get("/auth", checkAuth);

module.exports = userRouter;
