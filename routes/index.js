var express = require('express');
var Page = require("../models/index.js").Page;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	Page.find(function(err, data) {
  		res.render('index', { title: 'WIKISTACK', pages: data });
	});
});

module.exports = router;