export function searchStock (symbol, cb) {
  return fetch('http://localhost:3000/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({symbol})
    })
      .then(res => {
        if (res.status === 404) {
          let message = 'The symbol is wrong!';
          throw message;
        } else {
          return res.json();
        }
      })
      .then(json => {
        cb(json);
      })
      .catch(message => alert(message));
};

export function login(user) {
  return fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then((res) => {
        if (res.status === 404) {
          let message = 'Can not find such user!'
          return message;
        } else if (res.status === 401) {
          let message = 'Wrong password!';
          return message;
        } else {
          return res.json();
        }
      });
};

export function handleTrade(content) {
  console.log('inside trade: ', content);
  return fetch('http://localhost:3000/trade', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(content)
  })
    .then(res => {
      if (res.status === 403) {
        return 'Not enough money!';
      } else if (res.status === 400) {
        return 'Not enough shares!';
      } else {
        return res.json();
      }
    })
}

export function userStocks(id) {
  return fetch('/mystocks', {
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id})
  })
    .then(res => res.json())
};

export function allHistory(id) {
  return fetch('http://localhost:3000/history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id})
    })
      .then(res => res.json())
}