import React from 'react';
import ReactDOM from 'react-dom/client';
import Search from "./component/Search.jsx";
import Dashboard from "./component/Dashboard.jsx";
import Trade from "./component/Trade.jsx";
import History from "./component/History.jsx";
import Signup from "./component/Signup.jsx";
import Login from "./component/Login.jsx";

class App extends React.Component {

  constructor(props) {
    super (props);
    this.state = {
      clickBtn: '',
      login: false
    };
    this.btnClick = this.btnClick.bind(this);
    this.renderPage = null;
  }

  search(symbol, cb) {
    symbol = symbol.toUpperCase()
    console.log(`This ${symbol} has been searched!`);

    return fetch('http://localhost:3000/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({symbol})
    })
      .then(res => res.json())
      .then(json => {
        cb(json);
      })
  }

  btnClick(e) {
    console.log(e.target.value + ' just Clicked!');
    this.setState({
      clickBtn: e.target.value
    })
  }

  render() {
    switch (this.state.clickBtn) {
      case 'dashboard':
        this.renderPage = <Dashboard />
        break;
      case 'trade':
        this.renderPage = <Trade />
        break;
      case 'history':
        this.renderPage =<History />
        break;
      case 'singup':
        this.renderPage = <Signup />
        break;
      case 'login':
        this.renderPage = <Login />
        break;
      default:
        this.renderPage = (
        <div>
          <h4>Welcome to Mock Stock Market!</h4>
        <Search onSearch={this.search.bind(this)} />
        </div>
        )
    }
    return (
      <div>
        <div onClick={this.btnClick}>
          { this.state.login ?  <button /> : null }
          <button className='btn show' value='singup'>Sign Up</button>
          <button className='btn show' value='login'>Login</button>
        </div>
        <div>
          {this.renderPage}
        </div>
      </div>
    )
  }
}

let button = () => {
  return (
    <div>
      <button className='btn no-show' value='dashboard'>Dashboard</button>
      <button className='btn no-show' value='trade'>Trade</button>
      <button className='btn no-show' value='history'>History</button>
    </div>

  )
}
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)