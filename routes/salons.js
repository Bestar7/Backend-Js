var express = require("express");
const { Salons } = require("../model/salons");

var router = express.Router();
const salonModel = new Salons();

// GET /salons : read all the salons 
router.get("/", function (req, res) {
  console.log("GET /salons");
  return res.json(salonModel.getAll());
});

// GET /salons/{id} : Get a salon from its id
router.get("/:id", function (req, res) {
  console.log(`GET /salons/${req.params.id}`);

  const salon = salonModel.getOne(req.params.id);
  // Send an error code '404 Not Found' if the salon was not found
  if (!salon) return res.status(404).end();

  return res.json(salon);
});

//create a salon
router.post("/", function (req, res) {
  console.log("POST /salons");

  // Send an error code '400 Bad request' if the body parameters are not valid
  if (
    !req.body ||
    (req.body.hasOwnProperty("player") && req.body.player.length === 0) 
  )
    return res.status(400).end();


  const salon = salonModel.creerSalon(req.body);

  return res.json(salon);
});

//add a player to a salon by idSalon
router.put("/addPlayer/:id/:idSalon", function(req,res){

  if(req.body) return res.status(400).end();

    const salon = salonModel.addPlayer(req.params.id, req.params.idSalon);
    // Send an error code 'Not Found' if the pizza was not found :
    if (!salon) return res.status(404).end();
    return res.json(salon);
});
//get all the players in a salon
router.get("/getPlayers/:id", async function(req,res){
  console.log(`GET /salons/getPlayers/${req.params.id}`);

  const salon = salonModel.getPlayers(req.params.id);
  // Send an error code '404 Not Found' if the salon was not found
  if (!salon) return res.status(404).end();

  return res.json(salon);


});





module.exports = router;
