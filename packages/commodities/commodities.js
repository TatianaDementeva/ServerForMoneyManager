const router = require("express").Router();
const db = require("../db/db");

// GET /commodities/:date
router.get("/:date", (req, res) => {
  const commodity = db
    .get("commodities")
    .find({ date: req.params.date })
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
