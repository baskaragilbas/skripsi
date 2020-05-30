'use strict';
module.exports = (sequelize, DataTypes) => {
  const LoadFactor = sequelize.define('LoadFactor', {
    routeBusTopID: DataTypes.INTEGER,
    reportID: DataTypes.INTEGER,
    value: DataTypes.INTEGER
  }, {});
  LoadFactor.associate = function(models) {
    // associations can be defined here
    LoadFactor.belongsTo(models.RouteBusStop, {foreignKey: 'routeBusStopID', as:'routeBusStop'});
  };
  return LoadFactor;
};