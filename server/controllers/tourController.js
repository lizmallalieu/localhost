
// Handles user searching for tours on Search page
module.export = {
  // Checks for valid inputs and creates a new object with keys for each legitimate input
  var inputObj = req.body.data
  var newObj = {};
  for (var key in inputObj) {
    if (inputObj[key] !== "") {
      newObj[key] = inputObj[key]
    }
  }
  /* Filters tours based on the price range. Similar idea to Yelps "$" indicator of cost. Leaving this blank returns all prices.
  *   Guide:  $ = $0-26 , $$ = $0-51 , $$$ = $0-76 , $$$$ = $0-101.
  */
  if(newObj.price !== undefined) {
    if (newObj.price === "$") {
     newObj.price = {$lt: 26};
    } else if (newObj.price === "$$") {
      newObj.price = {$lt: 51};
    } else if (newObj.price === "$$$") {
      newObj.price = {$lt: 76};
    } else if (newObj.price === "$$$$") {
      newObj.price = {$lt: 101};
    }
  }

  find: (newObj, function(err, data) {
    if (err) {
      console.log('error');
      res.send(err)
    } else {
      res.send(data);
    }
  });
