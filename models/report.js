'use strict';
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    reportDate: DataTypes.DATEONLY
  }, {});
  Report.associate = function(models) {
    // associations can be defined here
    Report.hasMany(models.RTT);
    Report.hasMany(models.Frequency);
    Report.hasMany(models.Headway);
    Report.hasMany(models.LoadFactor);
    
  };
  return Report;
};