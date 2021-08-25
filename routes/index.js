const express = require('express');
const router = express.Router();

/* Installed Package */
const got = require('got');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main', { title: 'Live Today' });
});

router.get('/test', async function(req, res, next) {
  let testData = await got.post('https://httpbin.org/anything', {
    json: {
      hello: 'world'
    }
  }).json();
  console.log(testData);
  res.send('1');
});

module.exports = router;
