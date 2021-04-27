const ApiError = require("../middlewares/apiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");

const generateToken = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET);
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Whrong credentials"));
    }
    const user = await User.findOne({ where: { email } });
    if (user) {
      return next(ApiError.badRequest("This email already in use"));
    }
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = await User.create({
      email,
      role,
      password: hashedPassword.toString(),
    });
    const basket = await Basket.create({ userId: newUser.id });
    const token = generateToken(newUser.id, newUser.email, newUser.role);
    console.log(newUser);

    return res.status(201).json({ newUser, token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.badRequest("Failed to login"));
    }
    const compareToken = await bcrypt.compare(password, user.password);
    if (!compareToken) {
      return next(ApiError.badRequest("Wrong password"));
    }
    const token = generateToken(user.id, user.email, user.role);
    return res.status(200).json(token);
  }

  async checkAuth(req, res) {
    const token = generateToken(req.user.id, req.user.email, req.user.role);
    return res.status(200).json(token);
  }
}

module.exports = new UserController();
