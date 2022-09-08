const mysql = require('mysql2');
const Promise = require('bluebird');
const database = 'stocks';

module.exports = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'stocks'
})
// const db = Promise.promisifyAll(connection, {multiArgs: true});
// db.connectAsync()
//   .then(() => console.log(`Connected to ${database} database as ID ${db.threadId}`))
//   .then(() => db.queryAsync('CREATE DATABASE IF NOT EXISTS stocks'))
//   .then(() => db.queryAsync('USE stocks'))
//   .then(() => createTables(db));

//module.exports = connection;


// const { Sequelize, Model, DataTypes } = require('sequelize');

// const sequelize = new Sequelize('stocks', 'root', {host: 'localhost'});

// const User = sequelize.define('User', {
//   username: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//     unique: true
//   },
//   password: DataTypes.TEXT,
//   cash: NUMBER
// }, {
//   timestamps: false
// });

// const History = sequelize.define('History', {
//   stock_id: NUMBER,
//   price: NUMBER,
//   share: DataTypes.INTEGER,
//   total: NUMBER
//   createAt:
// });

// const Stocks = sequelize.define('Stocks', {
//   symbol: DataTypes.TEXT,
//   name: DataTypes.TEXT,
//   shares: DataTypes.INTEGER,
//   total: NUMBER,
//   user_id: NUMBER
// }, {
//   timestamps: false
// });

// exports.User = User;
// exports.History = History;
// exports.Stocks = Stocks;