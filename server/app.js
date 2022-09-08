const express = require('express');
const path = require('path');
let app = express();
const bp = require('body-parser')
const findStock = require('./helper.js');
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.post('/search', (req, res) => {
  console.log('search post', req.body);
  // return findStock(req.body)
  //   .then((data) => {
  //     res.status(200).json(data);
  //   })
})


const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
})