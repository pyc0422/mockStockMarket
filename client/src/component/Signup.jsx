import React from 'react';
import sha256 from 'crypto-js/sha256';
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      username:'',
      password1:'',
      password2: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange (e) {
    var id = e.target.id;
    var value = e.target.value;
    if (id === 'username') {
      this.setState({
        username: value
      })
    } else if (id === 'pw1') {
      this.setState({
        password1: value
      })
    } else if (id === 'pw2') {
      this.setState({
        password2: value
      })
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.username.length == 0) {
      alert('Please enter the username');
    } else if (this.state.password1.length === 0 || this.state.password2.length === 0) {
      alert('Please enter password!');
    } else if (this.state.password1 !== this.state.password2) {
      alert('Password did not match');
    } else {
      var hashed = JSON.stringify(sha256(this.state.password).words);
      const text = {
        username: this.state.username,
        password: hashed,
        cash: 100
      }
      console.log(text);
      console.log('just signup ready to sent to server');
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
          <input onChange={this.handleChange} value={this.state.password1}type="password" id='pw1'/>
        </label>
        <br/>
        <label>
          Password again:
          <input onChange={this.handleChange} value={this.state.password2} type="password" id='pw2'/>
        </label>
        <br/>
        <input type="submit" value="Register" />
      </form>
    )
  }
}

export default Signup;