const { Router } = require("express");
const {
  registration,
  login,
  checkAuth,
} = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const userRouter = Router();

userRouter.post("/register", registration);
userRouter.post("/login", login);
userRouter.get("/auth", authMiddleware, checkAuth);

module.exports = userRouter;
