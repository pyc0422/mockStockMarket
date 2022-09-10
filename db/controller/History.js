const db = require('../index');
module.exports = {
  insert: (stockData, cb) => {
    let query = `INSERT INTO history (symbol, name, shares, price, total, user_id) VALUES (?, ?, ?, ?, ?, ?)`;
    let params = [stockData.symbol, stockData.name, stockData.shares, stockData.price, stockData.total, stockData.user_id];
    return db.query(query, params, function(err) {
      if (err) throw err;
      cb();
    })
  },

  findAll: (id, cb) => {
    let query = `SELECT * FROM history where user_id=?`
    return db.query(query, [id.id], function(err, results) {
      if (err) throw err;
      console.log('inside controller history: ', results);
      cb(results);
    })
  }
}