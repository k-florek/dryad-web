const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const checkAuth = require('../middleware/checkAuth');
const checkAdmin = require('../middleware/checkAdmin');
const router = express.Router();

router.get('/',checkAuth,(req,res)=>{
  res.render('dashboard',{user:req.user.username,admin:req.user.admin});
});

router.get('/signin',(req,res)=>{
  res.render('signin');
});

router.post('/signin',passport.authenticate('local', {failureRedirect: '/signin'}),(req,res)=>{
  res.redirect('/');
});

router.get('/signout',(req,res)=>{
  req.logout();
  res.redirect('/');
});

router.get('/register',checkAuth,checkAdmin,(req,res)=>{
  res.send('THis is will be registration');
});

router.post('/register',checkAuth,checkAdmin,(req,res)=>{
  res.send('THis is will be registration');
});

router.get('/listusers',checkAuth,checkAdmin,(req,res)=>{
  res.send('See all of the users here');
});

router.get('/submission',checkAuth,(req,res)=>{
  res.send('Submit sequencing data');
});

module.exports = router;
