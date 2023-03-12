import React from 'react';
import sha1 from 'crypto-js/sha1';


const initState = {
  username:'',
  password:''
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = initState;
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange (e) {
    var id = e.target.id;
    var value = e.target.value;
    if (id === 'username') {
      this.setState({
        username: value
      })
    } else if (id === 'pw') {
      this.setState({
        password: value
      })
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.username.length == 0) {
      alert('Please enter the username');
    } else if (this.state.password.length === 0) {
      alert('Please enter password!');
    } else {
      const tempUser = {
        username: this.state.username,
        password: this.state.password
      };
      this.props.login(tempUser)
       .then(() => {
        this.setState(initState);
       })
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
          UserName:
          <input onChange={this.handleChange} value={this.state.username} type="text" id="username" />
        </label>
        <br/>
        <label>
          Password:
          <input onChange={this.handleChange} value={this.state.password1}type="password" id='pw'/>
        </label>
        <br/>

        <br/>
        <input type="submit" value="Login" />
      </form>
    )
  }
}

export default Login;