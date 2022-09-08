const db = require('../index');

module.exports = {
  insert: () => {
    console.log('ih');
  },

  find: ({key: value}) => {
    let query = `SELECT * from stocks where ${key}=${value}`
    return db.query(query, function(err, results) {
      if (err) throw err;
      cb(results);
    })
  }
}