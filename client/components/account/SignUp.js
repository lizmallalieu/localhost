import React from 'react'
import $ from 'jquery'
import {Button, ButtonGroup, DropdownButton, MenuItem, Modal, NavItem} from 'react-bootstrap'


export default class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      show: false,
      showValidateEmailError: false,
      showAccountExistsError: false,
      showInvalidFieldsError: false
    }
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
	}

  // Uses regex to validate email entered
  validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

	handleSignUp() {
		var user = {
			username: this.refs.username.value,
			password: this.refs.password.value,
			email: this.refs.email.value
		};
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
    if (!this.validateEmail(this.refs.email.value)) {

      // Shows error message for 2 seconds, then removes it
      this.setState({showValidateEmailError: true}, function() {
        var setState = this.setState.bind(this);
        setTimeout(function() {
          setState({showValidateEmailError: false});
        }, 2000);
      });
      return;
    }

		$.post('/signup', {data: user})
			.done(data => {
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
  				window.location = '/#/profile';
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

  // Hides the modal window
	close() {
    this.setState({show: false});
  };

  // Shows the modal window
  show() {
    this.setState({
      show:true
    });
  };

	render() {
    var emailError = <div>Please enter valid email</div>;

    var accountExistsError = <div> Username Already Exists.</div>;
    var invalidFieldsError = <div> Please fill out all forms. </div>

		return (
		  <NavItem
          bsStyle='default'
          bsSize='small'
          onClick={this.show}
       >
        SignUp
        <div className='modal-container'>
      <Modal
        show={this.state.show}
        dialogClassName="custom-modal"
        onHide={this.close.bind(this)}
        container={this}
        aria-labelledby='contained-modal-title'
      >
          <Modal.Header className='grey' closeButton>
            <Modal.Title id="contained-modal-title">Sign Up Here</Modal.Title>
          </Modal.Header>
          <Modal.Body className='grey'>
						<form className="sign-">
					    <input ref="username" className="username" placeholder="username" type='text'/><br/>
					    <input ref="password" className="password" placeholder="password" type="password"/><br/>
					    <input ref="email" className="email" placeholder="email" type="text"/><br/>
					    <Button bsStyle='default' onClick={() => this.handleSignUp()}> Sign Up </Button>
              {this.state.showValidateEmailError ? emailError : null}
              {this.state.showAccountExistsError ? accountExistsError : null}
              {this.state.showInvalidFieldsError ? invalidFieldsError : null}
					  </form>
          </Modal.Body>
        </Modal>
      </div>
    </NavItem>
		)
	}
}