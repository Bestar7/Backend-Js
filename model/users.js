"use strict";
const { parse, serialize } = require("../utils/json");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const LIFETIME_JWT = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h
const jwtSecret = "ilovemypizza!";
const jsonDbPath = __dirname + "/../data/users.json";
const saltRounds = 10;
// Default users list
const defaultUsers = [
  {id:1,
    email:"quentin.garwig@hotmail.com",
    password:"$2y$10$LApdSBHDMTC1j/KVBe0umeq8zwljgjvrXu3dciA0IG9B.xr4OcN1m",
    pseudo:null,
<<<<<<< HEAD
    score:0
=======
    score:100
>>>>>>> 4eaae50fd4efc04352a771f5a84af082de1e1eea

  },
  
  
];

class Users {
  constructor(dbPath = jsonDbPath, defaultItems = defaultUsers) {
    this.jsonDbPath = dbPath;
    this.defaultUsers = defaultItems;
  }

  getNextId() {
    const users = parse(this.jsonDbPath, this.defaultUsers);
    let nextId;
    if (users.length === 0) nextId = 1;
    else nextId = users[users.length - 1].id + 1;

    return nextId;
  }

  /**
   * Returns all users
   * @returns {Array} Array of users
   */
  getAll() {
    const users = parse(this.jsonDbPath, this.defaultUsers);
    return users;
  }

  /**
   * Returns the user identified by id
   * @param {number} id - id of the user to find
   * @returns {object} the user found
   */
  getOne(id) {
    const users = parse(this.jsonDbPath, this.defaultUsers);
    const foundIndex = users.findIndex((user) => user.id == id);
    if (foundIndex < 0) return;

    return users[foundIndex];
  }
  //get user by its email
  getOneByEmail(email) {
    const users = parse(this.jsonDbPath, this.defaultUsers);
    const foundIndex = users.findIndex((user) => user.email == email);
    if (foundIndex < 0) return;

    return users[foundIndex];
  }
  //create a new user 
  async register(email,password){
    let user= await this.getOneByEmail(email);
    if(user){ //todo better
      console.log("cet email existe déjà");
    }
    const users= parse(this.jsonDbPath,this.defaultUsers);

    const newUser={
      
      email: email,
      password : password,
      
    };
    users.push(newUser);
    serialize(this.jsonDbPath,users);
    return newUser;

  }
  //login sbdy
  async login(email, password) {
    const userFound = this.getOneByEmail(email);
    if (!userFound) return;
    // checked hash of passwords
    const match = await bcrypt.compare(password, userFound.password);
    if (!match) return;

    const authenticatedUser = {
      email: email,
      token: "Future signed token",
    };

    // replace expected token with JWT : create a JWT
    const token = jwt.sign(
      { email: authenticatedUser.email }, // session data in the payload
      jwtSecret, // secret used for the signature
      { expiresIn: LIFETIME_JWT } // lifetime of the JWT
    );

    authenticatedUser.token = token;
    return authenticatedUser;
  }

  getNextId() {
    const users = parse(this.jsonDbPath, this.defaultUsers);
    let nextId;
    if (users.length === 0) nextId = 1;
    else nextId = users[users.length - 1].id + 1;

    return nextId;
  }
  //add points to a player by its id 
  addPoints(id,score){
    const users = parse(this.jsonDbPath, this.defaultUsers);
    const foundIndex = users.findIndex((user) => user.id == id);
    if (foundIndex < 0) return;
    users[foundIndex].score+=score;
    return users[foundIndex].score;
  }
  //get score from a player by its id 
  getScore(id){
    const users = parse(this.jsonDbPath, this.defaultUsers);
    const foundIndex = users.findIndex((user) => user.id == id);
    if (foundIndex < 0) return;

    return users[foundIndex].score;
  }

  

 
}

module.exports = { Users };