import React from 'react'
import $ from 'jquery'
import {Router, Route, IndexRoute, Link, hashHistory, browserHistory} from 'react-router'
import {Button, ButtonGroup, Navbar, Nav, NavItem} from 'react-bootstrap'

import SignIn from './account/SignIn'
import SignUp from './account/SignUp'
import CreateTourForm from './profile/CreateTourForm'

import {AppBar, Tabs, Tab, IconMenu, MenuItem, IconButton} from 'material-ui';
import Popover from 'material-ui/lib/popover/popover';
import PopoverAnimationFromTop from 'material-ui/lib/popover/popover-animation-from-top';
import RadioButton from 'material-ui/lib/radio-button';
import RaisedButton from 'material-ui/lib/raised-button';
import ActionHome from 'material-ui/lib/svg-icons/action/home';


export default class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // showLoginReminder: false,
      // show: false,
      // open: false
    }
  }

  // componentWillMount() {
  //   // Checks to see if the user is logged in or not. Changes the signedIn property, which hides or shows different parts of the nav bar
  //   $.get('/api/session')
  //   .done((data) => {
  //     if (data.isAuth === false) {
  //       this.props.setAppState({signedIn: false})
  //     } else {
  //       this.props.setAppState({signedIn: true})
  //     }
  //   })
  //   .fail((err) => {
  //     console.error('Error fetching session from server', err)
  //     throw new Error('Error fetching session from server', err)
  //   })
  // }

  handleProfileClick = () => {
    console.log('inside handleProfileClick');
    console.log('this.props.state inside handleProfileClick', this.props.state)
    console.log('this.props.signedIn inside handleProfileClick', this.props.signedIn)
    $.get('/api/profile')
    .done((data) => {
      // If the user is not signed in, then show an error message that disappears after 2 seconds.
      if (!this.state.signedIn) {
        console.log('not signed in');
        // this.setState({ showLoginReminder: true })
        // var setState = this.setState.bind(this)
        // setTimeout(() => {
        //   setState({ showLoginReminder:false })
        // }, 2000)
        // TODO: somewhat hard coding this in here
        browserHistory.push('/profile')
      } else {
        // If user is signed in, redirect to profile page
        console.log('signed in');
        this.setState({ showLoginReminder: false })
        browserHistory.push('/profile')
      }
    })
    .fail((err) => {
      console.error('Error fetching profile from server', err)
      throw new Error('Error fetching profile from server', err)
    })
  }

  endSession = () => {
    // Clicking on logout will terminate the session and re-route to welcome page
    $.get('/api/logout').done(() => {
      this.props.setAppState({signedIn: false})
      browserHistory.push('/');
    })
  }

  render() {

    const styles = {
      popover: {
        padding: 0,
      },
      h3: {
        marginTop: 20,
        fontWeight: 400,
      },
      block: {
        display: 'flex',
      },
      block2: {
        margin: 10,
      }
    };

    return (
      <div>
        <AppBar
          onTitleTouchTap={this.handleProfileClick}
          iconElementLeft={
            <div className='leftside'>
              <Link to="/search">
              <Tab label='Find a Tour'/>
              </Link>
              <Tab label='Create a Tour' onTouchTap={evt => this.props.toggleModal('tourFormModal')}/>
            </div>
          }
          iconElementRight={
            <div>
              <IconMenu
                closeOnItemTouchTap={false}
                iconButtonElement={<IconButton><svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                </svg></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <MenuItem primaryText="Log In" onTouchTap={evt => this.props.toggleModal('signInModal')}/>
                <MenuItem primaryText="Sign Up" onTouchTap={evt => this.props.toggleModal('signUpModal')}/>
                <MenuItem primaryText="Profile" onTouchTap={this.handleProfileClick}/>
                <MenuItem primaryText="Log Out" onTouchTap={this.endSession}/>
              </IconMenu>
            </div>
          }
        />
      </div>
    )
  }
}
