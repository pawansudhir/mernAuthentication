const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb',{useNewUrlParser:true,useUnifiedTopology:true},(err) => {if(err){console.log(err)}else{console.log('connected to db')}})

const cors = require("cors");
app.use(cors());
 app.use(cookieParser());
app.use(session({ secret: 'keyboard cat',resave:false,saveUninitialized:false}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
require("./routes/route")(app)

app.listen(5000,() => {
    console.log("listening on 5000");
});