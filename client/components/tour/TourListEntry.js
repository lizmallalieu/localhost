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
      rating: null
    };
  }

  handleRatingClick(){
    console.log("Clicked!")
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
                 uncheckedIcon={<ActionFavoriteBorder />}
                 style={styles.checkbox}
                 onCheck={this.rateTours}
               />
               <Checkbox
                 checkedIcon={<ActionFavorite />}
                 uncheckedIcon={<ActionFavoriteBorder />}
                 style={styles.checkbox}
                  onCheck={this.rateTours}
               />
               <Checkbox
                 checkedIcon={<ActionFavorite />}
                 uncheckedIcon={<ActionFavoriteBorder />}
                 style={styles.checkbox}
                onCheck={this.rateTours}
               />
               <Checkbox
                 checkedIcon={<ActionFavorite />}
                 uncheckedIcon={<ActionFavoriteBorder />}
                 style={styles.checkbox}
                  onCheck={this.rateTours}
               />
               <Checkbox
                 checkedIcon={<ActionFavorite />}
                 uncheckedIcon={<ActionFavoriteBorder />}
                 style={styles.checkbox}
                  onCheck={this.rateTours}
               />
           </div>

          </CardActions>
        </Card>
      </div>
    )
  }
}
