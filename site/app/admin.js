const express = require("express");

const { isAuth, isAdmin, getCurrentCustomer } = require("./lib/auth");
const { makeTable } = require("./lib/table");
const { getAllCustomers } = require("./model/customer");
const {
  getAllCarTypes,
  deleteCarType,
  createCarType,
  updateCarType,
} = require("./model/car-type");
const { getAllCars, createCar, deleteCar, updateCar } = require("./model/car");
const { getAllAgencies } = require("./model/agency");

const routes = express.Router();

routes.get("/admin/car-types/add", isAuth, isAdmin, async (req, res) => {
  const customer = getCurrentCustomer(req);
  res.render("admin/add-car-type", { customer });
});

routes.post("/admin/car-types/add", isAuth, isAdmin, async (req, res) => {
  const { name, producer, type, automatic } = req.body;

  await createCarType(name, producer, type, automatic == "on");

  res.redirect("/admin");
});

routes.get("/admin/car-types/:id", isAuth, isAdmin, async (req, res) => {
  const carTypes = await getAllCarTypes();
  const carType = carTypes.find((x) => x.ID == req.params.id);
  const customer = getCurrentCustomer(req);

  res.render("admin/update-car-type", { carType, customer });
});

routes.post("/admin/car-types/:id", isAuth, isAdmin, async (req, res) => {
  const { name, producer, type, automatic } = req.body;
  const customer = getCurrentCustomer(req);

  await updateCarType(req.params.id, name, producer, type, automatic == "on");

  res.redirect("/admin");
});

routes.delete("/admin/api/car-types/:id", isAuth, isAdmin, async (req, res) => {
  const id = req.params.id;

  await deleteCarType(id);

  res.json({ ok: true });
});

routes.get("/admin/cars/add", isAuth, isAdmin, async (req, res) => {
  const carTypes = await getAllCarTypes();
  const agencies = await getAllAgencies();
  const customer = getCurrentCustomer(req);

  res.render("admin/add-car", { carTypes, agencies, customer });
});

routes.post("/admin/cars/add", isAuth, isAdmin, async (req, res) => {
  const {
    registrationNr,
    manufacturingYear,
    pricePerDay,
    color,
    carType,
    agency,
  } = req.body;

  await createCar(
    registrationNr,
    manufacturingYear,
    pricePerDay,
    color,
    carType,
    agency
  );

  res.redirect("/admin");
});

routes.get("/admin/cars/:id", isAuth, isAdmin, async (req, res) => {
  const carTypes = await getAllCarTypes();
  const agencies = await getAllAgencies();
  const customer = getCurrentCustomer(req);
  const cars = await getAllCars();
  const car = cars.find((x) => x.ID == req.params.id);

  res.render("admin/update-car", { car, carTypes, agencies, customer });
});

routes.post("/admin/cars/:id", isAuth, isAdmin, async (req, res) => {
  const {
    registrationNr,
    manufacturingYear,
    pricePerDay,
    color,
    carType,
    agency,
  } = req.body;

  await updateCar(
    req.params.id,
    registrationNr,
    manufacturingYear,
    pricePerDay,
    color,
    carType,
    agency
  );

  res.redirect("/admin");
});

routes.delete("/admin/api/cars/:id", isAuth, isAdmin, async (req, res) => {
  const id = req.params.id;

  await deleteCar(id);

  res.json({ ok: true });
});

routes.get("/admin", isAuth, isAdmin, async (req, res) => {
  const customer = await getCurrentCustomer(req);

  const allCustomers = await getAllCustomers();
  const customersTable = makeTable(
    "Customers",
    [
      "ID",
      "first_name > First Name",
      "last_name > Last Name",
      "mail > Email",
      "phone_nr > Phone #",
      "is_admin > Is admin",
    ],
    allCustomers
  );

  const allCarTypes = await getAllCarTypes();
  const carTypesTable = makeTable(
    "Car types",
    [
      "ID",
      "producer > Producer",
      "name > Name",
      "type > Type",
      "automatic > Is automatic",
    ],
    allCarTypes,
    {
      insert: "/admin/car-types/add",
      update: "/admin/car-types/",
      delete: "/admin/api/car-types/",
    }
  );

  const allCars = await getAllCars();
  const carsTable = makeTable(
    "Cars",
    [
      "ID",
      "registration_nr > Registration #",
      "price_day > Price per day",
      "color > Color",
      "car_type_producer > Producer",
      "car_type_name > Name",
      "manufacturing_year > Manufacturing year",
      "agency_name > Agency",
    ],
    allCars,
    {
      insert: "/admin/cars/add",
      update: "/admin/cars/",
      delete: "/admin/api/cars/",
    }
  );

  res.render("admin", {
    customersTable,
    carTypesTable,
    carsTable,
    customer,
  });
});

module.exports = routes;
