'use strict';
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    reportDate: DataTypes.DATE
  }, {});
  Report.associate = function(models) {
    // associations can be defined here
  };
  return Report;
};