const express = require("express");
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const morgan = require("morgan");
const multer = require("multer");
const errorHandler = require("errorhandler");
const path = require("path");
const config = require("./config");

const app = express();
require("./database");

app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    partialsDir: path.join(app.get("views"), "partials"),
    layoutsDir: path.join(app.get("views"), "layouts"),
    extname: ".hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: require("./helpers"),
  })
);
app.set("view engine", ".hbs");

app.use(morgan("dev"));
app.use(
  multer({
    dest: path.join(__dirname, "/public/uploads/temp"),
  }).single("image")
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(require("./routes"));
app.use("/statics", express.static(path.join(__dirname, "public")));

if (app.get("env") === "development") {
  app.use(errorHandler);
}

app.listen(config.port, () => {
  console.log(`server on port ${config.port}`);
});
