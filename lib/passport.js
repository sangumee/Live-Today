module.exports = function (router, request) {
    const passport = require('passport')
    const GitHubStrategy = require('passport-github').Strategy;
    const GoogleStrategy = require('passport-google-oauth20').Strategy;
    const User = require('../lib/user');

    const clientID = process.env.clientID;
    const clientSecret = process.env.clientSecret;
    /* Google OAuth Strategy */
    passport.use(new GoogleStrategy({
            clientID: clientID,
            clientSecret: clientSecret,
            callbackURL: "/auth/google/callback"
        },
        function (accessToken, refreshToken, profile, cb) {
            User.findOne({
                userNUM: profile.id
            }, function (err, user) {
                if (err) {
                    return cb(err);
                }
                if (!user) {
                    console.log('NOT FOUND');
                    user = new User({
                        userNUM: profile.id,
                        userId: profile.displayName,
                        name: profile.displayName,
                        avatarURL: profile.photos[0].value,
                        bio: '',
                        email: '',
                        phoneNumber: '',
                        regosterType: 'google',
                        registerDate: Date.now(),
                        viewCount: 0
                    });
                    user.save(function (err) {
                        if (err) console.log(err);
                    });
                } else {
                    return cb(err, user);
                }
            })
            // User.findOrCreate({
            //     userId: profile.id
            // }, function (err, user) {
            //     return cb(err, user);
            // });
            console.log(profile);
        }
    ));

    // const githubCredentials = require('../config/github.json'); // Development Setting
    /* Github OAuth Strategy */
    passport.use(new GitHubStrategy({
            clientID: process.env.githubProductionClientID,
            clientSecret: process.env.githubProductionClientSecret,
            callbackURL: process.env.githubProductionCallbackURL
        },
        function (accessToken, refreshToken, profile, cb) {
            // console.log(accessToken);
            console.log(profile);
            return cb(null, profile);
        }
    ));

    router.use(passport.initialize());
    router.use(passport.session());

    passport.serializeUser(function (user, cb) {
        cb(null, user.id);
        console.log('serializeUser', user.id);
    });

    passport.deserializeUser(function (obj, cb) {
        console.log(obj)
        cb(null, obj);
        console.log('DeserializerUser', obj);
    });
    return passport;
}