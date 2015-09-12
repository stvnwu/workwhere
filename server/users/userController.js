var User = require('../database/users/user.js');
var Card = require('../database/cards/card.js');
var Users = require('../database/users/users.js');
var Promise = require("bluebird");

/** 
 * userRoutes is an object that contains the routes for '/users' in our API
 */
var userRoutes = {
  /**
   * @function to sign the user in, comparing hashed passwords
   * @param {object} HTTP request object
   * @param {object} HTTP response object
   */
  signin: function (req, res) {
    console.log(15, req.body);
    return new Promise(function (resolve, reject) {
      return new User({
          email: req.body.email
        })
        .fetch()
        .then(function (user) {
          var userID = user.get("id");
          if (!user) {
            //Sending a 400 response code for wrong email/password requests
            // HERE we would redirect to signup
            // confer with front end
            console.log(25, user);
            res.status(400).send({
              error: "email does not match"
            });
          } else {
            user.comparePassword(req.body.password)
              .then(function (isMatch) {
                if (!isMatch) {
                  res.status(400).send({
                    error: "password does not match"
                  });
                } else {
                  console.log(39, userID);
                  return Card.query({
                    where: {
                      userID: userID
                    }
                  }).fetch().then(function (card) {
                    if (card) {
                      res.status(200).send({
                        message: card.get("email")
                      });
                    } else {
                      res.status(200).send({
                        redirect: "no card email"
                      });
                    }
                  })
                }
              }).catch(function (err) {
                console.log(err);
                res.status(400).send({
                  error: "password/email does not match"
                });
              });
          }
        });
    });
    console.log("all routes");
    res.json({
      message: "user get message"
    });
  },
  /**
   * @function to sign the user up and hash the password
   * @param {object} HTTP request object
   * @param {object} HTTP response object
   */
  signup: function (req, res) {
    return new Promise(function (resolve, reject) {
      Users.query({
        where: {
          email: req.body.email
        }
      }).fetchOne().then(function (user) {
        if (user) {
          //Sending 422 response code if email already exists in DB
          res.status(422).send({
            error: "email already exists"
          });
        } else if (req.body.email && req.body.email !== "" && req.body.email.indexOf("@") !== -1 && req.body.email !== undefined) {
          console.log(62, req.body.email);
          console.log(37, "email provided");
          return new User({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
          }).save().then(function (newUser) {
            console.log(20, newUser);
            // res.end(newUser.get({
            //   email: "email"
            // }));
            res.status(200).send({
              message: newUser.get("email")
            });
          }).catch(function (err) {
            console.log(new Error(err));
            res.status(500).send({
              error: err
            });
          });
        } else {
          console.log(51, req.body);
          res.status(400).send({
            error: "email is not provided/invalid"
          });
        }
      });
    });
  }
};

module.exports = userRoutes;
