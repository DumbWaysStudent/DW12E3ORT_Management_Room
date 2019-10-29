const models = require("../models");
const Room = models.room;
const Customer = models.customer;
const Order = models.order;

exports.editRoom = (req, res) => {
  const id_room = req.params.id;

  Room.findAll({
    where: { id: id_room }
  }).then(data => {
    if (data.length > 0 && req.params.id == id_room) {
      Room.update(
        {
          name: req.body.name
        },
        {
          where: { id: id_room }
        }
      ).then(item => {
        res.status(200).json({ message: "Data has been updated" });
      });
    } else {
      res.status(400).json({ message: "Bad Request" });
    }
  });
};

exports.editCustomer = (req, res) => {
  const id_customer = req.params.id;
  const { name, identity_number, phone_number, image } = req.body;

  Customer.findAll({
    where: { id: id_customer }
  }).then(data => {
    if (data.length > 0 && req.params.id == id_customer) {
      Customer.update(
        {
          name,
          identity_number,
          phone: phone_number,
          image
        },
        {
          where: { id: id_customer }
        }
      ).then(item => {
        res.status(200).json({ message: "Data has been updated" });
      });
    } else {
      res.status(400).json({ message: "Bad Request" });
    }
  });
};
