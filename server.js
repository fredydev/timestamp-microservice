// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 

app.get("/api/timestamp/:date_string", function (req, res) {
  let date_string = req.params.date_string
  
  
    let d  = new Date(date_string)
    if(d.toString()==="Invalid Date"){
      res.json({"error" : "Invalid Date"})
    }
    else{
      let unix = Date.parse(d).toString().slice(0,-3)
      let natural = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDay(), d.getHours(), d.getMinutes(), d.getSeconds()));
      res.json({unix: unix,natural: natural.toUTCString()})
    }
  
  
});

app.get("/api/timestamp/", function (req, res) {
  let unix = Date.parse(new Date()).toString().slice(0,-3)
    let natural = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDay(), new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()));
    res.json({unix: unix,natural: natural.toUTCString()})
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});