import React from 'react';
import prompt from 'electron-prompt';
const {dialog} = require('electron').remote;


class _Portal extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      newDoc: "",
      docId: "",
      docs: []
    }
  }
  componentDidMount() {
    fetch(`http://127.0.0.1:1337/document/${this.props.user._id}`, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson) {
        console.log(responseJson);
        this.setState({
          docs: responseJson
        })
      } else {
        console.log('failed');
      }
    })
    .catch((err) => {
      console.log('err', err);
    });
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
    if (this.state.newDoc === "") {
      dialog.showErrorBox('ERROR', 'EMPTY TITLE NAME');
      return;
    }
    prompt({
      title: 'Enter password',
      label: 'Please input a password for this document:',
    })
    .then((r) => {
        if(r === null) {
            console.log('user cancelled');
        } else if (r === ""){
            dialog.showErrorBox('ERROR', 'EMPTY PASSWORD');
            this.createPassword();
        } else{
            this.createDocument(r);
            console.log('result', r);
        }
    })
    .catch(console.error);
  }

  enterPassword(){
    prompt({
      title: 'Enter password',
      label: 'Please enter the password for this document:',
    })
    .then((r) => {
        if(r === null) {
            console.log('user cancelled');
        } else{
            this.checkPassword(r);
            console.log('result', r);
        }
    })
    .catch(console.error);
  }

  checkPassword(password) {
    fetch('http://127.0.0.1:1337/checkpassword', {
      method: 'POST',
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        docId: this.state.docId,
        password: password
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.success) {
        this.createOwnership(responseJson.document);
      } else {
        dialog.showErrorBox('ERROR', 'WRONG PASSWORD');
        this.enterPassword();
        console.log('failed');
      }
    })
    .catch((err) => {
      console.log('err', err);
    });
  }

  createDocument(password){
    fetch('http://127.0.0.1:1337/create', {
      method: 'POST',
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        title: this.state.newDoc,
        password: password,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.success) {
        console.log(responseJson.document);
        this.createOwnership(responseJson.document);
      } else {
        console.log('Error');
      }
    })
    .catch((err) => {
      console.log('err', err);
    });
  }

  createOwnership(document){
    fetch('http://127.0.0.1:1337/createownership', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: this.props.user,
        document: document
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.success) {
          let newDocs = this.state.docs.slice();
          newDocs.push(document);
          console.log(newDocs);
          this.setState({
            docId: "",
            newDoc: "",
            docs: newDocs
          })
          this.props.setDoc(document._id);
          this.props.changePage('Document');
      } else {
          console.log('Error');
      }
    })
    .catch((err) => {
      console.log('err', err);
    })
  }

  findDoc(doc) {
    this.props.setDoc(doc);
    this.props.changePage('Document');
  }

  logout(){
    fetch('http://127.0.0.1:1337/logout', {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.success) {
        this.props.changePage('Login')
        this.props.setUser(null);
      } else {
        console.log(responseJson);
      }
    })
    .catch((err) => {
      console.log('err', err);
    });
  }

  render() {
    return(
      <div style={{margin:'20px'}}>
        <div>
          <button className="btn btn-secondary margin" style={{float:'right'}} onClick={() => (this.logout())}>Log out</button>
          <h4>{this.props.user.email}</h4>
          <input className="form-control margin" value={this.state.newDoc} style={{width: '400px', display: 'inline-block'}} onChange={(event) => this.newDoc(event)} placeholder="new document title"></input>
          <button className="btn btn-secondary margin" onClick={()=>this.createPassword()}>Create document</button>
        </div>
        <div>
          <input className="form-control margin" value={this.state.docId} style={{width: '400px', display: 'inline-block'}} onChange={(event) => this.docId(event)} placeholder="paste a doc id shared with"></input>
          <button className="btn btn-secondary margin" onClick={()=>this.enterPassword()}>Add shared document</button>
        </div>
        <div style={{border: '2px solid black', padding: '5px', margin:'2px'}}>
          <h4>My documents: </h4>
          {this.state.docs.map(doc => <div key={doc._id} ><button onClick={() => this.findDoc(doc._id)}>{doc.title}</button></div> )}
        </div>
      </div>
    )
  }
}

export default _Portal;
