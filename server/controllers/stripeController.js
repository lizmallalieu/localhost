var stripe = require("stripe")(
  "sk_test_mZdHc2EKHCmqxjf94SlTaAOi"
);

stripe.charges.create({
  amount: 400,
  currency: "usd",
  source: {
    number: '4242424242424242',
    exp_month: 12,
    exp_year: 2017,
    cvc: '123'
  },
  description: "Charge for test@example.com"
}, function(err, charge) {
  if (err) {

  } else {
    
  }
});