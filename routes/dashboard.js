const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const checkAuth = require('../middleware/checkAuth');
const checkAdmin = require('../middleware/checkAdmin');
const usersCtrl = require('../controller/users');
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
  res.render('registerUser',{user:req.user.username,admin:req.user.admin});
});

router.post('/register',checkAuth,checkAdmin,(req,res)=>{
  usersCtrl.register(username=req.body.username,password=req.body.password,group=req.body.group,admin=req.body.admin);
  res.redirect('/');
});

router.get('/userlist',checkAuth,checkAdmin,(req,res)=>{
  usersCtrl.getUsers().then((query)=>{
    res.render('userlist',{userlist:query,user:req.user.username,admin:req.user.admin});
  });
});

router.get('/submission',checkAuth,(req,res)=>{
  res.render('submitSeq',{user:req.user.username,admin:req.user.admin});
});

module.exports = router;
