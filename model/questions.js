"use strict";
const { parse, serialize } = require("../utils/json");

const jsonDbPath = __dirname + "/../data/questions.json";

// Default questions list
const defaultQuestions = [
  {id:1,
    questions:"Which of these Bojack Horseman characters is a human?",
    correct_answer:"Todd Chavez",
    incorrect_answers:["Lennie Turtletaub","Princess Carolyn","Tom Jumbo-Grumbo"]
  },
  {id:2,
   question:"Which boxer was famous for striking the gong in the introduction to J. Arthur Rank films?",
   correct_answer:"Bombardier Billy Wells",
   incorrect_answers:["Freddie Mills","Terry Spinks","Don Cockell"]
  },
  {id:3,
    question:"Which of these is not a member of the virtual band Gorillaz?",
    correct_answer:"Phi Cypher",
    incorrect_answers:["Murdoc Niccals","Noodle","Russel Hobbs"]
  },
];

class Questions {
  constructor(dbPath = jsonDbPath, defaultItems = defaultQuestions) {
    this.jsonDbPath = dbPath;
    this.defaultQuestions = defaultItems;
  }

  getNextId() {
    const questions = parse(this.jsonDbPath, this.defaultQuestions);
    let nextId;
    if (questions.length === 0) nextId = 1;
    else nextId = questions[questions.length - 1].id + 1;

    return nextId;
  }

  /**
   * Returns all questions
   * @returns {Array} Array of pizzas
   */
  getAll() {
    const questions = parse(this.jsonDbPath, this.defaultQuestions);
    return questions;
  }

  /**
   * Returns the questions identified by id
   * @param {number} id - id of the pizza to find
   * @returns {object} the pizza found or undefined if the id does not lead to a pizza
   */
  getOne(id) {
    const questions = parse(this.jsonDbPath, this.defaultQuestions);
    const foundIndex = questions.findIndex((question) => question.id == id);
    if (foundIndex < 0) return;

    return questions[foundIndex];
  }

  

}

module.exports = { Questions };
