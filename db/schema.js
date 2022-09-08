const Promise = require('bluebird');

module.exports = (db) => {
  if (db.queryAsync) {
    db = Promise.promisifyAll(db);
  }
  return db.queryAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(40) UNIQUE,
      password VARCHAR(64),
      salt VARCHAR(64),
      cash NUMBER NOT NULL DEFAULT 100
    )`)
    .then(() => {
      return db.queryAsync(`
        CREATE TABLE IF NOT EXISTS stocks(
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          symbol TEXT,
          name TEXT,
          shares INT,
          price FLOAT,
          total FLOAT,
          user_id INT FOREIGN KEY REFERENCES user(id)
        )`)
    })
    .then(() => {
      return db.queryAsync(`
        CREATE TABLE IF NOT EXISTS history(
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          stock_id INT FOREIGN KEY REFERENCES stocks(id),
          price FLOAT,
          share INT,
          total FLOAT,
          createAt TIMESTAMP
        )`)
    })
    .error(err => { console.log(err); });
}