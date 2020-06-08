'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('LoadFactors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      routeBusStopID: {
        type: Sequelize.INTEGER,
        reference: {model: 'BusStops', key:'id'}
      },
      reportID: {
        type: Sequelize.INTEGER,
        reference: {model: 'Report', key:'id'}
      },
      value: {
        type: Sequelize.REAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('LoadFactors');
  }
};