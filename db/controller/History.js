const db = require('../index');
module.exports = {
  insert: (stockData, cb) => {
    let query = `INSERT INTO history (symbol, name, share, price, total, user_id) VALUES (?, ?, ?, ?, ?, ?)`;
    let params = [stockData.symbol, stockData.name, stockData.shares, stockData.price, stockData.total, stockData.user_id];
    return db.query(query, params, function(err) {
      if (err) throw err;
      cb();
    })
  },

  findAll: (user, cb) => {
    let query = `SELECT * from history where user_id=?`
    return db.query(query, [user.id], function(err, results) {
      if (err) throw err;
      cb(results);
    })
  }
}