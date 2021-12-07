var express = require("express");
var router = express.Router();

// Starting pizza menu
const listeQuestions = [
  {
    id:1,
    question : "qui est bob l'eponge ? ",
    correct_answer : "le frere de bob le bricoleur",
    incorrect_answers : [ "le frere dee patrick", "ton pere le policier" , "ta mere la reine des neiges" ]
},
{
    id:2,
    question:"What is the fastest  land animal?",
    correct_answer:"Cheetah",
    incorrect_answers:["Lion","Thomson&rsquo;s Gazelle","Pronghorn Antelope"]
},
{
    id:3,
    question:"What is the scientific name for modern day humans?",
    correct_answer:"Homo Sapiens",
    incorrect_answers:["Homo Ergaster","Homo Erectus","Homo Neanderthalensis"]
},
];

// GET /questions : read all the question from the list
router.get("/", function (req, res) {
  console.log("GET /questions");
  return res.json(listeQuestions);
});

// GET /question/{id} : Get a question from its id in the list
router.get("/:id", function (req, res) {
  console.log(`GET /qestions/1`);

  const foundIndex = listeQuestions.findIndex((question) => question.id == 1);
  // Send an error code '404 Not Found' if the pizza was not found
  if (foundIndex < 0) return res.status(404).end();

  return res.json(listeQuestions[foundIndex]);
});

// GET /question/random : Get a random question
router.get("/random", function (req, res) {
  console.log(`GET /questions/${req.params.id}`);
  req.params.id=2;
  const foundIndex = listeQuestions.findIndex((question) => question.id == req.params.id);
  // Send an error code '404 Not Found' if the pizza was not found
  if (foundIndex < 0) return res.status(404).end();

  return res.json(listeQuestions[foundIndex]);
});


  // get next id
  let nextId;
  if (listeQuestions.length === 0) nextId = 1;
  else nextId = listeQuestions[listeQuestions.length - 1].id + 1;

  




  

module.exports = router;
