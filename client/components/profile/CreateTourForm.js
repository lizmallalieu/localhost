import React from 'react'

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
      validForm: true,
      tourForm: {
        title: '',
        description: '',
        date: {},
        time: {},
        price: 0,
        addPhone: false,
        addTwitter: false
      }
    }
  };

  updateForm = (field, update) => {
    var form = this.state.tourForm;
    form[field] = update;
    this.setState({ tourForm: form });
  }

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

  dateFormat = (date) => {
    var w = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
    var m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
    var d = date.getDate();
    var y = date.getFullYear();

    return `${w} ${d} ${m} ${y}`;
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
                onChange={(e) => this.updateForm('title', e.target.value)}
              />
            </GridTile>
            <GridTile cols={6} rows={72}>
              <TextField
                floatingLabelText="Description"
                fullWidth={true}
                multiLine={true}
                onChange={(e) => this.updateForm('description', e.target.value)}
              />
            </GridTile>
            <GridTile cols={3} rows={72}>
              <DatePicker
                hintText="Date"
                formatDate={this.dateFormat}
                onChange={(e, date) => this.updateForm('date', date)}
              />
            </GridTile>
            <GridTile cols={3} rows={72}>
              <TimePicker
                ref="timepicker"
                hintText="Time"
                pedantic={true}
                value={this.state.tourForm.time}
                onChange={(e, time) => this.updateForm('time', time)}
              />
            </GridTile>
            <GridTile cols={6} rows={72}>
              <Slider
                description={`Price${this.state.tourForm.price ?
                  ': $' + this.state.tourForm.price :
                  ': Free'}`}
                style={styles.slide}
                onChange={(e, step) => this.updateForm('price', step * 500)}
              />
            </GridTile>
            <GridTile cols={2} rows={72}>
              <div style={styles.block}>
                <Toggle
                  label="Phone"
                  labelPosition="right"
                  style={styles.pad}
                  onToggle={(e, toggle) => this.updateForm('addPhone', toggle)}
                />
              </div>
            </GridTile>
            <GridTile cols={2} rows={72}>
              <div style={styles.block}>
                <Toggle
                  label="Twitter"
                  labelPosition="right"
                  style={styles.pad}
                  onToggle={(e, toggle) => this.updateForm('addTwitter', toggle)}
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
      </div>
    )
  }
}
