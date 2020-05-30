'use strict';
module.exports = (sequelize, DataTypes) => {
  const Headway = sequelize.define('Headway', {
    routeBusTopID: DataTypes.INTEGER,
    reportID: DataTypes.INTEGER,
    value: DataTypes.STRING
  }, {});
  Headway.associate = function(models) {
    // associations can be defined here
    Headway.belongsTo(models.RouteBusStop, {foreignKey: 'routeBusStopID', as:'routeBusStop'});
  };
  return Headway;
};