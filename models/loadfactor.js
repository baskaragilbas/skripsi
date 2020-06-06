'use strict';
module.exports = (sequelize, DataTypes) => {
  const LoadFactor = sequelize.define('LoadFactor', {
    routeBusStopID: DataTypes.INTEGER,
    reportID: DataTypes.INTEGER,
    value: DataTypes.INTEGER
  }, {});
  LoadFactor.associate = function(models) {
    // associations can be defined here
    LoadFactor.belongsTo(models.RouteBusStop, {foreignKey: 'routeBusStopID', as:'RouteBusStop'});
    LoadFactor.belongsTo(models.Report, {foreignKey: 'reportID', as:'Report'});
  };
  return LoadFactor;
};