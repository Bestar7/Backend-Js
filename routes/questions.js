var express = require("express");
const { Questions } = require("../model/questions");

var router = express.Router();
const questionModel = new Questions();

// GET /pizzas : read all the pizzas from the menu
router.get("/", function (req, res) {
  console.log("GET /questions");
  return res.json(questionModel.getAll());
});

// GET /pizzas/{id} : Get a pizza from its id in the menu
router.get("/:id", function (req, res) {
  console.log(`GET /questions/${req.params.id}`);

  const question = questionModel.getOne(req.params.id);
  // Send an error code '404 Not Found' if the pizza was not found
  if (!question) return res.status(404).end();

  return res.json(question);
});

module.exports = router;
