// load the express package and create our app
var express = require('express');
var app = express();
var path = require('path');

// send our index.html file to the user for the home page
app.get('/', function(req, res){

  res.sendFile(path.join(__dirname + '/index.html'));

});

// create routes for the admin section

// get an instance of the router
var adminRouter = express.Router();

// admin main page. the dashboard (http://localhost:1337/admin)
adminRouter.get('/', function(req, res){
  res.send('I am the dashboard');
});

// route middleware that will happen on every request
adminRouter.use(function(req, res, next){
  // log each request to the console
  console.log(req.method, req.url);
  // continue doing what we were doing and go to the route
  next();
});

// users page (http://localhost:1337/admin/users
adminRouter.get('/users', function(req, res){
  res.send('I show all the users');
});

// posts page (http://localhost:1337/admin/posts)
adminRouter.get('/posts', function(req, res){
  res.send('I show all the posts');
});

// route middleware to validate :name
adminRouter.param('name', function(req, res, next, name){
  // do validation on name here

  // log to check it is working
  console.log('doing name validation on ' + name);

  // once validation is done save the new item in the req
  req.name = name;

  // go to the next thing
  next();

});

// route with parameters (http://localhost:1337/admin/users/:name)
adminRouter.get('/users/:name', function(req,res){
  res.send('hello ' + req.name + '.');
});

// apply the routes to our application
app.use('/admin', adminRouter);


// *** "Use app.route() as a shortcut to the Router to define 
// multiple requests on a route" ??? (p. 71)
// *** "These are applied directly to our main app object ... but 
// we can also define them in the adminRouter object we had earlier" ??? (p. 71)

// GET route to show the login form  (.get)
// POST route to process the login form 
app.route('/login').get(function(req,res){
  res.send('this is the login form');
}).post(function(req,res){
  console.log('processing');
  res.send('processing the login form');
});

// start the server
app.listen(1337);
console.log('visit me at http://localhost:1337')