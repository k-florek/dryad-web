let User = require('../models/User');

function register(username,password,group,admin){
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

function getUsers(){
  return new Promise(function(resolve,reject){
    User.find({},(err,query) =>{
        if (err){
          reject(err);
        } else {
          resolve(query)
        }
      }
    );
  });
}

module.exports = {register, getUsers}
