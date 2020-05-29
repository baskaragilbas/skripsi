'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = 'index.js';
const env = process.env.NODE_ENV || 'development';
const directory = path.resolve('models')
const config = require('@/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config, {define:{raw:true}} );
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(directory)
  .filter(file => {
    return (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    
    const model = sequelize['import'](path.join(directory, file));
    db[model.name] = model;
  });
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
