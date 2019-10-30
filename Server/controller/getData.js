const models = require("../models");
const Room = models.room;
const Customer = models.customer;
const Order = models.order;
const User = models.user;

exports.getRooms = (req, res) => {
  Room.findAll({})
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(400).json({ message: "Bad Request" });
    });
};

exports.getCustomers = (req, res) => {
  Customer.findAll({})
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(400).json({ message: "Bad Request" });
    });
};

exports.getCheckins = (req, res) => {
  Room.findAll({
    include: [
      {
        model: Customer,
        as: "customers",
        attributes: { exclude: ["createdAt", "updatedAt"] },
        through: {
          model: Order,
          as: "orders",
          where: { is_done: false },
          attributes: { exclude: ["createdAt", "updatedAt"] }
        }
      }
    ],
    attributes: { exclude: ["createdAt", "updatedAt"] }
  }).then(data => {
    res.send(data);
    // res.send(data);
  });
};

exports.getUser = (req, res) => {
  const id_user = req.params.id;
  User.findOne({
    where: { id: id_user },
    attributes: { exclude: ["password", "createdAt", "updatedAt"] }
  })
    .then(item => {
      res.send(item);
    })
    .catch(error => {
      res.send(error);
    });
};
