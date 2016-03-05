import React from 'react'
import $ from 'jquery'
import _ from 'underscore'

import ActionAndroid from 'material-ui/lib/svg-icons/action/android'
import AutoComplete from 'material-ui/lib/auto-complete'
import DatePicker from 'material-ui/lib/date-picker/date-picker'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
import GridList from 'material-ui/lib/grid-list/grid-list'
import GridTile from 'material-ui/lib/grid-list/grid-tile'
import MenuItem from 'material-ui/lib/menus/menu-item'
import RaisedButton from 'material-ui/lib/raised-button'
import Slider from 'material-ui/lib/slider'
import SvgIcon from 'material-ui/lib/svg-icon'
import TextField from 'material-ui/lib/text-field'
import Tab from 'material-ui/lib/tabs/tab'
import Tabs from 'material-ui/lib/tabs/tabs'
import TimePicker from 'material-ui/lib/time-picker/time-picker'
import Toggle from 'material-ui/lib/toggle'

/* -------------- */
/*     STYLES     */
/* -------------- */

const styles = {
  block: {
    maxWidth: '250px',
    marginTop: '25px'
  },
  grid: {
    marginTop: '15px',
  },
  head: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
  list: {
    fontSize: '0.7em'
  },
  menu: {
    maxHeight: '40vh',
    overflow: 'hidden',
    overflowY: 'scroll'
  },
  modal: {
    width: '60%',
    minWidth: '300px',
    maxWidth: '600px',
    position: 'absolute',
    transform: 'translate3d(-50%, -50%, 0)',
    top: '50%',
    left: '50%'
  },
  pad: {
    paddingLeft: '10px'
  },
  slide: {
    paddingLeft: '15px',
    paddingRight: '15px'
  }
};

/* ---------------------- */
/*     CreateTourForm     */
/* ---------------------- */

