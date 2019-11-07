const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();


//set view engine to pug
app.set('views', __dirname + '/views');
app.set('view engine','pug');
app.locals.pretty = true;

//establish static resources
app.use(express.static(__dirname + '/public'));
app.use('/css/bootstrap',express.static(__dirname +'/node_modules/bootstrap/dist/css/'));
app.use('/js/bootstrap',express.static(__dirname +'/node_modules/bootstrap/dist/js/'));
app.use('/js/jquery',express.static(__dirname +'/node_modules/jquery/dist/'));


//setup various middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('express-session')({
    secret: 'super secret session key',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//Configure Mongoose
mongoose.promise = global.Promise;

mongoose.connect('mongodb://localhost/dryad',{ useNewUrlParser: true,useUnifiedTopology: true }).
  catch(err => {
    console.log(err);
  });

//setup passport
let User = require('./models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//setup default user
require('./controller/registerUser')(username='test@test.com',password='1234',group='WSLH',admin=true);


//pull routes
const dashboardRoutes = require('./routes/dashboard');

app.use('/', dashboardRoutes);

app.listen(3000);
console.log("Dryad Web is running on http://localhost:3000");
