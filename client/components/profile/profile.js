import React from 'react'
import AboutMe from './About'
import CreatedToursList from './CreatedToursList'
import $ from 'jquery'
import {Link} from 'react-router'
import CreateTourForm from './CreateTourForm'
import Tour from '../tour/Tour'

import {GridList, GridTile, Card, CardTitle, CardText, CardMedia, Tabs, Tab} from 'material-ui';

export default class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        showProfile: false,
        toggleTourList: 'createdTours',
        user: '',
        aboutMe: '',
        userMadeTours: [],
        showCreateForm: false,
        currentTour: {name: 'default', location: 'default', price:'1', date:'1/1/1'
      },
      showTourModal: false,
      attendingTours: [],
      createdToursBackground: '#C0C0C0',
      attendingToursBackground: '#D8D8D8'
    }
  }

  // Fetches user info from DB before rendering so profiles renders with correct information
  componentWillMount() {
    $.get('/api/profile')
    .done((data) => {
      // if no session, restrict function will return {isAuth: false} in data
      // if this is true, we want to redirect to signin page
      if (data.isAuth === false) {
        window.location = '/#/welcome'
      } else {
        this.setState({
          showProfile: true,
          user : data.username,
          aboutMe : data.aboutMe,
          userMadeTours : data.createdTours,
          attendingTours: data.attendingTours
        })
      }
    })
    .fail((err) => {
      console.log('Could not get profile data from server', err)
      throw new Error('Could not get profile data from server', err)
    })
  }

  // Adds newly created tour to DB
  submitNewTour(tourInfo) {
    $.post('/api/createTour', tourInfo)
    .done( (data) => {
      this.setState({
        userMadeTours: data.createdTours
      })
    })
    .fail((err) => {
      console.log('Could not save tour to database', err)
      throw new Error('Could not save tour to database', err)
    })
  }

  // Fetches specified tour info from DB so modal Tour window displays proper data
  getTourInfo(tour) {
    this.setState({
      currentTour: tour,
      showTourModal: true
    })
  }

  // Hides the Tour modal window
  closeTourModal() {
    this.setState({ showTourModal:false });
  }

  render() {
    //depending on whether toggleTourList is createdTours or attendingTours,
    //change the value of tourIds passed into createDTourListProps

    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: 150,
        height: 2000,
        overflowY: 'auto',
        marginBottom: 24,
      },
    };

    var tourList;
    if (this.state.toggleTourList === 'createdTours') {
      tourList = this.state.userMadeTours;
    } else {
      tourList = this.state.attendingTours;
    }
    var createdTourListProps = {tourIds: tourList, getTourInfo: this.getTourInfo.bind(this)}
    var TourModalProps = {page: 'profile', currentTour: this.state.currentTour, closeTourModal: this.closeTourModal.bind(this), show: this.state.showTourModal}

    var profilePage = (
      <div className="UserInfoColumn" styles={styles.root}>
        <GridList 
          styles={styles.gridList}
          cellHeight={2000}
        >
          <GridTile
          >
            <AboutMe user={this.state.user} aboutMe={this.state.aboutMe}/>
          </GridTile>
        </GridList>
      </div>

      <div className="TourList" styles={styles.root}>
        <GridList 
          styles={styles.gridList}
          cellHeight={150}
        >
          <GridTile
          >
            <AboutMe user={this.state.user} aboutMe={this.state.aboutMe}/>
          </GridTile>
        </GridList>
      </div>
    );

    return (
      // ComponentWillMount will change showProfile to true once that async call is complete. Before that happens,
      // showProfile will be false. This prevents people from viewing the profile page before they log in (in fact,
      // without this check, they see a ~0.5 second flash of the page because it renders before the ajax call is done )
      this.state.showProfile ? profilePage : null
    )
  };





}
