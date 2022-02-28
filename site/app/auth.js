const express = require("express");

const { getCustomerByMail, createCustomer } = require("./model/customer");

const routes = express.Router();

routes.get("/login", (req, res) => {
  res.render("login");
});

routes.get("/register", (req, res) => {
  res.render("register");
});

routes.post("/auth/login", async (req, res) => {
  const customer = await getCustomerByMail(req.body.mail);
  if (!customer || customer.password != req.body.password) {
    res.redirect("/login");
  } else {
    res.cookie("cid", customer.ID, { httpOnly: true });
    res.redirect("/");
  }
});

routes.post(
  "/auth/register",
  express.urlencoded({ extended: true }),
  async (req, res) => {
    const data = req.body;

    try {
      await createCustomer(
        data.firstName,
        data.lastName,
        data.email,
        data.password,
        data.phone,
        data.gender
      );
    } catch (ex) {
      res.redirect("/register");
      return;
    }
    res.redirect("/login");
  }
);

routes.get("/auth/logout", (req, res) => {
  res.clearCookie("cid");
  res.redirect("/login");
});

module.exports = routes;
