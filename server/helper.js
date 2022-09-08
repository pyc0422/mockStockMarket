const token='1458c2b54a1bd58c23ffa3914a319d0a';
var findStock = (symbol) => {
  fetch(`https://fmpcloud.io/api/v3/quote/${symbol}?apikey=${token}`)
    .then((res) => res.json())
    .then((data) => console.log(data));
}

module.exports = findStock;