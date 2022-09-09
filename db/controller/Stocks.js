const db = require('../index');

module.exports = {
  findOne: (symbol, cb) => {
    let query = `SELECT * from stocks where symbol=?`
    return db.query(query, [symbol], function(err, results) {
      if (err) throw err;
      cb(results);
    })
  },

  insert: (stockData, cb) => {
    console.log('stockData: ', stockData);
    let query = `SELECT * from stocks where symbol=?`
    db.query(query, [stockData.symbol], function(err, results) {
      if (err) throw err;
      console.log('controller stocks: ', results);
      if (!results.length) {
        let query = `INSERT INTO stocks (symbol, name, shares, price, total, user_id) VALUES (?, ?, ?, ?, ?, ?)`;
        let params = [stockData.symbol, stockData.name, stockData.shares, stockData.price, stockData.total, stockData.user_id];
        return db.query(query, params, function(err) {
          if (err) throw err;
          cb();
        })
      } else {
        results = results[0]
        let newPrice = (results.price + stockData.price) / 2;
        let newShares = results.shares + stockData.shares;
        let newTotal = results.total + stockData.total;
        let query = `UPDATE stocks SET price=?, shares=?, total=? WHERE symbol=?`
        let params =  [newPrice, newShares, newTotal, stockData.symbol]
        return db.query(query, params, function(err) {
          if (err) throw err;
            cb();
        })
      }
    })

  },


  findByUser: (user, cb) => {
    let query = `SELECT * FROM stocks WHERE user_id=?`
    return db.querty(query, [user.id], function(err, results) {
      if (err) throw err;
      cb(results)
    });
  }
}