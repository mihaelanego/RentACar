const express = require("express");

const { getCurrentCustomer, isAuth } = require("./lib/auth");
const { getQueries } = require("./lib/queries");
const { makeTable } = require("./lib/table");

const routes = express.Router();

routes.get("/", isAuth, async (req, res) => {
  const customer = await getCurrentCustomer(req);

  const queries = await getQueries();

  const rows = [];
  for (let queryIdx = 0; queryIdx < queries.length; queryIdx++) {
    const query = queries[queryIdx];
    rows.push({
      info: query.info,
      code: query.query,
      data: makeTable(null, Object.keys(query.result[0]), query.result),
    });
  }

  res.render("home", {
    customer,
    rows,
  });
});

module.exports = routes;
