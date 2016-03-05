import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

/*--------------------*/
/*     COMPONENTS     */
/*--------------------*/

import Navigation from './Navigation'
import Profile from './profile/Profile'
import Search  from './search/Search'
import SignIn from './account/SignIn'
import SignUp from './account/SignUp'
import Welcome from './welcome/Welcome'
import Tour from './tour/Tour'
import TourForm from './profile/CreateTourForm'

/*-------------*/
/*     App     */
/*-------------*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      signUpModal: false,
      signInModal: false,
      signedIn: false,
      tourFormModal: false
    }
  };

  /* Adds newly created tour to database */
  submitNewTour(tourInfo) {
    $.post('/api/createTour', tourInfo)
    .done((data) => {
      this.setState({ userMadeTours: data.createdTours })
    })
    .fail((err) => {
      console.log('Could not save tour to database', err)
      throw new Error('Could not save tour to database', err)
    })
  }

  signIn = () => {
    // signedIn state controls what shows up on nav bar. This method is passed down
    // to SignUp and SignIn components.
    console.log('inside signIn');
    this.setState({
      signedIn: true
    })
    console.log('this.state.signedIn', this.state.signedIn);
    this.toggleModal('signInModal');
  }

  /* Pass this method down to children components so you can set the App state from nested dependencies. This method takes in a single state update object used to simply set properties in the state. Alternatively, you can pass in a specific key-value pair with the state passed in as null. This is useful for when you need to set a property in a deeply nested object in the state. */
  setAppState = (state, key, value) => {
    if (state) {
      this.setState(state);
    } else {
      var newState = this.state;
      newState[key] = value;
      this.setState(newState);
    }
  }

  toggleModal = (modal) => {
    var toggle = !this.state[modal];
    this.setAppState(null, modal, toggle);
  }

  createTour = (tourInfo) => {
    console.log("ABOUT TO MAKE tourInfo", tourInfo);
    $.post('/api/tours', tourInfo)
    .done((data) => {
      this.setState({
        userMadeTours: data.createdTours
      })
    })
    .fail((err) => {
      console.log('Could not save tour to database', err)
      throw new Error('Could not save tour to database', err)
    })
  }

  render() {
    var Children = React.cloneElement(this.props.children, {
      status: this.state,
      fx: {
        submitNewTour: this.submitNewTour,
        setAppState: this.setAppState,
        toggleModal: this.toggleModal,
        createTour: this.createTour
      }
    });

    return (
      <div>
        <Navigation
          {...this.state}
          state={this.state}
          setAppState={this.setAppState}
          toggleModal={this.toggleModal}
          signIn={this.signIn}
        />
        <TourForm
         {...this.state}
         setAppState={this.setAppState}
         toggleModal={this.toggleModal}
         createTour={this.createTour}
        />
        <SignIn
          {...this.state}
          setAppState={this.setAppState}
          toggleModal={this.toggleModal}
          signIn={this.signIn}
        />
        <SignUp
          {...this.state}
          setAppState={this.setAppState}
          toggleModal={this.toggleModal}
          signIn={this.signIn}
        />
        {Children}
      </div>
    )
  }
}

/*------------------*/
/*     HANDLERS     */
/*------------------*/

class WelcomeHandler extends React.Component {
  render() { return (
    <Welcome
      {...this.props.status}
      {...this.props.fx}
    />
  )}
}

class ProfileHandler extends React.Component {
  render() { return (
    <Profile
      {...this.props.status}
      {...this.props.fx}
    />
  )}
}

class TourHandler extends React.Component {
  render() { return (
    <Tour
      {...this.props.status}
      {...this.props.fx}
    />
  )}
}

class SearchHandler extends React.Component {
  render() { return (
    <Search
      {...this.props.status}
      {...this.props.fx}
    />
  )}
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={WelcomeHandler}/>
      <Route path='/welcome' component={WelcomeHandler}/>
      <Route path='/profile' component={ProfileHandler}/>
      <Route path='/profile/:id' component={TourHandler}/>
      <Route path="/search" component={SearchHandler}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
