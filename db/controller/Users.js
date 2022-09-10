const db = require('../index');

module.exports = {
  insert: (user, cb) => {
    let query = `INSERT INTO users (name, password, cash) VALUES (?, ?, ?)`
    let params = [user.username, user.password, user.cash];
    db.query(query, params, function(err) {
      if (err) throw err;
      cb();
    })
  },

  findUser: (user, cb) => {
    let query = `SELECT * from users where name= ?`
    db.query(query, [user.username], function(err, results) {
      if (err) throw err;
      cb(results);
    })
  },

  update: (data, cb) => {
    let query = `UPDATE users SET cash=? WHERE id=?`;
    let params = [data.cash, data.user_id];
    db.query(query, params, function(err) {
      if(err) throw err;
      cb();
    })
  }

}