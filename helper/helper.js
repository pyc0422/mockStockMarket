const axios = require('axios');

const token='1458c2b54a1bd58c23ffa3914a319d0a';
let findStock = (symbol) => {
  // axios.defaults.headers.common = {
  //   "API key":
  // }
  return axios.get(`https://fmpcloud.io/api/v3/quote/${symbol}?apikey=${token}`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = findStock;