import React from 'react'
// import {Button, Modal} from 'react-bootstrap'

import AutoComplete from 'material-ui/lib/auto-complete'
import DatePicker from 'material-ui/lib/date-picker/date-picker'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
import GridList from 'material-ui/lib/grid-list/grid-list'
import GridTile from 'material-ui/lib/grid-list/grid-tile'
import MenuItem from 'material-ui/lib/menus/menu-item'
import RaisedButton from 'material-ui/lib/raised-button'
import Slider from 'material-ui/lib/slider'
import TextField from 'material-ui/lib/text-field'
import TimePicker from 'material-ui/lib/time-picker/time-picker'
import Toggle from 'material-ui/lib/toggle'

export default class CreateTourForm extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      show: false,
      // validForm: true,
      // venues: [
      //   {
      //     text: 'text-value1',
      //     value: (
      //       <MenuItem
      //         primaryText="Tempest"
      //         secondaryText="1200 Market Street"
      //       />
      //     ),
      //   },
      //   {
      //     text: 'text-value2',
      //     value: (
      //       <MenuItem
      //         primaryText="text-value2"
      //         secondaryText="&#9786;"
      //       />
      //     ),
      //   },
      // ]
    }
  };

  // Sets state as input is entered
  handleChange = (prop, e) => {
    var newState = {};
    newState[prop] = e.target.value;
    this.setState(newState);
  };

  // Clears input when box is clicked
  reset = (prop, e) => {
    var newState = {};
    newState[prop] = '';
    this.setState(newState);
  };

  // Hides the modal window
  close = () => {
    this.setState({ show: false });
  };

  // Shows the modal window
  show = () => {
    this.setState({ show: true });
  };

  // Closes the modal, and also submits the tour
  handleTourSubmission = () => {
    this.close.bind(this)();
    this.props.submitNewTour.bind(null, this.state)();
  }

  render() {
    const actions = {
      form: [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.close}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={this.state.validForm}
        onTouchTap={this.close}
      /> ],
      datetime: [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.close}
      /> ]
    };

    const styles = {
      modal: {
        width: '50%',
        minWidth: '300px',
        maxWidth: '500px'
      },
      block: {
        maxWidth: '250px',
        marginTop: '25px'
      },
      half: {
        width: '48%',
        display: 'inline'
      },
      full: {
        width: '50%'
      },
      pad: {
        paddingLeft: '10px'
      },
      slide: {
        paddingLeft: '15px',
        paddingRight: '15px'
      }
    };

    return (
      <div className="createTourContainer">
        {/*<Button
          bsStyle='default'
          bsSize='small'
          onClick={() => {this.show()}}
        >
        Create a Tour
        </Button>*/}
        <RaisedButton
          label="Modal Dialog"
          onTouchTap={this.show}
        />

        <Dialog
          title="Create a Tour"
          actions={actions.form}
          modal={true}
          open={this.state.show}
          contentStyle={styles.modal}
        >
          <GridList
            cols={6}
            padding={5}
            cellHeight={1}
            style={styles.gridList}
          >
            <GridTile cols={6} rows={72}>
              <img src="http://www.material-ui.com/images/grid-list/vegetables-790022_640.jpg"/>
            </GridTile>
            <GridTile cols={6} rows={72}>
              <TextField
                hintText="i.e., Napa Wine Tour"
                floatingLabelText="Tour Name"
                fullWidth={true}
              />
            </GridTile>
            <GridTile cols={6} rows={72}>
              <TextField
                floatingLabelText="Description"
                fullWidth={true}
                multiLine={true}
              />
            </GridTile>
            <GridTile cols={3} rows={72}>
              <DatePicker
                hintText="Date"
              />
            </GridTile>
            <GridTile cols={3} rows={72}>
              <TimePicker
                id="timepicker"
                hintText="Time"
              />
            </GridTile>
            <GridTile cols={6} rows={72}>
              <Slider
              description="Budget"
              style={styles.slide}
              />
            </GridTile>
            <GridTile cols={2} rows={72}>
              <div style={styles.block}>
                <Toggle
                  label="Phone"
                  labelPosition="right"
                  style={styles.pad}
                />
              </div>
            </GridTile>
            <GridTile cols={2} rows={72}>
              <div style={styles.block}>
                <Toggle
                  label="Twitter"
                  labelPosition="right"
                  style={styles.pad}
                />
              </div>
            </GridTile>
          </GridList>
          {/*<AutoComplete
            floatingLabelText="showAllItems"
            filter={AutoComplete.noFilter}
            openOnFocus={true}
            dataSource={this.state.venues}
          />*/}
        </Dialog>
        {/*<Modal
          show={false}
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
        </Modal>*/}
      </div>
    )
  }
}
