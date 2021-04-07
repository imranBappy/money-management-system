const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    User = require('./model/User');


const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'SECRET';

module.exports = passport =>{
    passport.use(new JwtStrategy(opts, (payload, done) =>{
        User.findById(payload._id)
        .then(user =>{
        if (!user) {
            return done(null, false)
        }else{
            return done(null, user)
        }
        }).catch(err =>{
            done(err)
        })
    }))
}