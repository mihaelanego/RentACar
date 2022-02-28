const { sql } = require("../lib/database");

async function createAgency(name, phone_nr) {
  const result =
    await sql.query`insert into "agency" ("name", "phone_nr") values (${name}, ${phone_nr})`;
  return result.rowsAffected;
}

async function getAllAgencies() {
  const result = await sql.query`select * from "agency"`;
  return result.recordset;
}

async function deleteAllAgencies() {
  const result = await sql.query`delete from "agency"`;
  return result.rowsAffected;
}

module.exports = {
  createAgency,
  getAllAgencies,
  deleteAllAgencies,
};
