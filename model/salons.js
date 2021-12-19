"use strict";
const { parse, serialize } = require("../utils/json");

const jsonDbPath = __dirname + "/../data/salons.json";

const { Questions } = require("../model/questions");
const questionModel = new Questions();
const {Users} =require("../model/users");

const usersModel = new Users();

// Default salons
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
   * Returns all salons
   * @returns {Array} Array of salons
   */
  getAll() {
    const salons = parse(this.jsonDbPath, this.defaultSalons);
    return salons;
  }

  /**
   * Returns the salon identified by id
   * @param {number} id - id of the salon to find
   * @returns {object} the salon found 
   */
  getOne(id) {
    const salons = parse(this.jsonDbPath, this.defaultSalons);
    const foundIndex = salons.findIndex((salon) => salon.id == id);
    if (foundIndex < 0) return;

    return salons[foundIndex];
  }
  //delete a salon from the array 
  deleteOne(id) {
    const salons = parse(this.jsonDbPath, this.defaultSalons);
    const foundIndex = salons.findIndex((salon) => salon.id == id);
    if (foundIndex < 0) return;
    const salonDeleted = salon.splice(foundIndex, 1);
    serialize(this.jsonDbPath, salons);

    return salonDeleted[0];
  }
  //create a new salon 
  creerSalon(body){
    const salons = parse(this.jsonDbPath, this.defaultSalons);
    
    const newSalon = {
      id: this.getNextId(),
      host:body.player,
      classement:[],
      ready:false,
      players:[], 

    };
    //push le nouveau salon a la liste des salons existants 
    salons.push(newSalon);
    serialize(this.jsonDbPath,salons);
    return newSalon;
  }
  //ajouter des questions au salon(TODO)
  async addQuestions(){
    for(let i =0; i < 10; i++){
      
       
      }
  }
  //ajouter un joueur au salon == rejoindre un salon 
  addPlayer(id,idSalon){
    let salon= this.getOne(idSalon);
    let tabSalon= salon.players;

    let idDuSalon=salon.id;
    let hostSalon=salon.host;
    let classementSalon=salon.classement;
    let readySalon=salon.ready;

    tabSalon.push(id);

    players=tabSalon;
    this.deleteOne(idSalon);
    return this.addRoomById(idDuSalon,hostSalon,classementSalon,readySalon,players);
  }
    
   //methode necessaire a la methode addPLayer 
  addRoomById(id, host, classement, ready, players) {
    const salons = parse(this.jsonDbPath, this.defaultSalons);
    const newSalon = {
      id: id,
      host:host,
      classement:classement,
      ready:ready,
      players:players,
    };
    salons.push(newSalon);
    serialize(this.jsonDbPath, salons);

    return newSalon;
  }

  getPlayers(id){
    const salons = parse(this.jsonDbPath, this.defaultSalons);
    const foundIndex = salons.findIndex((salon) => salon.id == id);
    if (foundIndex < 0) return;

    return salons[foundIndex].players;
  }

 

}

module.exports = { Salons };
