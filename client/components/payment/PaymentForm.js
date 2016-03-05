import React from 'react'
import $ from 'jquery'
import _ from 'underscore'

import ActionAndroid from 'material-ui/lib/svg-icons/action/android'
import AutoComplete from 'material-ui/lib/auto-complete'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
import GridList from 'material-ui/lib/grid-list/grid-list'
import GridTile from 'material-ui/lib/grid-list/grid-tile'
import MenuItem from 'material-ui/lib/menus/menu-item'
import RaisedButton from 'material-ui/lib/raised-button'
import Slider from 'material-ui/lib/slider'
import SvgIcon from 'material-ui/lib/svg-icon'
import TextField from 'material-ui/lib/text-field'
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
/*       PaymentForm      */
/* ---------------------- */

export default class PaymentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      tab: 'tour',
      validForm: true,
      paymentForm: {
        fullName: '',
        streetAddress1: '',
        streetAddress2: '',
        cardNumber: '',
        expiration: '',
        cvc: '',
        mastercard: false,
        visa: false,
        amex: false
      }
    }
  };

  updateForm = (field, update) => {
    var form = this.state.paymentForm;
    form[field] = update;
    this.setState({ paymentForm: form });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    var payment = this.state.paymentForm;
  }

  render() {
    const actions = {
      form: [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={evt => this.props.toggleModal('paymentFormModal')}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleSubmit}
        disabled={!this.state.validForm}
        onTouchTap={evt => this.props.toggleModal('paymentFormModal')}
      /> ],
    };

    return (
      <div className="PaymentContainer">
        <RaisedButton
          label="Pay for tour"
          onTouchTap={evt => this.props.toggleModal('paymentFormModal')}
        />

        <Dialog
          title="Make a payment"
          actions={actions.form}
          modal={true}
          open={this.props.paymentFormModal}
          contentStyle={styles.modal}
        >
          <GridList
            cols={6}
            padding={5}
            cellHeight={1}
            style={styles.grid}
          >
            <GridTile cols={6} rows={72}>
              <img src="http://www.libertyint.com/LibertyInternationalFinal/paymentoptions.center.png"/>
            </GridTile>
            <GridTile cols={6} rows={72}>
              <TextField
                hintText="i.e., John Smith"
                floatingLabelText="Full Name"
                fullWidth={true}
                onChange={(e) => this.updateForm('fullName', e.target.value)}
              />
            </GridTile>
            <GridTile cols={5} rows={72}>
              <TextField
                hintText="i.e., 123 Fake St"
                floatingLabelText="Street Address1"
                fullWidth={true}
                onChange={(e) => this.updateForm('streetAddress1', e.target.value)}
              />
            </GridTile>
            <GridTile cols={1} rows={72}>
              <TextField
                floatingLabelText="Apt#"
                fullWidth={true}
                onChange={(e) => this.updateForm('streetAddress2', e.target.value)}
              />
            </GridTile>
            <GridTile cols={6} rows={72}>
              <TextField
              hintText="i.e., 4242424242424242"
                floatingLabelText="Credit Card Number"
                fullWidth={true}
                multiLine={true}
                onChange={(e) => this.updateForm('cardNumber', e.target.value)}
              />
            </GridTile>
            <GridTile cols={3} rows={72}>
              <TextField
                hintText="i.e., MM/YYYY"
                floatingLabelText="Expiration Date"
                fullWidth={true}
                multiLine={true}
                onChange={(e) => this.updateForm('expiration', e.target.value)}
              />
            </GridTile>
            <GridTile cols={3} rows={72}>
              <TextField
                hintText="i.e., 888"
                floatingLabelText="CVC"
                fullWidth={true}
                multiLine={true}
                onChange={(e) => this.updateForm('cvc', e.target.value)}
              />
            </GridTile>
            <GridTile cols={2} rows={72}>
              <div style={styles.block}>
                <Toggle
                  label="Mastercard"
                  labelPosition="right"
                  style={styles.pad}
                  // onToggle={(e, toggle) => this.updateForm('mastercard', toggle)}
                />
              </div>
            </GridTile>
            <GridTile cols={1.5} rows={72}>
              <div style={styles.block}>
                <Toggle
                  label="Visa"
                  labelPosition="right"
                  style={styles.pad}
                  // onToggle={(e, toggle) => this.updateForm('visa', toggle)}
                />
              </div>
            </GridTile>
            <GridTile cols={2.5} rows={72}>
              <div style={styles.block}>
                <Toggle
                  label="American Express"
                  labelPosition="right"
                  style={styles.pad}
                  // onToggle={(e, toggle) => this.updateForm('amex', toggle)}
                />
              </div>
            </GridTile>
          </GridList>
        </Dialog>
      </div>
    )
  }
}
