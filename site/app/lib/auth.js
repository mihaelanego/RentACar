const { getCustomerByID } = require("../model/customer");

function isAuth(req, res, next) {
  if (!req.cookies.cid) {
    res.redirect("/login");
    return;
  }

  next();
}

function isAdmin(req, res, next) {
  getCurrentCustomer(req)
    .then((customer) => {
      if (customer.is_admin) {
        next();
      } else {
        res.redirect("/");
        return;
      }
    })
    .catch((ex) => {
      res.redirect("/");
    });
}

async function getCurrentCustomer(req) {
  const id = req.cookies.cid;
  const customer = await getCustomerByID(id);
  return customer;
}

module.exports = {
  isAuth,
  isAdmin,
  getCurrentCustomer,
};
