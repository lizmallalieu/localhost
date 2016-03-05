import React from 'react'
import { browserHistory } from 'react-router'
import $ from 'jquery'

import {Tabs, Tab, Dialog, FlatButton, TextField, MenuItem} from 'material-ui';


export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showInvalidFieldsError: false,
      showInvalidUsernameOrPassword: false,
      username: undefined,
      password: undefined
    }
  }

  contextTypes: {
    router: React.PropTypes.object
  }

  handleSignIn = () => {
    var user = {
      username: this.state.username,
      password: this.state.password,
    };
    // If user didn't enter username or password, displays an error message for 2 seconds
    if (!user.username || !user.password) {
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
    $.post('/api/signin', {data: user})
      .done((data) => {
        this.props.setAppState({
          user: {
            uid: data._id,
            username: data.username,
            name: data.name,
            email: data.email,
            phone: data.phone,
            twitter: data.twitter,
            about: data.twitter
          },
          createdTours: data.createdTours,
          attendingTours: data.attendingTours,
          attendedTours: data.attendedTours,
          ratedTours: data.ratedTours
        });

        // Depending on the error, the server will respond with a given message.
        if (user === 'Username and/or password invalid.') {
          this.setState({
            showInvalidUsernameOrPassword: true
          }, function() {
            var setState = this.setState.bind(this);
            setTimeout(function() {
              setState({showInvalidUsernameOrPassword: false});
            }, 2000);
          });
          return;
        } else {
          this.props.signIn();
          this.props.toggleModal('signInModal');

          // Changing the window.location allows the React-router to render the correct component
          browserHistory.push('/profile')
        }
        // Hides the modal window
        // this.props.setAppState({signedIn: false})
      })
    .fail((err) => {
      console.error('cannot signin');
    });
  }

  handleChange = (prop, e) => {
    var newState = this.state;
    newState[prop] = e.target.value;
    this.setState(newState);
  };

  render() {
    var invalidFieldsError = <div> Please fill out all forms. </div>
    var invalidUsernameOrPassword = <div> Incorrect username or password. </div>

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
      <FlatButton
        label="Cancel"
        secondary={true}
        
      />,
      <FlatButton
        label="Sign In"
        primary={true}
        onTouchTap={this.handleSignIn}
      />
    ];

    return (
      <Dialog
        title='Sign In'
        ref= "dialog"
        actions={actions}
        modal={true}
        open={this.props.signInModal}
      />
    )
  }
}
