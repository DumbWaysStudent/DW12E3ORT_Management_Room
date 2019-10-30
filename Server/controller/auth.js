const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const models = require("../models");
const User = models.user;

exports.login = (req, res) => {
  //check if email and pass match in db tbl user
  const email = req.body.email;
  const password = req.body.password; //use encryption in real world case!

  User.findOne({ where: { email } }).then(user => {
    if (user) {
      if (user.password == password) {
        const token = jwt.sign({ userId: user.id }, "my-secret-key");
        res.status(200).json({
          id: user.id,
          token
        });
      } else {
        res.status(400).json({ message: "Password wrong" });
      }
    } else {
      res.status(400).json({ message: "Unregistered emai" });
    }
  });
};
