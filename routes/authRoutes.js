// Requiring our models and passport as we've configured it
var db = require("../models");
const bcrypt = require("bcrypt");
//const User = require("../models/user")
// var passport = require("../config/passport");
const passport = require("passport")
const express= require('express');
const app= express.Router();


  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/login", passport.authenticate("local"), function(req, res) {
    console.log("Authentication Successful!");
    res.redirect("/homepage");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/signup", async function(req, res) {
    console.log(req.body)
    req.body.password = await bcrypt.hash(req.body.password, 10)
    db.User.create(req.body)
      .then(user =>{
        req.login(user, function (err) {
          if ( ! err ){

              res.json(user);
          } else {
              //handle error
              res.json(err)
          }
      })
        res.json(results)
        })
      .catch(err => res.json(err))


    // db.User.create({
    //     //match with signup form, username
    //   username: req.body.username,
    //   password: req.body.password
    // })
    //   .then(function() {
    //     res.redirect(307, "/auth/login");
    //   })
    //   .catch(function(err) {
    //     res.status(401).json(err);
    //   });
    // db.User.findOne({ username }).then(user => {

    //     if (user) {
    //       // user exists
    //       // user exists
    //       errors.push({ msg: "username is already registered" });
    //       const data = { success: false, errors: errors };
    //       res.json(data);
    //     } else {
    //       const newUser = new db.User({
    //         username,
    //         password
    //       });
  
  
    //       bcrypt.genSalt(10, (err, salt) => {
    //         bcrypt.hash(newUser.password, salt, (err, hash) => {
    //           if (err) throw err;
    //           // set password to hashed
    //           newUser.password = hash;
    //           // save user
    //           newUser
    //             .save()
    //             .then(user => {
    //               req.logIn(user, err => {
    //                 if (!err) {
    //                   const results = {
    //                     success: true,
    //                     message: "user has successfully authenticated",
    //                     // user: req.user,
    //                     user: {
    //                         username:req.user.username,
    //                         goals: req.user.goals
    //                     },
    //                     cookies: req.cookies
    //                   };
    //                   res.json(results);
    //                 } else {
    //                   res.json(err);
    //                 }
    //               });
    //               // res.redirect("/auth/login");
    //               // res.redirect(CLIENT_HOME_PAGE_URL);
    //             })
    //             .catch(err => console.log(err));
    //         })
    //       }
    //       );
    //     }
    //   });
  
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's username and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        username: req.user.username,
        id: req.user._id,
        goals: req.user.goals
      });
    }
    router.post('/joingoal', function (req, res) {
      // create goal
      res.json(goalId)
   });

 //app.post('/joingoal', function (req, res) {
      // create goal
     // res.json(goalId)
  });
  
  module.exports=app