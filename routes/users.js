var express = require("express");
const { Users } = require("../model/users");

var router = express.Router();
const userModel = new Users();

// GET /users : read all the users
router.get("/", function (req, res) {
  console.log("GET /users");
  return res.json(userModel.getAll());
});

// GET /users/{id} : Get a user from its id 
router.get("/:id", function (req, res) {
  console.log(`GET /users/${req.params.id}`);

  const user = userModel.getOne(req.params.id);
  // Send an error code '404 Not Found' if the user was not found
  if (!user) return res.status(404).end();

  return res.json(user);
});

//get score by its id 

router.get("/score/:id", function (req, res) {
  console.log(`GET /users/score/${req.params.id}`);

  const user = userModel.getScore(req.params.id);
  // Send an error code '404 Not Found' if the user was not found
  if (!user) return res.status(404).end();


  return res.json(user);
});
/*register a user : POST /users/register */
router.post("/register", async function (req, res, next) {
  // Send an error code '400 Bad request' if the body parameters are not valid
  if (
    !req.body ||
    (req.body.hasOwnProperty("email") && req.body.email.length === 0) ||
    (req.body.hasOwnProperty("password") && req.body.password.length === 0)
  )
    return res.status(400).end();

  const authenticatedUser = await userModel.register(
    
    req.body.email,
    req.body.password
   
  );
  // Error code '409 Conflict' if the username already exists
  if (!authenticatedUser) return res.status(409).end();

  return res.json(authenticatedUser);
});
//add points to a user 
router.post("/addPoints/:id/:score", async  function (req,res,next){
  console.log(`PUT /users/addPoints/${req.params.id}/${req.params.score}`);
  const user= await userModel.addPoints(
    req.params.id,
    req.params.score
  );
  return res.json(user);

});






/* login a user : POST /users/login */
router.post("/login", async function (req, res, next) {
  // Send an error code '400 Bad request' if the body parameters are not valid
  if (
    !req.body ||
    (req.body.hasOwnProperty("email") && req.body.email.length === 0) ||
    (req.body.hasOwnProperty("password") && req.body.password.length === 0)
  )
    return res.status(400).end();

  const authenticatedUser = await userModel.login(
    req.body.email,
    req.body.password
  );
  // Error code '401 Unauthorized' if the user could not be authenticated
  if (!authenticatedUser) return res.status(401).end();

  return res.json(authenticatedUser);
});


module.exports = router;
