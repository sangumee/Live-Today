const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const request = require("request");
let session = require("express-session");
let FileStore = require("session-file-store")(session);

/* CUSTOM */
const config = require('../config.js');
const path = require('path');

router.get('/', function (req, res, next) {
  res.sendFile(path.resolve(__dirname, '..', 'src', 'index.html'));
})

router.get('/getUsers', function (req, res, next) {
  // GET/users/ route
  res.send({
    name: config.admin.name
  });
});

/* Redirect http to https */
router.get("*", function (req, res, next) {
  if (
    req.headers["x-forwarded-proto"] != "https" &&
    process.env.NODE_ENV === "production"
  )
    res.redirect("https://" + req.hostname + req.url);
  else next(); /* Continue to other routes if we're not redirecting */
});

router.use(
  session({
    secret: process.env.session_secret || "Hello World",
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
    cookie: {
      secure: false,
      // maxAge: new Date(Date.now() + 3600000)
      maxAge: 24000 * 60 * 60
    },
    key: "connect.sid"
  })
);

// Favicon Server Dependency
// let favicon = require("serve-favicon");
// router.use(favicon(path.join(__dirname, "../public/images", "favicon.ico")));

/* Import Database Settings */
// const db = require("../lib/db");
/* Import Authentication Setting (Passport.js) */
const passport = require("../lib/passport")(router, request);

/* Github Auth Router */
router.get("/auth/github", passport.authenticate("github"));
/* Github Auth Callback Router */
router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/auth/login"
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log("SUCESS!!", req.user);
    res.redirect(`/success`);
  }
);

/* Google Auth Router */
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login"
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log('----------')
    console.log(req.user);
    res.redirect(`/${req.user.name}`);
  }
);

/* Login Page Router */
// router.get(`/auth/login`, function (req, res, next) {
//   res.render("login", {});
// });

router.get(`/auth/res`, function (req, res, next) {
  res.send("login");
});


/* Logout Router */
router.get(`/logout`, function (req, res, next) {
  req.logout();
  req.session.save(function (err) {
    res.redirect(`/`);
  });
});

/* BodyParser Setting */
router.use(bodyParser.json()); // to support JSON-encoded bodies
router.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

module.exports = router;