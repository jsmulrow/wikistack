module.exports = function(express) {
	var router = express.Router();

	router.get('/', function(req, res, next) {
		res.render('add', {title: 'ADD A PAGE'});
	});

	router.post('/submit', function(req, res, next) {
		var models = require('../models/');

		var title = req.body.page_title;

		var url_name = title ? title.trim().replace(/\s+/g, '_').replace(/\W/g, '') : randomTitle(5);
		var content = req.body.page_content;

		var tags = req.body.page_tags.split(/,\s*/);
		// remove undefined tags
		for (var i = 0; i < tags.length; i++) {
			if (!tags[i]) {
				tags.splice(i, 1);
			}
		}
		// STUDENT ASSIGNMENT:
		// add definitions of the 'title', 'content' and 'url_name' variables here
		var page = new models.Page({ 'title': title, 'content': content, 'url_name': url_name, "tags": tags});
		page.save();
		res.redirect('/');
	});

	var randomWords = require("random-words");

	function randomTitle(length) {
		var output = [];
		for (var i = 0; i < length; i++) {
			output.push(Math.floor(Math.random() * 10));
		}
		return randomWords() + output.join('');
	}

	return router;
};