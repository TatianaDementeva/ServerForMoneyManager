const router = require("express").Router();
const db = require("../db/db");

// GET /commodities/day/:date
router.get("/day/:date", (req, res) => {
  const reqDate = new Date(Number(req.params.date));
  const reqDay = reqDate.getDate();

  function filterByDay(element) {
    let elementDay = new Date(element.date);
    elementDay = elementDay.getDate();

    if (elementDay === reqDay) return true;
    return false;
  }
  const commodity = db
    .get("commodities")
    .filter(filterByDay)
    .value();

  res.json({ status: "OK", data: commodity });
});

// GET /commodities/week/:date
router.get("/week/:date", (req, res) => {
  const reqDate = new Date(Number(req.params.date));
  reqDate.setHours(0, 0, 0, 0);

  const reqWeek = reqDate.getDay();

  let startDay = 0;

  if (reqWeek === 0) {
    startDay = reqDate - 6 * 86400000;
  } else startDay = reqDate.getTime() - (reqWeek - 1) * 86400000;

  let endDay = reqDate.getTime() + ((7 - reqWeek + 1) % 7) * 86400000;
  console.log("START", startDay);
  console.log("END", endDay);

  function filterByWeek(element) {
    let elementDay = new Date(element.date);

    if (elementDay >= startDay && elementDay < endDay) return true;
    return false;
  }
  const commodity = db
    .get("commodities")
    .filter(filterByWeek)
    .value();

  res.json({ status: "OK", data: commodity });
});

// GET /commodities/month/:date
router.get("/month/:date", (req, res) => {
  const reqDate = new Date(Number(req.params.date));
  const reqMonth = reqDate.getMonth();

  function filterByMonth(element) {
    let elementDate = new Date(element.date);
    let elementMonth = elementDate.getMonth();

    if (elementMonth === reqMonth) return true;
    return false;
  }
  const commodity = db
    .get("commodities")
    .filter(filterByMonth)
    .value();

  res.json({ status: "OK", data: commodity });
});

// GET /commodities/year/:date
router.get("/year/:date", (req, res) => {
  const reqDate = new Date(Number(req.params.date));
  const reqYear = reqDate.getFullYear();

  function filterByYear(element) {
    let elementDate = new Date(element.date);
    let elementYear = elementDate.getFullYear();

    if (elementYear === reqYear) return true;
    return false;
  }
  const commodity = db
    .get("commodities")
    .filter(filterByYear)
    .value();

  res.json({ status: "OK", data: commodity });
});

const newCommodity = commodity => ({
  id: String(
    Math.random()
      .toString(16)
      .split(".")[1]
  ),
  date: commodity.date,
  name: commodity.name,
  price: Number(commodity.price),
  tag: Number(commodity.tag)
});
// POST /commodities
router.post("/", (req, res, next) => {
  console.log(req.body.commodity);
  const commodity = newCommodity(req.body.commodity);
  console.log(commodity);
  db.get("commodities")
    .push(commodity)
    .write();

  res.json({ status: "OK", data: commodity });
});

module.exports = router;
