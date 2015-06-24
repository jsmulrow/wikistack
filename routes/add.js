module.exports = function(express) {
	var router = express.Router();

	router.get('/', function(req, res, next) {
		res.render('add', {title: 'ADD A PAGE'});
	});

	router.post('/submit', function(req, res, next) {
		var models = require('../models/');

		var title = req.body.page_title ? title.trim().replace(/\s+/g, '_').replace(/\W/g, '') : randomTitle(4);
		var content = req.body.page_content;
		var url_name = title;
		var tags = req.body.page_tags.split(/,\s*/);
		for (var tag = 0; tag < tags.length; tag++) {
			if (!tags[tag]) {
				tags.splice(tag, 1);
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