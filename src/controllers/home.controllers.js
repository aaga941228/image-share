const { Image } = require("../models");
const sidebar = require("../helpers/sidebar");

async function home(req, res) {
  const images = await Image.find().sort({ timestamp: -1 });
  let viewModel = {};
  viewModel.images = images;
  viewModel = await sidebar(viewModel);
  res.render("index", { viewModel });
}

module.exports = { home };
