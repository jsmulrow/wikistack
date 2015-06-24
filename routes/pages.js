module.exports = function(express) {
	var router = express.Router();
	var Page = require("../models/index.js").Page;


	router.get('/:page', function(req, res, next) {
		var page = req.params.page;

		Page.findOne({url_name: page}, function(err, data) {
			res.render("show", {title: data.title, content: data.content, tags: data.tags, url_name: data.url_name, comments: data.comments});
		});
		
	});

	router.get("/:page/similar", function(req, res, next) {
		Page.findOne({url_name: req.params.page}, function(err, page) {
			Page.find({
				tags: {$in: page.tags},
				url_name: {$ne: page.url_name}
			}, function(err, data) {
				res.render("tags", { title: "Similar pages to: " + page.title, pages: data });
			});
		});
	});

	router.get("/:page/edit", function(req, res, next) {
		Page.findOne({url_name: req.params.page}, function(err, page) {
			res.render("edit", {title: "Edit: " + page.title, content: page.content, url_name: page.url_name, tags: page.tags.join(', ')});
		});
	});

	router.post("/:page/edit/submit", function(req, res, next) {
		var url_name = req.params.page;
		Page.update(
			{url_name: url_name},
			{$set:
				{
					content: req.body.page_content,
					tags: req.body.page_tags.split(/,\s*/)
				}
			}, function() {
				res.redirect('/wiki/' + url_name);
			}
		);
	});

	router.get("/:page/delete", function(req, res, next) {
		var page = req.params.page;
		Page.remove({url_name: page}, function() {
			res.redirect('/');
		});
	});

	router.post("/:page/comment", function(req, res, next) {
		var page = req.params.page;

		Page.update(
			{url_name: page},
			{$push:
				{
					comments: req.body.page_new_comment,
				}
			}, function() {
				res.redirect('/wiki/' + page + '/#comment-form');
			}
		);

	});

	return router;
};