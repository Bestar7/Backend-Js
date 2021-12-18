"use strict";
const { parse, serialize } = require("../utils/json");

const jsonDbPath = __dirname + "/../data/salons.json";

const { Questions } = require("../model/questions");
const questionModel = new Questions();
const {Users} =require("../model/users");

const usersModel = new Users();

// Default pizza menu
const defaultSalons = [
  {id:1,
    users:["quentin.garwig@gmail.be","Princess Carolyn","Tom Jumbo-Grumbo"]
  },
  
];

class Salons {
  constructor(dbPath = jsonDbPath, defaultItems = defaultSalons) {
    this.jsonDbPath = dbPath;
    this.defaultSalons = defaultItems;
  }

  getNextId() {
    const salons = parse(this.jsonDbPath, this.defaultSalons);
    let nextId;
    if (salons.length === 0) nextId = 1;
    else nextId = salons[salons.length - 1].id + 1;

    return nextId;
  }

  /**
   * Returns all pizzas
   * @returns {Array} Array of pizzas
   */
  getAll() {
    const salons = parse(this.jsonDbPath, this.defaultSalons);
    return salons;
  }

  /**
   * Returns the pizza identified by id
   * @param {number} id - id of the pizza to find
   * @returns {object} the pizza found or undefined if the id does not lead to a pizza
   */
  getOne(id) {
    const salons = parse(this.jsonDbPath, this.defaultSalons);
    const foundIndex = salons.findIndex((salon) => salon.id == id);
    if (foundIndex < 0) return;

    return salons[foundIndex];
  }

  creerSalon(body){
    const salons = parse(this.jsonDbPath, this.defaultSalons);
    const newSalon = {
      id: this.getNextId(),
      host:body.player,
      classement:[body.player],
      list:[],
      ready:false,
      players:[], 

    };

    salons.push(newSalon);
    serialize(this.jsonDbPath,salons);
    return newSalon;
  }
  
  async addQuestions(){
    for(let i =0; i < 10; i++){
      
       
      }
  }

  addPlayer(id,idSalon){
    const salons= parse(this.jsonDbPath, this.defaultSalons);
    const foundIndex= salons.findIndex((salon)=> salon.id==idSalon);
    const players= parse(this.jsonDbPath, this.users);
    const foundIndexPlayer = players.findIndex((user)=> user.id==id);

    if(foundIndexPlayer<0)return;

    if(foundIndex<0)return;

     salons[foundIndex].players[1]=id;
    return salons[foundIndex];

  }

  getPlayers(id){
    const salons = parse(this.jsonDbPath, this.defaultSalons);
    const foundIndex = salons.findIndex((salon) => salon.id == id);
    if (foundIndex < 0) return;

    return salons[foundIndex].players;
  }

 

}

module.exports = { Salons };
