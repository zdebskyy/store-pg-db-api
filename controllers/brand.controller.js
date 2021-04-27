const { Brand } = require("../models/models");

class BrandController {
  async create(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    res.status(201).json(brand);
  }
  async getAll(req, res) {
    const brands = await Brand.findAll();
    res.status(200).json(brands);
  }
}

module.exports = new BrandController();
