module.exports = function(express) {
	var router = express.Router();

	router.get('/:page', function(req, res, next) {
		var page = req.params.page;

		

		res.send(page);
	});

	return router;
};