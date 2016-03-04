var stripe = require("stripe")(
  "sk_test_mZdHc2EKHCmqxjf94SlTaAOi"
);

// retrieve current account balance
stripe.balance.retrieve(function(err, balance) {
  // asynchronously called
});


////////////
///CHARGES//
////////////

// create charge
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

// returns list of your previous charges (most recent charges at the top)
stripe.charges.list(
  { limit: 3 },
  function(err, charges) {
    // asynchronously called
  }
);

////////////
//CUSTOMERS/
////////////

// create customer - autoassigns a customer id "id" as well used below in .retrieve();
stripe.customers.create({
  description: 'Customer for test@example.com',
  source: "tok_17lMoGLQi5m0Mz6rPyMgtOfz" // obtained with Stripe.js
}, function(err, customer) {
  // asynchronously called
});

stripe.customers.retrieve(
  "cus_81Qx1Cv8CZb3Ex",
  function(err, customer) {
    // asynchronously called
  }
);
