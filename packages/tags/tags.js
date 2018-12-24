const router = require("express").Router();
const db = require("../db/db");

// GET /tags
router.get("/", (req, res) => {
    const tasks = db.get("tags").value();
  
    res.json({ status: "OK", data: tasks });
  });

module.exports = router;