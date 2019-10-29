const models = require("../models");
const Room = models.room;
const Customer = models.customer;
const Order = models.order;

exports.addRoom = (req, res) => {
  const roomName = req.body.name;
  Room.findOne({
    where: { name: roomName }
  }).then(data => {
    if (data) {
      res.status(401).json({ message: "Room is already exists" });
    } else {
      Room.create({
        name: roomName
      })
        .then(item => {
          Room.findAll({}).then(data => {
            res.status(200).send(data);
          });
        })
        .catch(error => {
          res.status(400).json({ message: "error when create data" });
        });
    }
  });
};

exports.addCustomer = (req, res) => {
  const { name, identity_number, phone_number, image } = req.body;

  Customer.findOne({
    where: { identity_number }
  }).then(data => {
    if (data) {
      res.status(401).json({ message: "Customer is already exist" });
    } else {
      Customer.create({
        name: name,
        identity_number: identity_number,
        phone: phone_number,
        image: image
      }).then(item => {
        res.status(200).json({ message: "Customer created!" });
      });
    }
  });
};
