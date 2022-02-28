const { sql } = require("../lib/database");

async function createCustomer(
  firstName,
  lastName,
  mail,
  password,
  phone,
  gender
) {
  const result =
    await sql.query`insert into "customer" ("first_name", "last_name", "mail","password", "phone_nr", "gender") values (${firstName}, ${lastName}, ${mail}, ${password}, ${phone}, ${gender})`;
  return result.rowsAffected;
}

async function createAdmin() {
  const result =
    await sql.query`insert into "customer" ("first_name", "last_name", "mail","password", "phone_nr", "gender", "is_admin") values ('Admin', 'Admin', 'admin', 'admin', '0000000000', 'F', 'TRUE')`;
  return result.rowsAffected;
}

async function getCustomerByMail(mail) {
  const result = await sql.query`select * from "customer" where "mail"=${mail}`;
  return result.recordset[0];
}

async function getAllCustomers() {
  const result = await sql.query`select * from "customer"`;
  return result.recordset;
}
async function getCustomerByID(id) {
  const result = await sql.query`select * from "customer" where "ID"=${id}`;
  return result.recordset[0];
}

async function deleteAllCustomers() {
  const result = await sql.query`delete from "customer"`;
  return result.rowsAffected;
}

module.exports = {
  createCustomer,
  createAdmin,
  getCustomerByMail,
  getCustomerByID,
  getAllCustomers,
  deleteAllCustomers,
};
