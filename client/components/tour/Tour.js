import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import {Button, Modal} from 'react-bootstrap'
import PaymentForm from '../payment/PaymentForm'

export default class Tour extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: true,
      show: false,
      showCannotJoinOwnTourError: false,
      showAlreadyJoinedTourError: false,
      isJoined: false
    }
  }


  // Add tour ID to user's attendingTours array if user is logged in
  handleJoinTourClick() {
    $.post('/api/joinTour', {data: this.props.currentTour._id})

      .done((data) => {
        // If the user is not authenticated, then show an error message that disappears after 
        // 2 seconds
        console.log(data);
        if (data.isAuth === false) {
          this.setState({
            isLoggedIn: false
          })
          var setState = this.setState.bind(this);
          setTimeout(function(){
            setState({
              isLoggedIn: true
            })
          }, 3000);
        } else if (data === 'You cannot join your own tour.') {
        // If you join your own tour, show an error message notifying user, disappears in 2 seconds
          this.setState({
            showCannotJoinOwnTourError: true
          }, function() {
            setState = this.setState.bind(this);
            setTimeout(function(){
              setState({ showCannotJoinOwnTourError: false })
            }, 2000); 
          });
        } else if (data === 'You have already joined this tour.') {
          this.setState({
            showAlreadyJoinedTourError: true
          }, function() {
            setState = this.setState.bind(this);
            setTimeout(function() {
              setState({ showAlreadyJoinedTourError: false })
            }, 2000);
          });
        } else {
          // show/hide state is controlled in profile or search. closeTourModal changes the state,
          // then it inherits the state from profile or search through props.
          console.log("Successfully joined");
          this.setState({
            isJoined: true
          })
        }
      })
      .fail((err) => {
        console.log('There was an error joining attempting to join this tour');
      })
  }

  render() {
    console.log('TOUR PROPS', this.props);
    // Different error messages are defined here
    var loginReminder = <div style={{marginTop: '5px'}}> Please sign in first.</div>
    var cannotJoinOwnTourError = <div style={{marginTop: '5px'}}> You cannot join your own tour. </div>
    var joinedTour= <div style={{marginTop: '5px'}}> Successfully joined the tour! </div>

    return (
      <div className='createTourForm'>
        <Modal
          show={this.props.show}
          dialogClassName="custom-modal"
          onHide={this.props.closeTourModal}
          container={this}
          aria-labelledby='contained-modal-title'
        >
          <Modal.Header className='grey' closeButton>
            <Modal.Title>{this.props.currentTour.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body className='grey' id='tourModal'>
            <div>Address: {this.props.currentTour.streetAddress}</div>
            <div>City: {this.props.currentTour.city}</div>
            <div>State: {this.props.currentTour.state}</div>
            <div>Price: ${this.props.currentTour.price}</div>
            <div>Date: {this.props.currentTour.date.substring(5, 10) + '-' + this.props.currentTour.date.substring(0, 4)}</div>
            <div>Description: {this.props.currentTour.description}</div>
            <div>The Host: {this.props.currentTour.createdBy}</div>
            {/* hide the 'Join Tour' button, if it's the profile page */}
            {this.props.page === 'search' ?
            <Button
              bsStyle='default'
              bsSize='small'
              onClick={ () => this.handleJoinTourClick() }
            >
            </Button>
            : null }
            <PaymentForm toggleModal={this.props.toggleModal}/>
            {/*Error messages are loaded here conditionally*/}
            {this.state.isLoggedIn ? null : loginReminder}
            {this.state.isJoined ? joinedTour : null}
            {this.state.showCannotJoinOwnTourError ? cannotJoinOwnTourError: null}
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}