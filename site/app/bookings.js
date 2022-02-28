const express = require("express");

const { getCurrentCustomer, isAuth, isAdmin } = require("./lib/auth");
const { makeTable } = require("./lib/table");
const {
  getAllBookings,
  getBookingsForMonth,
  deleteBooking,
} = require("./model/booking");

const routes = express.Router();

const months = [
  "null",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

routes.delete("/admin/api/bookings/:id", isAuth, isAdmin, async (req, res) => {
  const id = req.params.id;

  await deleteBooking(id);

  res.json({ ok: true });
});

routes.get("/bookings", isAuth, isAdmin, async (req, res) => {
  const customer = await getCurrentCustomer(req);
  let bookings =
    !req.query.mo || req.query.mo == "null"
      ? await getAllBookings()
      : await getBookingsForMonth(parseInt(req.query.mo));

  bookings = bookings.map((booking) => {
    booking.booking_date = booking.booking_date
      .toISOString()
      .replace(/T/, " ") // replace T with a space
      .replace(/\..+/, "")
      .split(" ")[0];

    booking.return_date = booking.return_date
      .toISOString()
      .replace(/T/, " ") // replace T with a space
      .replace(/\..+/, "")
      .split(" ")[0];

    return booking;
  });

  res.render("bookings", {
    customer,
    bookingsTable: makeTable(
      !req.query.mo || req.query.mo == "null"
        ? "All Bookings"
        : `Bookings for ${months[parseInt(req.query.mo)]}`,
      [
        "ID",
        "booking_date > Booking Date",
        "return_date > Return Date",
        "car_ID > Car ID",
        "first_name > Customer Name",
        "last_name > ",
      ],
      bookings,
      {
        delete: "/admin/api/bookings/",
        selectMonth: "mo",
        returnTo: "/bookings",
      }
    ),
  });
});

module.exports = routes;
