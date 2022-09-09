const express = require('express');
const path = require('path');
const db = require('../db/index');
console.log('db', typeof db);
const bp = require('body-parser');
const findStock = require('./helper');
const {Users, Stocks, History} = require('../db/controller');
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
        let data = response[0];
        const stockData =[data['symbol'],data['name'],data['price']];
        res.status(200).send(JSON.stringify(stockData));
      }
    })
})

app.post('/signup', (req, res) => {
  let newUser = req.body;
  console.log('newUser: ', newUser);
  Users.findUser(newUser, (data) => {
    console.log('user find: ', data);
    if (data.length > 0) {
       return res.status(422).send('user already exists!');
      //res.redirct('/login')
    } else if (!data.length){
      Users.insert(newUser, () => {
        console.log('user added!');
        res.status(201).send('user added!');
      })
    }

  })
});

app.post('/login', (req, res) => {
  let userData = req.body;
  console.log('login user: ', userData);
  Users.findUser(userData, (data) => {
    console.log('password data: ', data);
    if (data.length === 0) {
      return res.status(404).send("not found!");
    }
    if (JSON.stringify(data[0].password) === JSON.stringify(userData.password)) {
      res.status(200).json(data[0]);
    } else {
      return res.status(401).send('wrong password');
    }
  })
})

app.post('/trade', (req, res) => {
  let tradeData = req.body;
  console.log('trade data: ', tradeData);
  return findStock(tradeData.symbol)
    .then((response) => {
      console.log('response trade: ', response);
      if (response.length === 0) {
        return res.status(404).send('have not own any share of this stock')
      } else {
        let data = response[0];
        tradeData.price = data['price'];
        tradeData.name = data['name'];
        tradeData.total = data['price'] * tradeData.shares;
        tradeData.cash = tradeData.cash - tradeData.total;
        Stocks.insert(tradeData, () => {
          console.log('add stocks!');
          History.insert(tradeData, (results) => {
            console.log('add history!');
            return res.status(201).json(results);
          });
        })
      }
    })
})

const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
})