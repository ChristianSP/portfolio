// server.js

//var frontUrl = "http://angularwords.esy.es";
var frontUrl = "http://localhost:4200";

var Text = require('./app/models/texts');

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var jwt    = require('jsonwebtoken');
var middleware = require('./middleware');
var shortId = require('shortid');
var config = require('./config');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", frontUrl);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token");
  //res.header("Access-Control-Allow-Methods", "*");
  //res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

//DB SETUP
var assert = require('assert');
var mongoose = require('mongoose');
mongoose.connect(config.database);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to DB")
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3033;        // set our port

app.set('superSecret',config.secret);

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.post('/text', function(req, res) {
  // find the user
  Text.findOne({"value": req.body.text}, function(err, text) {
		if (!text) {
        var newText = new Text({value: req.body.text});
        newText.save(function(err,newText) {
          Text.find({}, function(err, texts) {
            var textsMap = [];
            var ezCount = 0;
            var totalCount = 0;
            texts.forEach( (text) => {
              text._id=ezCount;
              textsMap.push(text);
              ezCount++;
              totalCount += text.count;
            });
            res.json({texts: textsMap,totalCount: totalCount});
          });
        });
		} else if (text) {
        text.count++;
        text.save(() => {
          Text.find({}, function(err, texts) {
            var textsMap = [];
            var ezCount = 0;
            var totalCount = 0;
            texts.forEach( (text) => {
              text._id=ezCount;
              textsMap.push(text);
              ezCount++;
              totalCount += text.count;
            });
            res.json({texts: textsMap,totalCount: totalCount});
          });
        });
    }
	});
});

router.get('/texts', function(req, res) {
  // find the user
  Text.find({}, function(err, texts) {
    var textsMap = [];
    var ezCount = 0;
    var totalCount = 0;
    texts.forEach( (text) => {
      text._id=ezCount;
      textsMap.push(text);
      ezCount++;
      totalCount += text.count;
    });
    res.json({texts: textsMap,totalCount: totalCount});
	});
});

// more routes for our API will happen here

// get an instance of the router for api routes
var apiRoutes = express.Router();

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);



// START THE SERVER
// =============================================================================
http.listen(port);
console.log('Magic happens on port ' + port);





