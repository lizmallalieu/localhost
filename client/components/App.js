import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import Navigation from './Navigation'
import Profile from './profile/Profile'
import Search  from './search/Search'
import SignIn from './account/SignIn'
import SignUp from './account/SignUp'
import Welcome from './welcome/Welcome'
import Tour from './tour/Tour'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<div>
				<Navigation />
				{this.props.children}
			</div>
		)
	}
}


render((
	// React Router allows user to access different pages, depending how
	// the window location is set.
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Welcome} />
			<Route path='/welcome' component={Welcome} />
		  <Route path='/profile' component={Profile} />
		  <Route path='/profile/:id' component={Tour} />
		{/*deleted the route for signup and signin */}
		  <Route path="/search" component={Search} />
		</Route>
	</Router>
), document.getElementById('app'));

