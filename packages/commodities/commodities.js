const router = require("express").Router();
const db = require("../db/db");

// GET /commodities/:date
router.get("/:date", (req, res) => {
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

// GET /tasks/:id
router.get("/:id", (req, res) => {
  const task = db
    .get("tasks")
    .find({ id: req.params.id })
    .value();

  res.json({ status: "OK", data: task });
});

module.exports = router;
