var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

var mongoose = require("mongoose");
const Person = require("../models/Person");
const key = require("../setup/DBSetup").secret;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Person.findById(jwt_payload.id)
        .then(person => {
          if (person) {
            return done(null, person);
          }

          return done(null, false);
        })
        .catch(err => {
          console.log(err);
        });
    })
  );
};
