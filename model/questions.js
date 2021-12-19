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
//questions constructor
class Questions {
  constructor(dbPath = jsonDbPath, defaultItems = defaultQuestions) {
    this.jsonDbPath = dbPath;
    this.defaultQuestions = defaultItems;
  }
  //trouver le prochain id libre pour la nouvelle question 
  getNextId() {
    const questions = parse(this.jsonDbPath, this.defaultQuestions);
    let nextId;
    if (questions.length === 0) nextId = 1;
    else nextId = questions[questions.length - 1].id + 1;

    return nextId;
  }

  /**
   * Returns all questions
   */
  getAll() {
    const questions = parse(this.jsonDbPath, this.defaultQuestions);
    return questions;
  }

  /**
   * Returns the question identified by id with the 4 answers
   * @param {number} id - id of the questions to find
   * @returns {object} the question  found
   */
  getOne(id) {
    const questions = parse(this.jsonDbPath, this.defaultQuestions);
    const foundIndex = questions.findIndex((question) => question.id == id);
    if (foundIndex < 0) return;

    return questions[foundIndex];
  }
  //Returns only the question
  getQuestion(id){
    const questions= parse(this.jsonDbPath, this.defaultQuestions);
    const foundIndex= questions.findIndex((question)=> question.id==id);
    if(foundIndex<0)return;

    return questions[foundIndex].question;
  }
  //get the correct answer 
  getAnswer(id){
    const questions= parse(this.jsonDbPath, this.defaultQuestions);
    const foundIndex= questions.findIndex((question)=> question.id==id);
    if(foundIndex<0)return;

    return questions[foundIndex].correct_answer;
  }
  //get the 3 others incorrect answers
  getIncorrect(id){
    const questions= parse(this.jsonDbPath, this.defaultQuestions);
    const foundIndex= questions.findIndex((question)=> question.id==id);
    if(foundIndex<0)return;

    return questions[foundIndex].incorrect_answers;
  }

  

}

module.exports = { Questions };
