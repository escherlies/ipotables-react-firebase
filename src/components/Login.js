import React, { Component } from 'react'
import firebase from '../functions/firebaseApp'

class Login extends Component {

  state = {}

  login = (event) => {
    event.preventDefault()
    console.log(event.target)

    const email = this.email.value
    const pw = this.pw.value

    firebase.auth().signInWithEmailAndPassword(email, pw).catch(function (error) {
      // Handle Errors here.
      // var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      if (errorMessage) return window.alert(errorMessage)

    });

  }

  register = (event) => {
    event.preventDefault()

    const email = this.reg_email.value
    const pw = this.reg_pw.value
    const pw2 = this.reg_pw2.value

    console.log(email)
    if (pw !== pw2) return window.alert('Password missmatch')

    firebase.auth().createUserWithEmailAndPassword(email, pw).catch(function (error) {
      // Handle Errors here.
      // var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      if (errorMessage) return window.alert(errorMessage)
    });
  }

  render() {

    return (
      <div style={{}} >
        <h3>Status</h3>
        <div>{firebase.auth().currentUser ? 'Logged Out' : 'Logged In'}</div>
      <h3>Log In</h3>
        <form action="" onSubmit={this.login}>
          <div>Email:</div>
          <input ref={e => this.email = e} type="text" />
          <div>Password:</div>
          <input ref={e => this.pw = e} type="password" />
          <div>
          <button>Log In</button> 
          </div>
        </form>
        <br/>
        <h3>Register</h3>
        <form action="" onSubmit={this.register}>
          <div>Email:</div>
          <input ref={e => this.reg_email = e} type="text" />
          <div>Password:</div>
          <input ref={e => this.reg_pw = e} type="password" />
          <div>Confirm Password:</div>
          <input ref={e => this.reg_pw2 = e} type="password" />
          <div>
          <button>Register</button>
          </div>
        </form>
        <br/>
        <button onClick={() => firebase.auth().signOut()}>Log Out</button>
      </div>
    )
  }
}

export default Login