const express = require('express');
const path = require('path');
const db = require('../db/index');
console.log('db', typeof db);
const bp = require('body-parser');
const findStock = require('./helper');

let app = express();
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.post('/search', (req, res) => {
  console.log('search post', req.body);
  const { symbol } = req.body;
  return findStock(symbol)
    .then((response) => {
      if (response.length === 0) {
        res.send("<script>alert('please enter a valid symbol!'); window.location.href = '/'; </script>")
      } else {
        //add to db

        let data = response[0];
        const queryString = `INSERT INTO stocks (symbol, name,price) VALUES (?, ?, ?)`
        const params = [data['symbol'], data['name'], data['price']]
        console.log(params);
        db.connect();
        db.query(queryString, params, function(err) {
          if (err) {
            console.log(err);
            return;
          }
          console.log('added!');
          res.status(200).send(JSON.stringify(data));
        })

      }

    })

})


const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
})