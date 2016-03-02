import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import $ from 'jquery'
import {Button, ButtonGroup, Navbar, Nav, NavItem} from 'react-bootstrap'
import SignIn from './account/SignIn'
import SignUp from './account/SignUp'

export default class Navigation extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showLoginReminder: false,
			signedIn: false,
		}
		this.signIn = this.signIn.bind(this);
		this.endSession = this.endSession.bind(this);
	}


		handleProfileClick() {
			$.get('/profile')
				.done( (data) => {
					// If the user is not signed in, then show an error message that disappears
					// after 2 seconds.
					if (data.isAuth === false) {
						this.setState({
							showLoginReminder: true
						})
						var setState = this.setState.bind(this);
						setTimeout(function(){
							setState({showLoginReminder:false})
						},2000);
					} else {
						// If user is signed in, redirect to profile page
						this.setState({
							showLoginReminder: false
						})
						window.location = '/#/profile';
					}
				})
		};

		componentWillMount() {
			// Checks to see if the user is logged in or not. Changes the signedIn property,
			// Which hides or shows different parts of the nav bar
			$.get('/session')
				.done( (data) => {
					if (data.isAuth === false) {
						this.setState({
							signedIn: false
						})
					} else {
						this.setState({
							signedIn: true
						})
					}
				});
		};

		endSession() {
			// Clicking on logout will terminate the session and re-route to welcome page
			$.get('/logout').done(() => {
					this.setState({
					signedIn: false
				})
				window.location = '/#/welcome'
			})
		};

		signIn() {
			// signedIn state controls what shows up on nav bar. This method is passed down
			// to SignUp and SignIn components.
			this.setState({
				signedIn: true
			})
		}

	render() {
		var logout = <NavItem onClick={this.endSession}> Logout </NavItem>
		var profile = <NavItem href="#/profile">Profile</NavItem>
		return (
			<div>
				<Navbar bsStyle='inverse' pullLeft={true}>
					<Navbar.Header>
			      <Navbar.Brand>
			        <a href="#">Tourganic</a>
			      </Navbar.Brand>
			    </Navbar.Header>
					<Nav>
						 <NavItem href="#/search">Search</NavItem>

						{/*render different components on nav-bar depending on whether user sign-in or not*/}
	      		 { this.state.signedIn ? profile : null }
	      		 { this.state.signedIn ? null : <SignUp signIn={this.signIn}/> }
	      		 { this.state.signedIn ? null : <SignIn signIn={this.signIn}/> }
	      		 { this.state.signedIn ? logout : null }
					</Nav>
				</Navbar>
			</div>
		)
	}
}
