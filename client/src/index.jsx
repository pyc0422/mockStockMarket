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
    this.beforeLoginRenderPage = null;
    this.afterLoginRenderpage = null;
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

  handleLogin(user) {
    console.log('inside handellogin: ', user);
    return fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then((res) => {
        if (res.status === 404) {
          alert('Can not find such user!');
        } else if (res.status === 401) {
          alert('Wrong password!');
        } else {
          this.setState({
            login: true
          });
        }
      });
  }

  btnClick(e) {
    console.log(e.target.value + ' just Clicked!');
    this.setState({
      clickBtn: e.target.value
    })
    if (e.target.value === 'logout') {
      this.setState({
        login: false
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
            <h4>Welcome to Mock Stock Market!</h4>
          <Search onSearch={this.search.bind(this)} />
          </div>
          )
      }
    } else {
      switch (this.state.clickBtn) {
        case 'dashboard':
          this.afterLoginRenderpage = <Dashboard />
          break;
        case 'trade':
          this.afterLoginRenderpage = <Trade />
          break;
        case 'history':
          this.afterLoginRenderpage =<History />
          break;
        case 'logout':
          this.afterLoginRenderpage = (
            <div>
              <h4>Welcome to Mock Stock Market!</h4>
            <Search onSearch={this.search.bind(this)} />
            </div>
            )
          break;
        default:
          this.afterLoginRenderpage = <Dashboard />
      }
    }

    return (
      <div>
        <div onClick={this.btnClick}>
          { this.state.login &&  (
            <a>
              <button className='btn' value='dashboard'>Dashboard</button>
              <button className='btn' value='trade'>Trade</button>
              <button className='btn' value='history'>History</button>
            </a>
            )
          }
          { !this.state.login ? (
            <a>
              <button className='btn' value='singup'>Sign Up</button>
              <button className='btn' value='login'>Login</button>
            </a>)
           : <button className='btn' vlaue='logout'>LogOut</button>}
        </div>
      <div>
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