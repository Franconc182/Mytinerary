const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt; //nos sirve para desencriptar la pass

const User = require("../models/user");

module.exports = passport.use(
  new jwtStrategy(
    {
      jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(), //de la auth del header viene el token bearer
      secretOrKey: process.env.SECRET_KEY,
    },
    (jwt_payload, done) => {
      //console.log(jwt_payload)
      User.findOne({ _id: jwt_payload.id })
        .then((user) => {
          if (user) {
            return done(null, user);
          } else if (err) {
            return done(err, false);
          } else {
            return done(null, false);
          }
        })
        .catch((err) => {
          return done(err, false);
        });
    }
  )
);
