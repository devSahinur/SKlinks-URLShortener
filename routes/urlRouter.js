const express = require('express');
const bodyParser = require('body-parser');
const { nanoid } = require('nanoid');

const Urls = require('../models/urls');

const urlRouter = express.Router();

urlRouter.use(bodyParser.json());

urlRouter.route('/')
.post((req, res, next) => {
    let slug = nanoid(6);
    Urls.findOne({slug})
    .then((url) => {
        if (url == null) {
            req.body.slug = slug;
            Urls.create(req.body)
            .then((url) => {
                console.log('URL created ', url);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(url);
            }, (err) => next(err))
            .catch((err) => next(err));
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end('Slug in use');
        }
    }, (err) => next(err));
});

module.exports = urlRouter;