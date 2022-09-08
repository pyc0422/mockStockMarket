const db = require('../index');
db.connect();
module.exports = {
  find: ({key: value}, cb) => {
    let query = `SELECT * from stocks where ${key}=${value}`
    db.query(query, function(err, results) {
      if (err) throw err;
      cb(results);
    })
}