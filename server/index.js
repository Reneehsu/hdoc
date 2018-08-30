import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import passport from 'passport';
import passport_local from 'passport-local';
const LocalStrategy = require('passport-local').Strategy;
import models from './models/models.js';
import mongoose from 'mongoose';

//Express setup
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

//mongoose setup
mongoose.connection.on('error', function() {
  console.log('error connecting to database');
})

mongoose.connection.on('connected', function() {
  console.log('successfully conencted to database');
})

mongoose.connect(process.env.MONGODB_URI);
const User = models.User;
const Document = models.Document;

//SESSION SETUP
import session from 'express-session';
const MongoStore = require('connect-mongo')(session);

app.use(session({
  secret:'my secret password',
  store: new MongoStore({mongooseConnection: require('mongoose').connection})
}));

//PASSPORT LOCALSTRATEGY
passport.use(new LocalStrategy(
  function(username, password, done){
    User.findOne({email: username}, function(err, user){
      if (password === user.password){
        done(null, user);
      } else {
        done(null, false);
      }
    })
  }
))
//PASSPORT SERIALIZE/DESERILAZE USER
passport.serializeUser(function(user, done){
  done(null, user._id);
})

passport.deserializeUser(function(id, done){
  User.findById({_id: id}, function(err, user){
    done(null, user);
  })
})
//PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.post('/register', function(req,res){
  var newUser = new User({
    email: req.body.email,
    password: req.body.password
  });
  newUser.save(function(err){
    if (err) {
      res.json({success: false});
    } else {
      res.json({success: true});
    }
  });
})

app.post('/login',
  passport.authenticate('local'),
  function(req, res){
    console.log('passport');
    res.json({success: true, user: req.user});
  }
)

app.get('/logout', function(req,res){
  req.logout();
  res.json({success: true});
})

app.post('/create', function(req,res){
  var newDoc = new Document({
    title: req.body.title,
    password: req.body.password,
    content: "",
  })
  newDoc.save(function(err){
    if (err) {
      res.json({success: false});
    } else {
      res.json({success: true});
    }
  });
})

app.get('/document/:id', function(req,res){
  const id = req.params.id;
})

app.listen(1337);
console.log('Server running at http://127.0.0.1:1337/');
