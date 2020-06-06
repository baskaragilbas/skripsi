'use strict';
module.exports = (sequelize, DataTypes) => {
  const Headway = sequelize.define('Headway', {
    routeBusStopID: DataTypes.INTEGER,
    reportID: DataTypes.INTEGER,
    value: DataTypes.STRING
  }, {});
  Headway.associate = function(models) {
    // associations can be defined here
    Headway.belongsTo(models.RouteBusStop, {foreignKey: 'routeBusStopID', as:'RouteBusStop'});
    Headway.belongsTo(models.Report, {foreignKey: 'reportID', as:'Report'});
  };
  return Headway;
};