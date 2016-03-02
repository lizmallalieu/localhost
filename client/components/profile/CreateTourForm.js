import React from 'react'
import {Button, Modal} from 'react-bootstrap'

export default class CreateTourForm extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      show: false
    }
  };

  // Sets state as input is entered
  handleChange(prop, e) {
    var newState = {};
    newState[prop] = e.target.value;
    this.setState(newState);
  };

  // Clears input when box is clicked
  reset(prop, e) {
    var newState = {};
    newState[prop] = '';
    this.setState(newState);
  };

  // Hides the modal window
  close() {
    this.setState({show:false});
  };

  // Shows the modal window
  show() {
    this.setState({
      show:true
    });
  };

  // Closes the modal, and also submits the tour
  handleTourSubmission() {
    this.close.bind(this)();
    this.props.submitNewTour.bind(null, this.state)();
  }

  render() {
    return (
      <div className='createTourContainer'>
        <Button
          bsStyle='default'
          bsSize='small'
          onClick={()=>{this.show()}}
        >
        Create a Tour
        </Button>
        <Modal
          show={this.state.show}
          dialogClassName="custom-modal"
          onHide={this.close.bind(this)}
          container={this}
          aria-labelledby='contained-modal-title'
        >
          <Modal.Header className='grey' closeButton>
            <Modal.Title>Create a Tour</Modal.Title>
          </Modal.Header>
          <Modal.Body className='grey'>
            <div>
              <form className='createTourForm'>
                <input value={this.state.name} onChange={this.handleChange.bind(this, 'name')} placeholder='name' onClick={this.reset.bind(this, 'name')}/><br/>
                <input value={this.state.streetAddress} onChange={this.handleChange.bind(this, 'streetAddress')} placeholder='street address' onClick={this.reset.bind(this, 'streetAddress')}/><br/>
                <input value={this.state.city} onChange={this.handleChange.bind(this, 'city')} placeholder='city' onClick={this.reset.bind(this, 'city')}/><br/>
                <input value={this.state.state} onChange={this.handleChange.bind(this, 'state')} placeholder='state' onClick={this.reset.bind(this, 'state')}/><br/>
                <input type='number' value={this.state.price} onChange={this.handleChange.bind(this, 'price')} placeholder='price' onClick={this.reset.bind(this, 'price')}/><br/>
                <input value={this.state.date} onChange={this.handleChange.bind(this, 'date')} placeholder='date' onClick={this.reset.bind(this, 'date')}/><br/>
                <textarea value={this.state.description} onChange={this.handleChange.bind(this, 'description')} placeholder='description' onClick={this.reset.bind(this, 'description')}/><br/>
                <Button onClick={ ()=>{this.handleTourSubmission()} } bsStyle='default' bsSize='small'>
                  Create Tour
                </Button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
