//instantiate express module
const express = require("express");
const bodyParser = require("body-parser");
require("express-group-routes");
//use express in app variable
const app = express();
//define the server port
const port = 5000;
const getMethod = require("./controller/getData");
const postMethod = require("./controller/postData");
const putMethod = require("./controller/putData");

//controller
const AuthController = require("./controller/auth");

app.use(bodyParser.json());

const { authenticated, authorized } = require("./middleware");

app.group("/api/v2", router => {
  //POST
  router.post("/login", AuthController.login);
  router.post("/room", authenticated, postMethod.addRoom);
  router.post("/customer", authenticated, postMethod.addCustomer);
  router.post("/checkin", authenticated, postMethod.addOrder);

  //GET
  router.get("/rooms", authenticated, getMethod.getRooms);
  router.get("/customers", authenticated, getMethod.getCustomers);
  router.get("/checkins", authenticated, getMethod.getCheckins);
  router.get("/user/:id", authenticated, getMethod.getUser);

  //PUT
  router.put("/room/:id", authenticated, putMethod.editRoom);
  router.put("/customer/:id", authenticated, putMethod.editCustomer);
});

//when this nodejs app executed, it will listen to defined port
app.listen(port, () => console.log(`Listening on port ${port}!`));
