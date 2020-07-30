const Category = require('../models/category');

exports.create = async (req, res) => {
  const category = await Category.create(req.body);
  res.send(category);
};

exports.findById = async (req, res) => {
  const category = await Category.findOne('*', { id: req.params.id });
  if (!category) res.status(404).send('category not found');
  else res.send(category);
};

exports.findAll = async (req, res) => {
  const categories = await Category.findAll('id, name, type');
  res.send({ categories });
};

exports.update = async (req, res) => {
  await Category.update(req.body);
  res.status(200).send({ completed: true });
};

exports.delete = async (req, res) => {
  await Category.delete(req.params.id);
  res.status(200).send({ completed: true });
};
