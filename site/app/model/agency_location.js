const {sql} = require("../lib/database");

async function createAgencyLocation(agency_ID, location_ID) {
    const result = await sql.query`insert into "agency_location" ("agency_ID", "location_ID") values (${agency_ID}, ${location_ID})`
    return result.rowsAffected;
}

async function deleteAllAgencyLocations() {
    const result = await sql.query`delete from "agency_location"`;
    return result.rowsAffected;
}

module.exports = {
    createAgencyLocation,
    deleteAllAgencyLocations
}