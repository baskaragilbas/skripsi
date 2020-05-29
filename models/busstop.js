'use strict';
module.exports = (sequelize, DataTypes) => {
  const BusStop = sequelize.define('BusStop', {
    busStopName: DataTypes.STRING
  }, {});
  BusStop.associate = function(models) {
    // associations can be defined here
    BusStop.belongsToMany(models.Route, {through: 'RouteBusStop', foreignKey: 'busStopID', as: 'Route'});
  };
  return BusStop;
};