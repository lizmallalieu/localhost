import react from 'react'
import stripe from 'stripe'

export default class StripeForm extends React.Component {
  constructor(props) {
    super(props)
  }



  render() {
    return (
      <div>
        <div id="stripe-form">
          <form action="/api/payment" method="POST" id="payment-form">
            <div class="form-row">
              <div class="cc-text">Card Number</div>
              <input type="text" size="30" autocomplete="off" class="card-number"/>
            </div>
            <div class="form-row">
              <div class="cc-text">CVC</div>
              <input type="text" size="4" autocomplete="off" class="card-cvc"/>
            </div>
            <div class="form-row">
              <div class="cc-text">Expiration (MM/YYYY)</div>
              <input type="text" size="2" class="card-expiry-month"/>
              <span> / </span>
              <input type="text" size="4" class="card-expiry-year"/>
            </div>
            <input type="hidden" name="amount" value="2000" id="cc-amount"/>
            <button type="submit" class="submit-button">Submit Payment</button>
          </form>
        </div>
        <div id="error" class="hidden"></div>
        <div id="success" class="hidden">Thanks for signing up at localhost!</div>
      </div>
    )
  }
}