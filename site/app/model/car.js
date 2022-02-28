const { sql } = require("../lib/database");

async function createCar(
  registration_nr,
  manufacturing_year,
  price_day,
  color,
  car_type_ID,
  agency_ID
) {
  const result =
    await sql.query`insert into "car" ("registration_nr", "manufacturing_year","price_day","color", "car_type_ID", "agency_ID") values (${registration_nr}, ${manufacturing_year}, ${price_day}, ${color}, ${car_type_ID}, ${agency_ID})`;
  return result.rowsAffected;
}

async function updateCar(
  id,
  registration_nr,
  manufacturing_year,
  price_day,
  color,
  car_type_ID,
  agency_ID
) {
  const result =
    await sql.query`update "car" set "registration_nr" = ${registration_nr}, "manufacturing_year" = ${manufacturing_year}, "price_day" = ${price_day}, "color" = ${color}, "car_type_ID" = ${car_type_ID}, "agency_ID" = ${agency_ID} where "ID" = ${id}`;
  return result.rowsAffected;
}

async function getAllCars() {
  const result =
    await sql.query`select "car"."ID", "car"."car_type_ID", "car"."agency_ID", "car"."manufacturing_year", "car"."registration_nr", "car"."price_day", "car"."color", "car_type"."name" as "car_type_name", "car_type"."producer" as "car_type_producer", "agency"."name" as "agency_name" from "car" join "car_type" on "car".car_type_ID = "car_type".ID join "agency" on "car".agency_ID = "agency".ID`;
  return result.recordset;
}

async function deleteCar(id) {
  await sql.query`delete from "booking" where "ID" in (select "ID" from "booking" where "car_ID" = ${id})`;
  const result = await sql.query`delete from "car" where "ID" = ${id}`;
  return result.rowsAffected;
}

async function deleteAllCars() {
  const result = await sql.query`delete from "car"`;
  return result.rowsAffected;
}

module.exports = {
  createCar,
  updateCar,
  getAllCars,
  deleteCar,
  deleteAllCars,
};
