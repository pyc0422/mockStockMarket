const db = require('../index');

module.exports = {
  findOne: (symbol, cb) => {
    let query = `SELECT * from stocks where symbol=?`;
    return db.query(query, [symbol], function(err, results) {
      if (err) throw err;
      cb(results);
    })
  },

  insert: (stockData, cb) => {
    console.log('stockData: ', stockData);
    let query = `SELECT * from stocks where symbol=?`;
    db.query(query, [stockData.symbol], function(err, results) {
      if (err) throw err;
      console.log('controller stocks: ', results);
      if (!results.length) {
        let query = `INSERT INTO stocks (symbol, name, shares, price, total, user_id) VALUES (?, ?, ?, ?, ?, ?)`;
        let params = [stockData.symbol, stockData.name, stockData.shares, stockData.price, stockData.total, stockData.user_id];
        db.query(query, params, function(err) {
          if (err) throw err;
          cb(null);
        });
      } else {
        results = results[0];
        var newShares = results.shares + stockData.shares;
        if (newShares < 0) {
          cb({message:'not enough shares'});
          return;
        }
        var newTotal = results.total + stockData.total;
        let newPrice = newTotal / newShares;
        let query = `UPDATE stocks SET price=?, shares=?, total=? WHERE symbol=?`;
        let params = [newPrice, newShares, newTotal, stockData.symbol];
        db.query(query, params, function(err) {
          if (err) throw err;
          cb(null);
        });
      }
    });

  },




  findByUser: (user, cb) => {
    let query = `SELECT * FROM stocks WHERE user_id=?`
    return db.querty(query, [user.id], function(err, results) {
      if (err) throw err;
      cb(results)
    });
  }
};