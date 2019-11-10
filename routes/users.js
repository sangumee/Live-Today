const express = require('express');
const router = express.Router();
const config = require('../config.js');
const path = require('path');
const User = require('../lib/user');
import bodyParser from "body-parser";

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: false
}));


router.get('/', function (req, res, next) {
  res.sendFile(path.resolve(__dirname, '..', 'src', 'index.html'));
})

router.get(`/:user`, function (req, res, next) {
  console.log(req.params.user)
  User.find({
    userId: req.params.user
  }, (err, user) => {
    if (err) console.log(err);
    console.log(user);
    res.send(user);
  });
})

router.get('/getUsers', function (req, res, next) {
  // GET/users/ route
  res.send({
    name: config.admin.name
  });
});

module.exports = router;