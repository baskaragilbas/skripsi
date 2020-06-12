'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Criteria', [
        { criteriaName: "Load Factor", criteriaType:1, weight:0.25, createdAt: new Date(), updatedAt: new Date() },
        { criteriaName: "Headway", criteriaType:1, weight:0.25, createdAt: new Date(), updatedAt: new Date() },
        { criteriaName: "Frequency", criteriaType:0, weight:0.25, createdAt: new Date(), updatedAt: new Date() },
        { criteriaName: "RTT", criteriaType:1, weight:0.25, createdAt: new Date(), updatedAt: new Date() }
      ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   const Op = Sequelize.Op
   return  queryInterface.bulkDelete('Criteria', {
     
         criteriaName:{
                [Op.in] : ["Load Factor", "Headway", "Frequency" , "RTT" ]
              }
      }, {}, { primaryKeys:[], primaryKeyAttributes:[] });

  }
};
