var express = require('express');
const Urls = require('../models/urls');
var router = express.Router();


/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.route('/:urlid')
.get((req,res,next) => {
  let id = req.params.urlid;
  console.log(id);
  Urls.findOne({slug: id})
  .then((url) => {
    if (url != null) {
      res.statusCode = 200;
      res.redirect(url.url);
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end('URL Not found');
    }
  }, (err) => next(err))
  .catch((err) => next(err));
});


module.exports = router;
