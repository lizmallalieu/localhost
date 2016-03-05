import React from 'react'
import $ from 'jquery'

import { browserHistory } from 'react-router'

import {Tabs, Tab, Dialog, FlatButton, TextField, MenuItem} from 'material-ui';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showValidateEmailError: false,
      showAccountExistsError: false,
      showInvalidFieldsError: false,
      username: undefined,
      password: undefined,
      email: undefined
    }
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
  }

  // Uses regex to validate email entered
  validateEmail = (email) => {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

  handleSignUp = () => {
    var user = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    };
    console.log('user', user);
    // Check to see if the form is completely filled
    if (!user.username || !user.password || !user.email) {
      this.setState({
        showInvalidFieldsError: true
      }, function() {
        var setState = this.setState.bind(this);
        setTimeout(function() {
          setState({showInvalidFieldsError: false});
        }, 2000);
      });
      return;
    }
    // Check to see if the form has a valid email address
    if (!this.validateEmail(this.state.email)) {

      // Shows error message for 2 seconds, then removes it
      this.setState({showValidateEmailError: true}, function() {
        var setState = this.setState.bind(this);
        setTimeout(function() {
          setState({showValidateEmailError: false});
        }, 2000);
      });
      return;
    }

    $.post('/api/signup', {data: user})
      .done((data) => {
        if (data === 'Account already exists.') {
          // Shows error message for 2 seconds, then removes it
          this.setState({
            showAccountExistsError: true
          }, function() {
            var setState = this.setState.bind(this);
            setTimeout(function() {
              setState({showAccountExistsError: false});
            }, 2000);
          });
        } else {
          browserHistory.push('/profile');
          this.setState({
            show: false
          })
        // Triggers the signIn function on navigation, which changes the signedIn state
          this.props.signIn();
        }
      })
      .fail((err) => {
        console.log('error in signUp', err);
      });
  }

  handleChange = (prop, e) => {
    var newState = this.state;
    newState[prop] = e.target.value;
    this.setState(newState);
  };

  // Hides the modal window
  close = () => {
    this.setState({
      show: false
    });
  };

  // Shows the modal window
  show = () => {
    this.setState({
      show: true
    });
  };

  render() {

    const actions = [
      <TextField
        floatingLabelText="Username"
        ref="username"
        onChange={this.handleChange.bind(this, 'username')}
      />,
      <TextField
        floatingLabelText="Password"
        type="password"
        ref="password"
        onChange={this.handleChange.bind(this, 'password')}
      />,
      <TextField
        floatingLabelText="Email Address"
        type="email"
        ref="email"
        onChange={this.handleChange.bind(this, 'email')}
      />,
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.close}
      />,
      <FlatButton
        label="Sign Up"
        primary={true}
        onTouchTap={this.handleSignUp}
        onRequestClose={this.close}
      />
    ];

    return (
      <div>
      <MenuItem 
        primaryText='Sign Up'
        onTouchTap={this.show}
      >
      </MenuItem>
      <Dialog
        title='Sign Up'
        ref= "dialog"
        actions={actions}
        modal={true}
        open={this.state.show}
        >
      </Dialog>

      </div>
    )
  }
}
