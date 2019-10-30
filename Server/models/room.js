"use strict";
module.exports = (sequelize, DataTypes) => {
  const room = sequelize.define(
    "room",
    {
      name: DataTypes.STRING
    },
    {}
  );
  room.associate = function(models) {
    room.belongsToMany(models.customer, {
      through: models.order,
      as: "customers",
      foreignKey: "customer_id"
    });
  };
  return room;
};
