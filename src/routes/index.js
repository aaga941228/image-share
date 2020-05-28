const { Router } = require("express");
const router = Router();

const { home } = require("../controllers/home.controllers");
const {
  index,
  create,
  like,
  comment,
  remove,
} = require("../controllers/image.controllers");

router
  .get("/", home)
  .get("/images/:imageId", index)
  .post("/images", create)
  .post("/images/:imageId/like", like)
  .post("/images/:imageId/comment", comment)
  .delete("/images/:imageId", remove);

module.exports = router;
