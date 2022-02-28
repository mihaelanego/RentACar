const { sql } = require("../lib/database");

async function createCarType(name, producer, type, automatic) {
  const result =
    await sql.query`insert into "car_type" ("name", "producer","type","automatic") values (${name}, ${producer}, ${type}, ${automatic})`;
  return result.rowsAffected;
}

async function updateCarType(id, name, producer, type, automatic) {
  const result =
    await sql.query`update "car_type" set "name" = ${name}, "producer" = ${producer}, "type" = ${type}, "automatic" = ${automatic} where "ID" = ${id}`;
  return result.rowsAffected;
}

async function getAllCarTypes() {
  const result = await sql.query`select * from "car_type"`;
  return result.recordset;
}

async function deleteCarType(id) {
  await sql.query`delete from "booking" where "ID" in (select "ID" from "booking" where "car_ID" in (select "ID" from "car" where "car_type_ID" = ${id}))`;
  await sql.query`delete from "car" where "car_type_ID" = ${id}`;
  const result = await sql.query`delete from "car_type" where "id" = ${id}`;
  return result.rowsAffected;
}

async function deleteAllCarTypes() {
  const result = await sql.query`delete from "car_type"`;
  return result.rowsAffected;
}

module.exports = {
  createCarType,
  updateCarType,
  getAllCarTypes,
  deleteCarType,
  deleteAllCarTypes,
};
