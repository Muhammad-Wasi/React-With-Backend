import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      name: '',
    }
    this._add = this._add.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:3001/list/getAll').then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error));
  }

  // _add() {
  //   const { text } = this.state
  //   if (text) {
  //     console.log('text', text)
  //     fetch('http://localhost:3001/list/add', {
  //       method: 'POST', // or 'PUT'
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ text: text }), // data can be `string` or {object}!
  //     }).then(res => res.json())
  //       .then(response => console.log('Success:', JSON.stringify(response)))
  //       .catch(error => console.error('Error:', error));
  //   }
  //   else {
  //     console.log('Type Something')
  //   }
  // }

  _add() {
    const { text, name } = this.state
    if (text) {
      console.log('text', text)
      fetch('http://localhost:3001/message/add', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text,
          name,
          seen: false
        }), // data can be `string` or {object}!
      }).then(res => res.json())
        .then(response => {

          console.log('Success:', JSON.stringify(response))
          this.setState({ text: '', name: '' })
        })
        .catch(error => console.error('Error:', error));
    }
    else {
      console.log('Type Something')
    }
  }

  // responseGoogle = (response) => {
  //   console.log('Google Login', response)
  // }

  // componentClicked = (response) => {
  //   console.log('Facebook componentClicked Login', response);
  // }

  // responseFacebook = (response) => {
  //   console.log('Facebook Login', response);
  // }


  render() {
    const { text, name } = this.state
    // const { email, password } = this.state
    return (
      <div className="App">
        <div>
          <input
            type={'text'}
            placeholder={"Type Name"}
            value={name}
            onChange={(e) => this.setState({ name: e.target.value })}
          />
          <br />
          <input
            type={'text'}
            placeholder={"Type Something"}
            value={text}
            onChange={(e) => this.setState({ text: e.target.value })}
          />
          <br />
          <button onClick={this._add}>
            Add
           </button>
        </div>
        {/* <GoogleLogin
        clientId='126190902414-hgkgvoh2g22nsm50kms7lgtle9r9cbgh.apps.googleusercontent.com'
        // clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={(abc)=>this.responseGoogle(abc)}
        // onSuccess={responseGoogle}
        onFailure={(abc)=>this.responseGoogle(abc)}
        />
        <FacebookLogin
        appId="2233519753633781"
        autoLoad={true}
        fields="name,email,picture"
        onClick={(xyz) => this.componentClicked(xyz)}
        callback={(xyz) => this.responseFacebook(xyz)} /> */}
      </div>
    );
  }
}

export default App;
