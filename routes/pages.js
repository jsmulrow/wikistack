module.exports = function(express) {
	var router = express.Router();
	var Page = require("../models/index.js").Page;


	router.get('/:page', function(req, res, next) {
		var page = req.params.page;

		Page.findOne({url_name: page}, function(err, data) {
			res.render("show", {title: data.title, content: data.content, tags: data.tags, url_name: data.url_name});
		});
		
	});

	router.get("/:page/similar", function(req, res, next) {
		Page.findOne({url_name: req.params.page}, function(err, page) {
			
			Page.find({
				tags: {$in: page.tags},
				url_name: {$ne: page.url_name}
			}, function(err, data) {
				res.render("tags", { title: "Similar pages to " + page.title, pages: data });
			});
		});
		
	});

	return router;
};