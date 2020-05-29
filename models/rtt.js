'use strict';
module.exports = (sequelize, DataTypes) => {
  const RTT = sequelize.define('RTT', {
    routeId: DataTypes.INTEGER,
    value: DataTypes.STRING
  }, {});
  RTT.associate = function(models) {
    // associations can be defined here
    RTT.belongsTo(models.Route, {foreignKey: 'routeID', as:'route'});
  };
  return RTT;
};