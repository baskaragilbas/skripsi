'use strict';
module.exports = (sequelize, DataTypes) => {
  const Frequency = sequelize.define('Frequency', {
    routeId: DataTypes.INTEGER,
    reportID: DataTypes.INTEGER,
    time: DataTypes.INTEGER,
    value: DataTypes.INTEGER
  }, {});
  Frequency.associate = function(models) {
    // associations can be defined here
    Frequency.belongsTo(models.Route, {foreignKey: 'routeID', as:'route'});
  };
  return Frequency;
};