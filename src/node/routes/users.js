const express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  env = require('dotenv').config(),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  crypto = require('crypto-js');

const UserSchema = require('../schemas/Users');

router.use(passport.initialize());
mongoose.set('useFindAndModify', false);

passport.use('signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, async (username, password, done) => {
  try {
    UserSchema.findOne({
      where: {username: username},
    }).then(user => {
      if (user != null) {
        console.log('username already taken');
        return done(null, false, {message: 'username already taken'});
      } else {
        UserSchema.register(new UserSchema({username: username}), password).then(user => {
          console.log('user created');
          return done(null, user);
        });
      }
    })
  } catch (err) {
    done(err);
  }
}));

passport.use(new LocalStrategy(UserSchema.authenticate()));

router.post('/signup', (req, res, next) => {
  let encrypt = req.body.data;
  req.body = JSON.parse(crypto.AES.decrypt(encrypt, process.env.DECRYPTKEY).toString(crypto.enc.Utf8));
  passport.authenticate('signup', {session: false}, async (err, user, info) => {
    if (err) {
      console.log(err)
    }
    if (info != undefined) {
      console.log(info.message);
      res.send(info.message);
    } else {
      const data = {
        username: req.body.username,
        email: req.body.email,
        dob: req.body.dob
      };
      req.login(user, {session: false}, (err) => {
        if (err) {
          res.status(401).send(err);
        }
        UserSchema.findOneAndUpdate({username: data.username}, {
          dob: data.dob,
          email: data.email,
          isAdmin: true
        }, (err, user) => {
          if (err) {
            console.log(err);
          } else {
          }
        });
        const token = jwt.sign(user.toJSON(), process.env.JWTSECRET, {expiresIn: '2h'});
        return res.send({user, token});
      });
    }
  })(req, res, next);
});

router.post('/signin', (req, res) => {
  let encrypt = req.body.data;
  req.body = JSON.parse(crypto.AES.decrypt(encrypt, process.env.DECRYPTKEY).toString(crypto.enc.Utf8));
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
      return res.status(401).send({
        message: 'Something is not right',
      });
    }
    req.login(user, {session: false}, (err) => {
      if (err) {
        res.status(401).send(err);
      }
      UserSchema.findById(user._id, (err, user) => {
        if (err) {
          res.status(400).send(err);
        } else {
          user.lastLogin = Date.now();
          user.save();
        }
      });

      const token = jwt.sign(user.toJSON(), process.env.JWTSECRET);
      return res.send({user, token});
    });
  })(req, res);
});


module.exports = router;
