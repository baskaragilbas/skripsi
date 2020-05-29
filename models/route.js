'use strict';
module.exports = (sequelize, DataTypes) => {
  const Route = sequelize.define('Route', {
    routeName: DataTypes.STRING
  }, {});
  Route.associate = function(models) {
    // associations can be defined here
    Route.belongsToMany(models.BusStop, {through: 'RouteBusStop', foreignKey: 'routeID', as: 'BusStop'});
    Route.hasMany(models.RTT);
    Route.hasMany(models.Frequency);
  };
  return Route;
};