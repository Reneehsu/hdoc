import React from 'react';
const {dialog} = require('electron').remote;

class _Login extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      email: "",
      password: "",
    }
  }
  email(event) {
    this.setState({
      email: event.target.value
    })
  }
  password(event) {
    this.setState({
      password: event.target.value
    })
  }
  login() {
    console.log(this.state.email);
    console.log(this.state.password);

    fetch('http://127.0.0.1:1337/login', {
      method: 'POST',
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        username: this.state.email,
        password: this.state.password
      })
    })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('Unauthorized');
      } else {
        return response.json();
      }
    })
    .then((responseJson) => {
      if (responseJson.success) {
        console.log(responseJson.user);
        this.props.setUser(responseJson.user);
        this.props.changePage('Portal')
      } else {
        console.log('falied');
      }
    })
    .catch((err) => {
      console.log('err', err);
      dialog.showErrorBox('LOG IN FAILED', 'Incorrect user email or password!');
      this.setState({
        email: '',
        password: ''
      })
    });
  }
  render() {
    return (
      <div style={{ margin: '20px' }}>
        <button className="btn btn-secondary margin" style={{float:'right'}} onClick={() => (this.props.changePage("Register"))}>Register</button>
        <h3>Welcome to Horizons Doc. Please log in! </h3>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" value={this.state.email} className="form-control" onChange={(event) => this.email(event)} aria-describedby="emailHelp" placeholder="Enter email"></input>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={this.state.password} className="form-control" onChange={(event) => this.password(event)} placeholder="Password"></input>
          </div>
          <button type="submit" className="btn btn-secondary margin" onClick={()=>this.login()}>Log in</button>
      </div>
    )
  }
}

export default _Login;
