var Card = require('../database/cards/card.js');
var Cards = require('../database/cards/cards.js');
var User = require('../database/users/user.js');
var Users = require('../database/users/users.js');

var Promise = require("bluebird");
var cardRoutes = {
  createCard: function (req, res) {
    return new Promise(function (resolve, reject) {
      Users.query({
        where: {
          email: req.body.email
        }
      }).fetchOne().then(function (user) {
        if (user) {
          Cards.query({
            where: {
              email: req.body.cardEmail
            }
          }).fetchOne().then(function (card) {
            if (card) {
              console.log(65, req.body.cardEmail);
              card.save({
                firstName: req.body.firstName || card.get("firstName"),
                lastName: req.body.lastName || card.get("lastName"),
                company: req.body.company || card.get("company"),
                phone: req.body.phone || card.get("phone"),
                jobTitle: req.body.jobTitle || card.get("jobTitle")
              }).then(function (updatedCard) {
                res.end(JSON.stringify(updatedCard));
              })
            } else {
              return new Card({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                company: req.body.company,
                phone: req.body.phone,
                jobTitle: req.body.jobTitle,
                userID: user.get("id"),
                email: req.body.cardEmail,
              }).save().then(function (newCard) {
                console.log(85, newCard);
                res.end(JSON.stringify(newCard));
              }).catch(function (err) {
                console.log(88, new Error(err));
                res.end(JSON.stringify(err));
              });
            }
          });
        } else {
          res.status(400).send('user not logged in');
        }
      })
    });
  },
  getCard: function (req, res) {
    return new Promise(function (resolve, reject) {
      Cards.query({
        where: {
          email: req.body.cardEmail
        }
      }).fetchOne().then(function (card) {
        console.log(63, card);
        if (card) {
          res.end(JSON.stringify(card))
        } else {
          res.status(400).send('no card found related to email');
        }
      }).catch(function (err) {
        console.log(new Error(err));
        res.end(JSON.stringify(err));
      });
    });
  }
}
module.exports = cardRoutes;
