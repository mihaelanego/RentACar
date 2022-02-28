const express = require("express");
const cookieParser = require("cookie-parser");
const hbs = require("express-handlebars");

const { connectToDb } = require("./app/lib/database");

const { table } = require("./app/lib/table");

const auth = require("./app/auth");
const home = require("./app/home");
const admin = require("./app/admin");
const bookings = require("./app/bookings");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    helpers: {
      table,
      checkValue: (value, checkedValue) => {
        if (typeof value == "string") {
          value = value.trim();
        }
        if (typeof checkedValue == "string") {
          checkedValue = checkedValue.trim();
        }

        return value == checkedValue;
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", "./templates");

app.use("/static", express.static("static"));

app.use(cookieParser());

app.use(home);
app.use(auth);
app.use(admin);
app.use(bookings);

const port = process.env.PORT || 3000;

connectToDb().then(() => {
  app.listen(port, () => {
    console.log("listening on port " + port);
  });
});
