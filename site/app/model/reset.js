const {sql} = require("../lib/database");

const tables = [
    "customer",
    "booking",
    "car",
    "car_type",
    "agency",
    "location"
];

async function reset() {
    for(let table of tables) {
        try {
            await sql.query`DBCC CHECKIDENT (${table}, RESEED, 0)`
        } catch(ex) {
            console.log("can't reset", table);
        }
    }
}

async function disableChecks() {
    await sql.query`EXEC sp_msforeachtable 'ALTER TABLE ? NOCHECK CONSTRAINT ALL'`;
}


async function enableChecks() {
    await sql.query`EXEC sp_msforeachtable 'ALTER TABLE ? WITH CHECK CHECK CONSTRAINT ALL'`;
}

module.exports = {
    reset,
    disableChecks,
    enableChecks
};