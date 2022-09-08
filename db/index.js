const mysql = require('mysql2');
const Promise = require('bluebird');
const database = 'stocks';
const createTables = require('schema.js')
// const { Sequelize, Model, DataTypes } = require('sequelize');

// const sequelize = new Sequelize('stocks', 'root', {host: 'localhost'});

// const User = sequelize.define('User', {
//   username: DataTypes.TEXT,
//   password: DataTypes.TEXT,
//   cash: NUMBER
// });

// const History = sequelize.define('History', {
//   stock_id: NUMBER,
//   price: NUMBER,
//   shares: DataTypes.INTEGER,
//   total: NUMBER
// });

// const Stocks = sequelize.define('Stocks', {
//   symbol: DataTypes.TEXT,
//   name: DataTypes.TEXT,
//   shares: DataTypes.INTEGER,
//   total: NUMBER,
//   user_id: NUMBER
// });

const connection = mysql.createConnection({
  user: 'root',
  password: ''
})
const db = Promise.promisifyAll(connection, {multiArgs: true});
db.connectAsync()
  .then(() => console.log(`Connected to stocks database as ID ${db.threadId}`))
  .then(() => db.queryAsync('CREATE DATABASE IF NOT EXISTS stocks'))
  .then(() => db.queryAsync('USE stocks'))
  .then(() => createTables(db));

module.exports = db;