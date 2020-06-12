'use strict';
module.exports = (sequelize, DataTypes) => {
  const Criteria = sequelize.define('Criteria', {
    criteriaName: DataTypes.STRING,
    criteriaType: DataTypes.INTEGER,
    weight: DataTypes.REAL
  }, {});
  Criteria.associate = function(models) {
    // associations can be defined here
  };
  return Criteria;
};