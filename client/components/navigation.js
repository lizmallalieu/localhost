import React from 'react'
import $ from 'jquery'

import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router'
import {Button, ButtonGroup, Navbar, Nav, NavItem} from 'react-bootstrap'

import SignIn from './account/SignIn'
import SignUp from './account/SignUp'

import {AppBar, Tabs, Tab} from 'material-ui';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showLoginReminder: false,
      signedIn: false,
    }
    this.signIn = this.signIn.bind(this);
    this.endSession = this.endSession.bind(this);
  }

  componentWillMount() {
    // Checks to see if the user is logged in or not. Changes the signedIn property, which hides or shows different parts of the nav bar
    $.get('/session')
    .done((data) => {
      if (data.isAuth === false) {
        this.setState({ signedIn: false })
      } else {
        this.setState({ signedIn: true })
      }
    })
    .fail((err) => {
      console.error('Error fetching session from server', err)
      throw new Error('Error fetching session from server', err)
    })
  }

  handleProfileClick = (evt) => {
    evt.preventDefault()
    $.get('/profile')
    .done((data) => {
      // If the user is not signed in, then show an error message that disappears after 2 seconds.
      if (!data.isAuth) {
        this.setState({ showLoginReminder: true })
        var setState = this.setState.bind(this)
        setTimeout(() => {
          setState({ showLoginReminder:false })
        }, 2000)
      } else {
        // If user is signed in, redirect to profile page
        this.setState({ showLoginReminder: false })
        window.location = '/#/profile';
      }
    })
    .fail((err) => {
      console.error('Error fetching profile from server', err)
      throw new Error('Error fetching profile from server', err)
    })
  }

  endSession = (evt) => {
    evt.preventDefault()
    // Clicking on logout will terminate the session and re-route to welcome page
    $.get('/logout').done(() => {
      this.setState({ signedIn: false })
      window.location = '/#/welcome'
    })
  }

  signIn = () => {
    // signedIn state controls what shows up on nav bar. This method is passed down
    // to SignUp and SignIn components.
    this.setState({
      signedIn: true
    })
  }

  render() {
    return (
      <div>
        <AppBar
          title="local host"
          iconElementRight={
            <div className='tabs'>
              <Tab label='User' onTouchTap={this.handleProfileClick}/>
              <Tab label='Log In' onTouchTap={this.signIn}/>
              <Tab label='Log Out' onTouchTap={this.endSession}/>
              <Tab label='Sign Up'/>
              <Tab label='Search'/>
              { this.state.signedIn ? <Tab href="#/profile"/> : null }
              { this.state.signedIn ? null : <SignUp signIn={this.signIn}/> }
              { this.state.signedIn ? null : <SignIn signIn={this.signIn}/> }
              { this.state.signedIn ? <Tab onClick={this.endSession}/> : null }
            </div>}
        />
      </div>
    )
  }
}
