import React from 'react';

class _Portal extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      newDoc: "",
      password: "",
      docId: "",
    }
  }
  newDoc(event) {
    this.setState({
      newDoc: event.target.value
    })
  }
  docId(event) {
    this.setState({
      docId: event.target.value
    })
  }
  createPassword(){
    const password = prompt("Enter password");
    this.setState({
      password: password,
    })
  }
  create(){
    fetch('http://127.0.0.1:1337/create', {
      method: 'POST',
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        title: this.state.newDoc,
        password: this.state.password
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.success) {
        console.log(responseJson.user);
        this.props.changePage('Portal')
      } else {
        console.log('Error');
      }
    })
    .catch((err) => {
      console.log('err', err);
    });
  }
  findDoc() {
    this.props.changePage('Document');
  }
  render() {
    console.log(this.props.user);
    return(
      <div style={{margin:'20px'}}>
        <div>
          <h4>{this.props.user.email}</h4>
          <input className="form-control margin" style={{width: '400px', display: 'inline-block'}} onChange={(event) => this.newDoc(event)} placeholder="new document title"></input>
          <button className="btn btn-secondary margin" onClick={()=>this.createPassword()}>Create document</button>
        </div>
        <div>
          <input className="form-control margin" style={{width: '400px', display: 'inline-block'}} onChange={(event) => this.docId(event)} placeholder="paste a doc id shared with"></input>
          <button className="btn btn-secondary margin" onClick={()=>this.create()}>Add shared document</button>
        </div>
        <div style={{border: '2px solid black', padding: '5px', margin:'2px'}}>
          <h4>My documents: </h4>
          <button onClick={() => this.findDoc()}>My first doc</button>
        </div>
      </div>
    )
  }
}

export default _Portal;
