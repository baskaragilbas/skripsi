'use strict';
module.exports = (sequelize, DataTypes) => {
  const Frequency = sequelize.define('Frequency', {
    routeId: DataTypes.INTEGER,
    reportID: DataTypes.INTEGER,
    time: DataTypes.STRING,
    value: DataTypes.INTEGER
  }, {});
  Frequency.associate = function(models) {
    // associations can be defined here
    Frequency.belongsTo(models.Route, {foreignKey: 'routeID', as:'Route'});
    Frequency.belongsTo(models.Report, {foreignKey: 'reportID', as:'Report'});
  };
  return Frequency;
};