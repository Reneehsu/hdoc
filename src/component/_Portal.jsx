import React from 'react';
import prompt from 'electron-prompt';

class _Portal extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      newDoc: "",
      docId: "",
      docs: ['empty']
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
    prompt({
      title: 'Enter password',
      label: 'Please input a password for this document:',
    })
    .then((r) => {
        if(r === null) {
            console.log('user cancelled');
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
            //this.createOwnership(r);
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
          newDocs.push(document._id);
          console.log(newDocs);
          this.setState({
            docId: "",
            newDoc: "",
            docs: newDocs
          })
      } else {
          console.log('Error');
      }
    })
    .catch((err) => {
      console.log('err', err);
    })
  }

  findDoc() {
    this.props.changePage('Document');
  }
  render() {

    return(
      <div style={{margin:'20px'}}>
        <div>
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
          {this.state.docs.map(doc => <div key={doc} >{doc}</div>)}
          <button onClick={() => this.findDoc()}>My first doc</button>
        </div>
      </div>
    )
  }
}

export default _Portal;
