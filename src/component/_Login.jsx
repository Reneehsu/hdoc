import React from 'react';

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
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.success) {
        console.log(responseJson.user);
        this.props.setUser(responseJson.user);
        this.props.changePage('Portal')
      } else {
        this.props.changePage('Login')
      }
    })
    .catch((err) => {
      console.log('err', err);
    });
  }
  render() {
    return (
      <div style={{ margin: '20px' }}>
        <button className="btn btn-secondary margin" style={{float:'right'}} onClick={() => (this.props.changePage("Register"))}>Register</button>
        <h3>Welcome to Horizons Doc. Please log in! </h3>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" onChange={(event) => this.email(event)} aria-describedby="emailHelp" placeholder="Enter email"></input>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" onChange={(event) => this.password(event)} placeholder="Password"></input>
          </div>
          <button type="submit" className="btn btn-secondary margin" onClick={()=>this.login()}>Log in</button>
      </div>
    )
  }
}

export default _Login;
