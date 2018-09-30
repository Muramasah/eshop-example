// Libraries
const errors = require('restify-errors');
// Models
const Product = require('../model/product');
// Constants
const CONSTANTS = require('../constants');
const PRODUCT = CONSTANTS.ROUTES.PRODUCT;

module.exports = function(server) {
	/**
	 * POST
	 */
	server.post(PRODUCT.ROOT, (req, res, next) => {
		if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError("Expects 'application/json'"),
			);
		}

		let data = req.body || {};

		let product = new Product(data);
		product.save(function(err) {
			if (err) {
				console.error(err);
				return next(new errors.InternalError(err.message));
				next();
			}

			res.send(201);
			next();
		});
	});

	/**
	 * LIST
	 */
	server.get(PRODUCT.ROOT, (req, res, next) => {
		Product.apiQuery(req.params, function(err, docs) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message),
				);
			}

			res.send(docs);
			next();
		});
	});

	/**
	 * GET
	 */
	server.get(PRODUCT.LIST, (req, res, next) => {
		Product.findOne({ _id: req.params.todo_id }, function(err, doc) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message),
				);
			}

			res.send(doc);
			next();
		});
	});

	/**
	 * UPDATE
	 */
	server.put(PRODUCT.LIST, (req, res, next) => {
		if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError("Expects 'application/json'"),
			);
		}

		let data = req.body || {};

		if (!data._id) {
			data = Object.assign({}, data, { _id: req.params.id });
		}

		Product.findOne({ _id: req.params.id }, function(err, doc) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message),
				);
			} else if (!doc) {
				return next(
					new errors.ResourceNotFoundError(
						'The resource you requested could not be found.',
					),
				);
			}

			Product.update({ _id: data._id }, data, function(err) {
				if (err) {
					console.error(err);
					return next(
						new errors.InvalidContentError(err.errors.name.message),
					);
				}

				res.send(200, data);
				next();
			});
		});
	});

	/**
	 * DELETE
	 */
	server.del(PRODUCT.LIST, (req, res, next) => {
		Product.remove({ _id: req.params.id }, function(err) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message),
				);
			}

			res.send(204);
			next();
		});
	});
};
