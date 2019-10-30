"use strict";
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define(
    "order",
    {
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      is_done: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      is_booked: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      order_end_time: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {}
  );
  order.associate = function(models) {
    order.belongsTo(models.customer, {
      as: "id_customer",
      foreignKey: "customer_id"
    }),
      order.belongsTo(models.room, {
        as: "id_room",
        foreignKey: "room_id"
      });
  };
  return order;
};
