let User = require('../models/User');

function registerUser(username,password,group,admin){
  User.findOne({username:username},(err,user)=>{
    if (err) {
      console.log(err);
    }
    if (!user) {
      User.register({username:username,admin:admin,group:group},password,(err)=>{
        if (err){console.log(err);}
      });
    }
  });
}

module.exports = registerUser;
