const router = require("express").Router();
const db = require("../db/db");
const { validate } = require("jsonschema");

const newTask = text => ({
  id: String(
    Math.random()
      .toString(16)
      .split(".")[1]
  ),
  text,
  isCompleted: false
});

// router.use('/:id', (req, res, next) => {
//   const task = db.get('tasks')
//     .find({ id: req.params.id })
//     .value();
//
//   if (!task) {
//     next(new Error('CAN_NOT_FIND_TASK'));
//   }
// });

// GET /tasks
router.get("/", (req, res) => {
  const tasks = db.get("tasks").value();

  res.json({ status: "OK", data: tasks });
});

// GET /tasks/:id
router.get("/:id", (req, res) => {
  const task = db
    .get("tasks")
    .find({ id: req.params.id })
    .value();

  res.json({ status: "OK", data: task });
});

// POST /tasks
router.post("/", (req, res, next) => {
  // const requestBodySchema = {
  //   id: 'path-task',
  //   type: 'object',
  //   properties: { text: { type: 'string' } },
  //   required: ['text'],
  //   additionalProperties: false,
  // };
  //
  // if (!validate(req.body, requestBodySchema).valid) {
  //   next(new Error('INVALID_API_FORMAT'));
  // }

  const task = newTask(req.body.text);

  console.log(task);

  db.get("tasks")
    .push(task)
    .write();

  res.json({ status: "OK", data: task });
});

// PATCH /tasks/:id
router.patch("/:id", (req, res, next) => {
  // const requestBodySchema = {
  //   id: 'path-task',
  //   type: 'object',
  //   properties: {
  //     text: { type: 'string' },
  //     isCompleted: { type: 'boolean' },
  //   },
  //   additionalProperties: false,
  //   minProperties: 1,
  // };
  //
  // if (!validate(req.body, requestBodySchema).valid) {
  //   next(new Error('INVALID_API_FORMAT'));
  // }

  const task = db
    .get("tasks")
    .find({ id: req.params.id })
    .assign(req.body)
    .value();

  db.write();

  res.json({ status: "OK", data: task });
});

// DELETE /tasks/:id
router.delete("/:id", (req, res) => {
  db.get("tasks")
    .remove({ id: req.params.id })
    .write();

  res.json({ status: "OK" });
});

module.exports = router;

/* "tasks": [
    {
      "id": "e69fcfb925bbf",
      "text": "test",
      "isCompleted": false
    },
    {
      "id": "aef2c11f08ac",
      "text": "3333333",
      "isCompleted": false,
      "test": "2222222"
    },
    {
      "id": "7c0b9675a049b",
      "text": "test",
      "isCompleted": false
    },
    {
      "id": "4403f9e760997",
      "text": "test",
      "isCompleted": false
    },
    {
      "id": "0ea7e3b0ddd65",
      "text": "test",
      "isCompleted": false
    },
    {
      "id": "3d1d3310c5ea2",
      "text": "test",
      "isCompleted": false
    },
    {
      "id": "c0aaec4a82c2d",
      "text": "Тестовая задача",
      "isCompleted": true
    },
    {
      "id": "988862d9ee162",
      "text": "Я ХОЧУ СПАТЬ!",
      "isCompleted": false
    }
  ] */
