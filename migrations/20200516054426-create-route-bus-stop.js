'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RouteBusStops', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      routeID: {
        type: Sequelize.INTEGER,
        reference: {model: 'Routes', key:'id'}
      },
      busStopID: {
        type: Sequelize.INTEGER,
        reference: {model: 'BusStops', key:'id'}
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
    return queryInterface.dropTable('RouteBusStops');
  }
};