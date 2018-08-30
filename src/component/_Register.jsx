import React from 'react';

class _Register extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      email: "",
      password: "",
    }
  }
  register() {
    fetch('http://127.0.0.1:1337/register', {
      method: 'POST',
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.success) {
        this.props.changePage('Login')
      } else {
          this.props.changePage('Register')
      }
    })
    .catch((err) => {
      console.log('err', err);
    });
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
  render() {
    return (
      <div style={{ margin: '20px' }}>
        <button className="btn btn-secondary margin" style={{float:'right'}} onClick={() => (this.props.changePage("Login"))}>Log in</button>
        <h3>Welcome to Horizons Doc. Please register! </h3>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" onChange={(event) => this.email(event)} aria-describedby="emailHelp" placeholder="Enter email"></input>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" onChange={(event) => this.password(event)} placeholder="Password"></input>
          </div>
          <button type="submit" className="btn btn-secondary margin" onClick={() => this.register()}>Register</button>
      </div>
    )
  }
}

export default _Register;
