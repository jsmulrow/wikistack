module.exports = function(express) {
	var router = express.Router();
	var Page = require("../models/index.js").Page;


	router.get('/:tag', function(req, res, next) {
		var tag = req.params.tag;

		Page.find({
			tags: {$in: [tag]}
		}, function(err, data) {
			res.render("tags", { title: tag, pages: data });
		});
		
	});

	return router;
};