export default class CreateTourForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      tab: 'tour',
      validForm: true,
      tourForm: {
        title: '',
        description: '',
        date: {},
        time: {},
        price: 0,
        addPhone: false,
        addTwitter: false
      },
      search: [{
        text: '[Search Foursquare]',
        value: (
          <MenuItem
            secondaryText="Powered by Foursquare"
            onClick={this.fetchPlace}
          >
            <FlatButton
              label="Find more Places..."
              labelPosition="after"
              primary={true}
              style={styles.button}
              hoverColor={'transparent'}
              icon={<SvgIcon><path d="M14.9 3.6L14.4 6.5C14.3 6.8 13.9 7.2 13.5 7.2L8.3 7.2C7.8 7.2 7.3 7.6 7.3 8.2L7.3 8.8C7.3 9.4 7.8 9.8 8.3 9.8L12.8 9.8C13.2 9.8 13.6 10.2 13.5 10.7 13.4 11.1 13 13.3 12.9 13.6 12.9 13.8 12.6 14.2 12.1 14.2L8.5 14.2C7.9 14.2 7.7 14.3 7.2 14.8 6.8 15.4 2.8 20.1 2.8 20.1 2.8 20.2 2.8 20.1 2.8 20.1L2.8 3.6C2.8 3.2 3.1 2.8 3.6 2.8L14.3 2.8C14.7 2.8 15 3.1 14.9 3.6L14.9 3.6ZM15.4 15C15.5 14.4 17.2 5.9 17.8 3.2L15.4 15ZM15.7 0L2.4 0C0.5 0 0 1.4 0 2.3L0 23.4C0 24.4 0.5 24.8 0.8 24.9 1.1 25 1.9 25.1 2.4 24.6 2.4 24.6 8.7 17.3 8.8 17.1 9 17 9 17 9.2 17L13.2 17C14.9 17 15.2 15.8 15.4 15 15.5 14.4 17.2 5.9 17.8 3.2 18.2 1.1 17.7 0 15.7 0L15.7 0Z" fill="#F94877"/></SvgIcon>}
              onClick={this.fetchPlace}
            />
          </MenuItem>
        ),
      }]
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
  }

  // Clears input when box is clicked
  reset = (prop, e) => {
    var newState = {};
    newState[prop] = '';
    this.setState(newState);
  }

  // Hides the modal window
  close = () => {
    this.setState({ show: false });
  }

  // // Shows the modal window
  // toggleModal = (modal) => {
  //   var toggle = !this.props[modal];
  //   this.props.setAppState(null, modal, toggle);
  // }

  changeTab = (e) => {
    this.setState({ tab: e.props.value });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    var tour = this.state.tourForm;
    tour.userId = this.props.user.uid;
    console.log('look at me i am tour:', tour)
    this.props.createTour(tour);
  }

  mapSearchResults = (venues) => {
    var addSearchResult = this.addSearchResult;
    _.map(venues, (venue, key) => {
      if (key <= 15) {
        $.get('/api/venues', {venueId: venue.id})
        .done((venue) => {
          if (venue) {
            addSearchResult(venue)
          } else {
            console.error('Did not get venue back from database')
          }
        }).fail((err) => {
          console.error('Could not get venue data from database', err)
          throw new Error('Could not get venue data from database', err)
        });
      }
    });
  }

  addSearchResult = (venue) => {
    var newSearch = this.state.search;
    newSearch.splice(newSearch.length - 2, 0, venue);
    this.setState({search: newSearch});
  }

  searchPlace = (query) => {
    if (query.length > 3) {
      var button = this.state.search[this.state.search.length - 1];
      button.text = query;
      $.get('/api/venues/search-all', {search: query})
      .done(venues => {
        var results = _.map(venues, venue => {
          return {
            text: venue.name,
            value: (
              <MenuItem
                primaryText={venue.name}
                secondaryText={venue.address}
                venueId={venue.id}
              />
            ),
          }
        });
        results.push(button);
        this.setState({search: results});
      })
      .fail(err => {
        console.error('Could not search database for venues', err);
        throw new Error('Could not search database for venues', err);
      });
    }
  }

  fetchPlace = (query, index) => {
    if (query.dispatchMarker || index === this.state.search.length - 1 || index < 0) {
      var button = this.state.search[this.state.search.length - 1];
      button.text = query;

      var mapSearchResults = this.mapSearchResults;
      $.get('/api/venues/search-new', {search: query})
      .done(venues => {
        mapSearchResults(venues);
        console.log('FETCHED VENUES!', venues);
      })
      .fail(err => {
        console.error('Could not search Foursquare for venues', err);
        throw new Error('Could not search Foursquare for venues', err);
      });
    } else {
      console.log('[SAVING]','query:', query,'index:',index)
    }
  }

  // Closes the modal, and also submits the tour
  // handleTourSubmission = () => {
  //   this.close.bind(this)();
  //   this.props.createTour.bind(null, this.state)();
  // }

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
        onTouchTap={evt => this.props.toggleModal('tourFormModal')}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleSubmit}
        disabled={!this.state.validForm}
        onTouchTap={evt => this.props.toggleModal('tourFormModal')}
      /> ],
      datetime: [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={evt => this.props.toggleModal('tourFormModal')}
      /> ]
    };

    return (
      <div className="createTourContainer">
        <RaisedButton
          label="Modal Dialog"
          onTouchTap={evt => this.props.toggleModal('tourFormModal')}
        />

        <Dialog
          title={`Create a ${this.state.tab}`}
          actions={actions.form}
          modal={true}
          open={this.props.tourFormModal}
          contentStyle={styles.modal}
        >
          <Tabs>
            <Tab label="Tour" value="tour" onActive={this.changeTab}>
              <GridList
                cols={6}
                padding={5}
                cellHeight={1}
                style={styles.grid}
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
            </Tab>
            <Tab label="Stops" value="stop" onActive={this.changeTab}>
              <div>
                <AutoComplete
                  floatingLabelText="Find a location"
                  filter={AutoComplete.noFilter}
                  fullWidth={true}
                  openOnFocus={true}
                  menuStyle={styles.menu}
                  listStyle={styles.list}
                  dataSource={this.state.search}
                  onNewRequest={this.fetchPlace}
                  onUpdateInput={this.searchPlace}
                />
              </div>
            </Tab>
          </Tabs>
        </Dialog>
      </div>
    )
  }
}
