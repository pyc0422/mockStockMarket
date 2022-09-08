import React from 'react';
import ReactDOM from 'react-dom/client';
import Search from "./component/Search.jsx";
import Dashboard from "./component/Dashboard.jsx";
import Trade from "./component/Trade.jsx";
import History from "./component/History.jsx";
import Signup from "./component/Signup.jsx";
import Login from "./component/Login.jsx";
import axios from 'axios';
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

  search(symbol) {
    symbol = symbol.toUpperCase()
    console.log(`This ${symbol} has been searched!`);
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    // headers.append('Access-Control-Allow-Credentials', 'true');
    // fetch('http://localhost:3000/search', {
    //   method: 'POST',
    //   body: JSON.stringify({symbol}),
    //   mode: 'cors',
    //   headers: {'Content-Type': 'application/json'}
    // }).then(response => response.json())
    //   .then(data => {
    //     console.log('fetch data: ', data);
    //   })
    //   .catch((err) => {
    //     console.log('fetch post err: ', err);
    //   })
    axios.post('http://localhost:3000/search', {symbol})
      .then(res => {
        console.log(res);
        console.log(res.data);
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
          <button className='btn no-show' value='dashboard'>Dashboard</button>
          <button className='btn no-show' value='trade'>Trade</button>
          <button className='btn no-show' value='history'>History</button>
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
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)