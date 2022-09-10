import React from 'react';
import ReactDOM from 'react-dom/client';
import Search from "./component/Search.jsx";
import Dashboard from "./component/Dashboard.jsx";
import Trade from "./component/Trade.jsx";
import History from "./component/History.jsx";
import Signup from "./component/Signup.jsx";
import Login from "./component/Login.jsx";
import {searchStock, login, handleTrade, userStocks, allHistory} from '../../helper/utils.js';
//import './index.css'
class App extends React.Component {

  constructor(props) {
    super (props);
    this.state = {
      clickBtn: '',
      user: {},
      login: false,
      user_stocks: [],
      user_history: []
    };
    this.btnClick = this.btnClick.bind(this);
    this.beforeLoginRenderPage = null;
    this.afterLoginRenderpage = null;
  }

  search(symbol, cb) {
    symbol = symbol.toUpperCase()
    console.log(`This ${symbol} has been searched!`);
    searchStock(symbol, cb);
  }

  handleLogin(user) {
    return login(user)
      .then((json) => {
        if (typeof json === 'string') {
          let message = json;
          throw message;
        }
        //console.log('in handlelogin: ',typeof json);
        const user = {
          id: json.id,
          name: json.name,
          cash: json.cash
        }
        this.setState({
          user: user,
          login: true
        })
      })
      .catch(message => {
        alert(message);
      })
  }

  trade(content) {
    return handleTrade(content)
      .then(json => {
        if (typeof json === 'string') {
          let message = json;
          throw message;
        }
        let updateUser = {
          id: this.state.user.id,
          name: this.state.user.name,
          cash: json.cash
        }
        this.setState({
          user: updateUser
        });
      })
      .then(() => alert('Trade successfully!'))
      .catch(message => alert(message))
  }

  findUserStock(cb) {
    return userStocks(this.state.user.id)
      .then(json => {
        console.log('stocks json: ', json);
        this.setState({
          user_stocks: json
        })
      })
      .then(() => {
        cb();
      })
  }

  findHistory(cb) {
    return allHistory(this.state.user.id)
      .then(json => {
        console.log('history json: ', json);
        this.setState({
          user_history: json
        })
      })
      .then(() => {
        cb();
      })
  }

  btnClick(e) {
    let btn = e.target.value;
    console.log(btn + ' just Clicked!');
    if (btn === 'logout') {
      this.setState({
        clickBtn: '',
        login: false
      })
    } else if (btn === 'dashboard') {
      this.findUserStock(() => {
        this.setState({
          clickBtn: btn
        })
      })
    } else if (btn === 'history') {
      this.findHistory(() => {
        this.setState({
          clickBtn: btn
        })
      })
    } else {
      this.setState({
        clickBtn: btn
      })
    }
  }



  render() {
    if (!this.state.login) {
      switch (this.state.clickBtn) {
        case 'singup':
          this.beforeLoginRenderPage = <Signup />
          break;
        case 'login':
          this.beforeLoginRenderPage = <Login login={this.handleLogin.bind(this)}/>
          break;
        default:
          this.beforeLoginRenderPage = (
          <div>
            <h2>Welcome to Mock Stock Market!</h2>
          <Search onSearch={this.search.bind(this)} />
          </div>
          )
      }
    } else {
      switch (this.state.clickBtn) {
        case 'dashboard':
          this.afterLoginRenderpage = <Dashboard user={this.state.user} stocks={this.state.user_stocks}/>
          break;
        case 'trade':
          this.afterLoginRenderpage = <Trade trade={this.trade.bind(this)} user={this.state.user}/>
          break;
        case 'history':
          this.afterLoginRenderpage = <History history={this.state.user_history}/>
          break;
        case 'search':
          this.afterLoginRenderpage = <Search onSearch={this.search.bind(this)}/>
          break;
        default:
          this.afterLoginRenderpage = <Dashboard user={this.state.user} stocks={this.state.user_stocks}/>
      }
    }

    return (
      <div>
        <div className='button' onClick={this.btnClick}>
          { this.state.login &&  (
            <a>
              <button className='btn' value='dashboard'>Dashboard</button>
              <button className='btn' value='trade'>Trade</button>
              <button className='btn' value='history'>History</button>
              <button className='btn' value='search'>Search</button>
            </a>
            )
          }
          { !this.state.login ? (
            <a>
              <button className='btn' value='singup'>Sign Up</button>
              <button className='btn' value='login'>Login</button>
            </a>)
           : <button className='btn' value='logout'>LogOut</button>}
        </div>
      <div className='main'>
          { !this.state.login ? this.beforeLoginRenderPage : this.afterLoginRenderpage}
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