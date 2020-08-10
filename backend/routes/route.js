const bodyParser = require("body-parser");
const validator = require("express-validator");
const {body,validationResult} = validator;
const bcrypt = require("bcryptjs");
const passport = require("passport");
const mongoose = require("mongoose");
const User = require('../modal/Schema');

require('../config/passport')(passport);
const route = (app) => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended:true}))
  app.post(
    '/Register',[
    body("name").notEmpty().isLength({min:2}).trim().escape(),
    body("password").notEmpty().isLength({min:2,max:15}).trim()
  ],(req,res) => {
    var result = validationResult(req)
    const {email,password,name} = req.body
        if(result.errors.length < 1){
      const newUser = new user({
        name,
        email,
        password
      });
      User.findOne({email:email}).then(user => {
        if(user){
          return  res.send({err:"exists"})
        }
        else{
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
              newUser
            .save()
            .then((user) => {
              console.log('user saved')
              return res.status(200).json({user:"saved"})
            })
            .catch(err => console.log(err));
            })
        });
      }
  }).catch(err => {console.log(err)})
}
})
app.post('/login',passport.authenticate('local'),(req,res) => {
  console.log(req.user);
  res.status(200).json({user:true})
})

app.get("/nav",(req,res) => {
  if(req.user){
    console.log(req.user);
    console.log("user is defined");
    res.status(200).json({user:"defined"});
  }
  else{
    console.log(req.user)
    res.status(200).json({user:" not defined"})
  }
})
app.get("/home",(req,res) => {
  if(req.user){
    console.log(req.user);
    console.log("user is defined");
    
  }
  else{
    console.log(req.user)
    res.status(200).json({permission:" not allowed"})
  }
 
})
app.get("/logOut",(req,res) => {
  console.log(req.user)
  req.logout();
  res.clearCookie();
  return res.status(200).json({user:"loggedOut"})  
})

}

module.exports = route;