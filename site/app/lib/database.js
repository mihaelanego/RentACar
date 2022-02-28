const sql = require("mssql");

const connectToDb = () =>
  sql.connect(
    "Server=localhost,1433;Database=inchiriat_masini;User Id=sa;Password=1234567;Encrypt=false"
  );

module.exports = {
  connectToDb,
  sql,
};
