import react from 'react'
import StripeCheckout from 'react-stripe-checkout'

export default class StripeForm extends React.Component {
  constructor(props) {
    super(props)
  }

  onToken(token) {
    xhrStripeTokenToMyServer(token).then( => {

    });
  }

  render() {
    return (
      <StripeCheckout
        token={this.onToken}
        stripeKey={process.env.API_STK_CLIENT}
      />

    )
  }

}

