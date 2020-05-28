const path = require("path");
const fs = require("fs-extra");
const md5 = require("md5");
const { randomString } = require("../helpers/lib");
const sidebar = require("../helpers/sidebar");
const { Image, Comment } = require("../models");

async function index(req, res) {
  let viewModel = {};
  const image = await Image.findOne({
    filename: { $regex: req.params.imageId },
  });
  if (!!image) {
    image.views++;
    viewModel.image = image;
    await image.save();
    const comments = await Comment.find({ image_id: image._id }).sort({
      timestamp: 1,
    });
    viewModel.comments = comments;
    viewModel = await sidebar(viewModel);
    res.render("image", { viewModel });
  } else {
    res.redirect("/");
  }
}

async function create(req, res) {
  async function saveImage() {
    let imgURL = randomString();
    const images = await Image.find({ filename: imgURL });
    if (images.length > 0) {
      saveImage();
    } else {
      const imgTempPath = req.file.path;
      const ext = path.extname(req.file.originalname).toLowerCase();
      const targetPath = path.resolve(
        __dirname,
        `../public/uploads/${imgURL}${ext}`
      );

      if (
        ext === ".gif" ||
        ext === ".png" ||
        ext === ".jpg" ||
        ext === ".jpeg"
      ) {
        await fs.rename(imgTempPath, targetPath);
        const newImage = new Image({
          uniqueId: imgURL,
          title: req.body.title,
          filename: imgURL + ext,
          description: req.body.description,
        });
        await newImage.save();
        res.redirect("/images/" + imgURL);
      } else {
        await fs.unlink(imgTempPath);
        res.status(400).json({
          message: "Only images are allowed",
        });
      }
    }
  }
  saveImage();
}

async function like(req, res) {
  const image = await Image.findOne({
    filename: { $regex: req.params.imageId },
  });
  if (!!image) {
    image.likes++;
    await image.save();
    res.json({ likes: image.likes });
  } else {
    res.status(500).json({ message: "Internal error" });
  }
}

async function comment(req, res) {
  const image = await Image.findOne({
    filename: { $regex: req.params.imageId },
  });
  if (!!image) {
    const newComment = new Comment(req.body);
    newComment.gravatar = md5(newComment.email);
    newComment.image_id = image._id;
    await newComment.save();
    res.redirect("/images/" + image.uniqueId + "#" + newComment._id);
  } else {
    res.redirect("/");
  }
}

async function remove(req, res) {
  const image = await Image.findOne({
    filename: { $regex: req.params.imageId },
  });
  if (!!image) {
    await fs.unlink(
      path.resolve(__dirname, "../public/uploads", image.filename)
    );
    await Comment.deleteOne({ image_id: image._id });
    await image.remove();
    res.json({ message: "Image deleted successfully", done: true });
  } else {
    res.status(500).json({ message: "Internal error" });
  }
}

module.exports = { index, create, like, comment, remove };
