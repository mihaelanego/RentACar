const { sql } = require("../lib/database");

async function createBooking(booking_date, return_date, car_ID, customer_ID) {
  const result =
    await sql.query`insert into "booking" ("booking_date", "return_date", "car_ID", "customer_ID") values (${booking_date}, ${return_date}, ${car_ID}, ${customer_ID})`;
  return result.rowsAffected;
}

async function getAllBookings() {
  const result =
    await sql.query`select b."ID", b."booking_date", b."return_date", b."car_ID", c."first_name", c."last_name" from "booking" b join "customer" c on b."customer_ID" = c."ID"`;

  return result.recordset;
}

async function getBookingsForMonth(month) {
  const result =
    await sql.query`select b."ID", b."booking_date", b."return_date", b."car_ID", c."first_name", c."last_name" from "booking" b join "customer" c on b."customer_ID" = c."ID" where month(b."booking_date") = ${month}`;

  return result.recordset;
}

async function deleteBooking(id) {
  const result = await sql.query`delete from "booking" where "ID" = ${id}`;
  return result.rowsAffected;
}

async function deleteAllBookings() {
  const result = await sql.query`delete from "booking"`;
  return result.rowsAffected;
}

module.exports = {
  createBooking,
  getAllBookings,
  getBookingsForMonth,
  deleteBooking,
  deleteAllBookings,
};
