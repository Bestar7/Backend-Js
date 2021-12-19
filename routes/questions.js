var express = require("express");
const { Questions } = require("../model/questions");

var router = express.Router();
const questionModel = new Questions();

// GET /questions : read all the questions 
router.get("/", function (req, res) {
  console.log("GET /questions");
  return res.json(questionModel.getAll());
});

// GET /questions/{id} : Get a questuib from its id 
router.get("/:id", function (req, res) {
  console.log(`GET /questions/${req.params.id}`);

  const question = questionModel.getOne(req.params.id);
  // Send an error code '404 Not Found' if the question was not found
  if (!question) return res.status(404).end();

  return res.json(question);
});

//get question by its id
router.get("/question/:id", function(req,res){
  const result =   questionModel.getQuestion(req.params.id)
  if(!result) res.sendStatus(404).end();
  res.send(result);
});

//get correct answer by question's id 
router.get("/answer/:id", function(req,res){
  console.log(`GET /questions/answer/${req.params.id}`);

  const question = questionModel.getAnswer(req.params.id);
  // Send an error code '404 Not Found' if the question was not found
  if (!question) return res.status(404).end();

  return res.json(question);
});
//get the incorrect answers by a question's id 
router.get("/incorrect/:id", function(req,res){
  console.log(`GET /questions/incorrect/${req.params.id}`);

  const question = questionModel.getIncorrect(req.params.id);
  // Send an error code '404 Not Found' if the question was not found
  if (!question) return res.status(404).end();

  return res.json(question);
});
module.exports = router;
