import React, { useState } from 'react';

const initState = {
  username:'',
  password1:'',
  password2: '',
  message: '',
  registed: false,
};

class Signup extends React.Component {
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
      const newUser = {
        username: this.state.username,
        password: this.state.password1,
        cash: 1000
      };
      console.log(newUser, ' start signup!');
      return fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      })
       .then((res) => {
        console.log('response data:' , res)
        if (res.status === 422) {
          alert('User already exists!');
        } else {
          alert('Registe Success! You can Login now!')
        }
        this.setState(initState);
       })
    }
  }
  render() {
    return (
      <div style={{color:'black', fontWeight:600, width:'50%', margin:'auto'}}>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-row">
            <label>
              UserName:
            </label>
            <input onChange={this.handleChange} value={this.state.username} type="text" id="username" />
          </div>
          <div className="form-row">
            <label>
            Password:
            </label>
            <input
             onChange={this.handleChange}
             value={this.state.password1}
             type="password"
             id='pw1'
            />

          </div>
            <div className="form-row">
            <label>
              Password again:
            </label>
            <input
             onChange={this.handleChange}
             value={this.state.password2}
             type="password"
             id='pw2'
            />
          </div>
          <div style={{marginTop:'5%'}}>
            <input className='btn' type="submit" value="Register" />

          </div>

        </form>

      </div>
    )
  }
}


export default Signup;