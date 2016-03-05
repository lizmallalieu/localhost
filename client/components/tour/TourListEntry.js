import React from 'react'
import $ from 'jquery'

import {Card, CardTitle, CardText, CardMedia, Checkbox, RadioButton, CardActions} from 'material-ui';
import ActionFavorite from 'material-ui/lib/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/lib/svg-icons/action/favorite-border';

export default class CreatedToursListEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: "",
      name: "",
      city: "",
      date: "",
      price: "",
      photo: "",
      ratings: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false
      }
    };
  }

  rateTours = (value, evt, rando) => {
    console.log("Value : ", value);
    if(this.state.ratings[value] === true){
      console.log("UNCLICKED")
      for(var i = 1; i <=5 ; i++){
        this.state.ratings[i] = false;
      }
    } else {
      for(var j = 1; j<value+1 ; j++){
        this.state.ratings[j] = true;
      }
    }
    this.setState(this.state.ratings)
    console.log("Ratings: ", this.state.ratings);
  }

  // Fetches tour info from DB before rendering so component renders with correct information
  componentDidMount () {
    $.post('/api/fetchTourInfo', {data: this.props.tourId})
    .done( (data) => {
      var date = data.date.substring(0,10);
      this.setState({
        data: data,
        name : data.name,
        city : data.city,
        date : date,
        price : data.price,
        photo: data.photo,
      });
      console.log('this state', this.state);
    })
    .fail( (err) => {
      console.log('error getProfile', err);
    });
  }



  render() {
    var styles = {
      card: {
        'height': '250px',
        'backgroundImage': `url("${this.state.photo}")`,
        'backgroundSize': 'cover',
        'backgroundPosition': 'center 50%',
        'backgroundRepeat': 'no-repeat'
      },
      checkbox: {
        display: 'flex',
        width: '35px'
      },
      inline: {
        display: 'flex',
        flexDirection:'row'
      }
    }

    return (
      <div>
        <Card>
          <CardMedia
            overlay={<CardTitle title={this.state.name} subtitle={this.state.city + ' · $' + this.state.price} />}>
            <div style={styles.card}>
             </div>
          </CardMedia>
          <CardActions>
            <div style={styles.inline}>
               <Checkbox
                 checkedIcon={<ActionFavorite />}
                 target="1"
                 uncheckedIcon={<ActionFavoriteBorder />}
                 checked = {this.state.ratings[1]}
                 style={styles.checkbox}
                 onChange={() => this.rateTours(1)}
               />
               <Checkbox
                 checkedIcon={<ActionFavorite />}
                 target="2"
                 uncheckedIcon={<ActionFavoriteBorder />}
                 checked = {this.state.ratings[2]}
                 style={styles.checkbox}
                 onCheck={() => this.rateTours(2)}
               />
               <Checkbox
                 checkedIcon={<ActionFavorite />}
                 target="3"
                 uncheckedIcon={<ActionFavoriteBorder />}
                 checked = {this.state.ratings[3]}
                 style={styles.checkbox}
                onCheck={() => this.rateTours(3)}
               />
               <Checkbox
                 checkedIcon={<ActionFavorite />}
                 target="4"
                 uncheckedIcon={<ActionFavoriteBorder />}
                 checked = {this.state.ratings[4]}
                 style={styles.checkbox}
                 onCheck={() => this.rateTours(4)}
               />
               <Checkbox
                 checkedIcon={<ActionFavorite />}
                 target="5"
                 uncheckedIcon={<ActionFavoriteBorder />}
                 checked = {this.state.ratings[5]}
                 style={styles.checkbox}
                 onCheck={() => this.rateTours(5)}
               />
           </div>

          </CardActions>
        </Card>
      </div>
    )
  }
}
