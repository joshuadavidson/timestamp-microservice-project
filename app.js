const express = require('express');
const app = express();
const port = process.env.PORT || 3000; //set the port to server port or 3000 for local testing

//serve static assets from the public folder
app.use('/assets', express.static(__dirname + '/public'));

//main page route
app.get('/', function (req, res) {
  res.sendFile('index.html', {root: __dirname + '/public/pages'});
});

//route for handling timestamp requests
app.get('/*', function (req, res){

});

app.listen(port);
