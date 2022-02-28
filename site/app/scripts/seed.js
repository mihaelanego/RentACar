const { connectToDb } = require("../lib/database");

const { reset, disableChecks, enableChecks } = require("../model/reset");
const {
  createCustomer,
  deleteAllCustomers,
  createAdmin,
} = require("../model/customer");
const { createCarType, deleteAllCarTypes } = require("../model/car-type");
const { createCar, deleteAllCars } = require("../model/car");
const { createAgency, deleteAllAgencies } = require("../model/agency");
const {
  createAgencyLocation,
  deleteAllAgencyLocations,
} = require("../model/agency_location");
const { createLocation, deleteAllLocations } = require("../model/location");
const { createBooking, deleteAllBookings } = require("../model/booking");

async function deleteAll() {
  console.log(`deleted ${await deleteAllBookings()} bookings`);
  console.log(`deleted ${await deleteAllCustomers()} customers`);
  console.log(`deleted ${await deleteAllCars()} cars`);
  console.log(`deleted ${await deleteAllCarTypes()} car-types`);
  console.log(`deleted ${await deleteAllAgencyLocations()} agency locations`);
  console.log(`deleted ${await deleteAllAgencies()} agencies`);
  console.log(`deleted ${await deleteAllLocations()} locations`);
}

async function seedCustomer() {
  await createCustomer(
    "Bob",
    "customer1",
    "customer1@test.com",
    "1234567",
    "1234567890",
    "M"
  );
  await createCustomer(
    "Fred",
    "customer2",
    "customer2@test.com",
    "1234567",
    "1234567890",
    "M"
  );
  await createCustomer(
    "Betty",
    "customer3",
    "customer3@test.com",
    "1234567",
    "1234567890",
    "F"
  );
  await createCustomer(
    "Judy",
    "customer4",
    "customer4@test.com",
    "1234567",
    "1234567890",
    "F"
  );
  await createCustomer(
    "Mary",
    "customer5",
    "customer5@test.com",
    "1234567",
    "1234567890",
    "F"
  );
  await createAdmin();
}

async function seedCarType() {
  await createCarType("Duster", "Dacia", "SUV", 0);
  await createCarType("X5", "BMW", "SUV", 1);
  await createCarType("A4", "Audi", "Sedan", 1);
  await createCarType("Talisman", "Renault", "Sedan", 0);
  await createCarType("Passat", "Volkswagen", "Combi", 0);
}

async function seedAgency() {
  await createAgency("Auto1", "0711111111");
  await createAgency("Auto2", "0711111112");
  await createAgency("Auto3", "0711111113");
  await createAgency("Auto4", "0711111114");
  await createAgency("Auto5", "0711111115");
}

async function seedCar() {
  await createCar("B11MIC", "2018", "150", "red", 1, 1);
  await createCar("B121MIC", "2019", "180", "white", 4, 1);
  await createCar("B122MIC", "2019", "180", "white", 1, 1);
  await createCar("B123MIC", "2009", "130", "pink", 1, 1);
  await createCar("B11MIC", "2007", "130", "blue", 3, 2);
  await createCar("BV21MIC", "2020", "180", "blue", 2, 5);
  await createCar("BV12MIC", "2013", "130", "red", 1, 5);
  await createCar("BV13MIC", "2013", "130", "red", 3, 5);
  await createCar("BV13MIC", "2021", "130", "red", 1, 5);
  await createCar("DB33MIC", "2015", "150", "black", 4, 3);
  await createCar("DB20MIC", "2017", "160", "gray", 5, 3);
  await createCar("IL81MIC", "2021", "210", "pink", 2, 4);
  await createCar("IL82MIC", "2021", "210", "black", 2, 4);
  await createCar("IL92MIC", "2006", "130", "red", 5, 4);
  await createCar("IL87MIC", "2020", "190", "red", 2, 4);
}

async function seedBooking() {
  await createBooking(new Date(2021, 7, 16, 3), new Date(2021, 8, 3, 3), 5, 1);
  await createBooking(new Date(2021, 5, 1, 3), new Date(2021, 7, 6, 3), 2, 1);
  await createBooking(new Date(2021, 3, 5, 3), new Date(2021, 3, 19, 3), 3, 2);
  await createBooking(new Date(2022, 7, 2, 3), new Date(2022, 7, 4, 3), 1, 3);
  await createBooking(new Date(2021, 5, 16, 3), new Date(2021, 6, 3, 3), 1, 4);
  await createBooking(
    new Date(2021, 10, 10, 3),
    new Date(2021, 10, 28, 3),
    2,
    5
  );
  await createBooking(new Date(2021, 5, 4, 3), new Date(2021, 5, 12, 3), 4, 5);
  await createBooking(new Date(2020, 3, 5, 1), new Date(2021, 5, 16, 3), 2, 5);
  await createBooking(new Date(2021, 7, 16, 3), new Date(2021, 8, 3, 3), 10, 1);
  await createBooking(new Date(2021, 7, 16, 3), new Date(2021, 8, 3, 3), 7, 1);
  await createBooking(new Date(2021, 6, 20, 3), new Date(2021, 6, 24, 3), 13, 3);
}

async function seedLocation() {
  await createLocation("Location1", "Bucuresti", "Lalelelor", "14", "info");
  await createLocation("Location2", "Brasov", "Rozelor", "8", "info");
  await createLocation(
    "Location3",
    "Targoviste",
    "Tudor Vladimirescu",
    "228",
    "info"
  );
  await createLocation(
    "Location4",
    "Slobozia",
    "Mihaei Eminescu",
    "10",
    "info"
  );
  await createLocation(
    "Location5",
    "Botosani",
    "Stefan cel Mare",
    "30",
    "info"
  );
}

async function seedAgencyLocation() {
  await createAgencyLocation(1, 1);
  await createAgencyLocation(2, 1);
  await createAgencyLocation(3, 3);
  await createAgencyLocation(4, 4);
  await createAgencyLocation(5, 5);
}

async function seed() {
  await disableChecks();
  await deleteAll();
  await enableChecks();

  await reset();

  await seedCustomer();
  await seedAgency();
  await seedCarType();
  await seedCar();
  await seedLocation();
  await seedAgencyLocation();
  await seedBooking();
}

connectToDb()
  .then(seed)
  .then(() => process.exit())
  .catch((ex) => {
    console.error(ex);
    process.exit(1);
  });
