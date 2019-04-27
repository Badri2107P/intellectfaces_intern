const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const Users = require("../models/user");

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("token"),
      secretOrKey: "badri"
    },
    (payload, done) => {
      //console.log(payload);
      Users.findById(payload._id)
        .exec()
        .then(user => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch(err => {
          done(err, false);
        });
    }
  )
);
