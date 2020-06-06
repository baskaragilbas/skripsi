'use strict';
module.exports = (sequelize, DataTypes) => {
  const RouteBusStop = sequelize.define('RouteBusStop', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    routeID: DataTypes.INTEGER,
    busStopID: DataTypes.INTEGER
  }, {});
  RouteBusStop.associate = function(models) {
    // associations can be defined here
    RouteBusStop.belongsTo(models.Route, {foreignKey: 'routeID'});
    RouteBusStop.belongsTo(models.BusStop, {foreignKey: 'busStopID'});
    RouteBusStop.hasMany(models.LoadFactor);
    RouteBusStop.hasMany(models.Headway);
  };
  return RouteBusStop;
};