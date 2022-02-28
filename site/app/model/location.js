const {sql} = require("../lib/database");

async function createLocation(name, city, street, number, info) {
    const result = await sql.query`insert into "location" ("name", "city", "street", "number", "info") values (${name}, ${city}, ${street}, ${number}, ${info})`
    return result.rowsAffected;
}

async function deleteAllLocations() {
    const result = await sql.query`delete from "location"`;
    return result.rowsAffected;
}

module.exports = {
    createLocation,
    deleteAllLocations
}