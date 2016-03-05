var stripe = require('stripe')(process.env.API_STK_CLIENT);

module.exports = {
  chargeUser: function(req, res) {
    // Get the credit card details submitted by the form
    var token = req.body.stripeToken;
    var amount = 1000; // in cents

    stripe.charges.create({
        card: token,
        // source: token, don't know if card or source better
        currency: 'usd',
        amount: amount,
        description: "Example charge",
        application_fee: 123 // (we get) in cents
    },
    {stripe_account: CONNECTED_STRIPE_ACCOUNT_ID},
    function(err, charge) {
        if (err) {
            res.send(500, err);
        } else {
            res.send(204);
        }
    });
  }
}