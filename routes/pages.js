module.exports = function(express) {
	var router = express.Router();
	var Page = require("../models/index.js").Page;


	router.get('/:page', function(req, res, next) {
		var page = req.params.page;

		Page.findOne({url_name: page}, function(err, data) {
			res.render("show", {title: data.title, content: data.content, tags: data.tags});
		});
		
	});

	return router;
};