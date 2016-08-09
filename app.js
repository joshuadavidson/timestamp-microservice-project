const express = require('express');
const app = express();
const port = process.env.PORT || 3000; //set the port to server port or 3000 for local testing

const moment = require('moment'); //use moment.js to easily manipulate incoming dates

//serve static assets from the public folder
app.use('/assets', express.static(__dirname + '/public'));

//landing page route
app.get('/', function(req, res) {
  res.sendFile('index.html', {
    root: __dirname + '/public/pages'
  }, function(err) {
    if (err) throw err;
  });

});

//route for handling timestamp requests
app.get('/:input', function(req, res) {

  var unixDate;
  var naturalDate;

  //if input is a unix timestamp set it and convert to natural date
  //must be 1 to 10 digits only
  if (/^[0-9]{1,10}$/.test(req.params.input)) {
    unixDate = parseInt(req.params.input);
    naturalDate = moment.unix(unixDate).utc().format('LL'); //convert unix timestamp to UTC date
  } else

  //if input is a natural language date set it and convert to unix date
  //must be in format of MMMM D, YYYY or MMM D, YYYY
  if (/(^January|^February|^March|^April|^May|^June|^July|^August|^September|^October|^November|^December)\s[0-9]{1,2},\s[0-9]{2,4}$/i.test(req.params.input) ||
    /(^Jan|^Feb|^Mar|^Apr|^May|^Jun|^Jul|^Aug|^Sep|^Oct|^Nov|^Dec)\s[0-9]{1,2},\s[0-9]{2,4}$/i.test(req.params.input)) {
    inputMoment = moment.utc(req.params.input, ['MMMM D, YYYY', 'MMMM D, YY']);
    naturalDate = inputMoment.format('LL');
    unixDate = inputMoment.unix();
  }

  //invalid date passed return null
  else {
    unixDate = null;
    naturalDate = null;
  }

  //return the JSON object of the unix and natural date
  res.json({
    unix: unixDate,
    natural: naturalDate
  });
});

app.listen(port);
