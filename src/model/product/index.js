// Libraries
const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');
// Constants
const PRODUCT = require('../../constants').PRODUCT
const STATUS = PRODUCT.STATUS;
const TYPE = PRODUCT.TYPE;

const ProductSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
        },
        type: {
            type: String,
			required: true,
            trim: true,
            enum: [TYPE.MARMALADE, TYPE.MARMALADE]
        },
        price: {
            type: Number,
			required: true,
			trim: true,
        },
		status: {
			type: String,
			required: true,
			enum: [STATUS.WITH_STOCK, STATUS.NO_STOCK],
			default: STATUS.WITH_SOCK,
        },
	},
	{ minimize: false },
);

ProductSchema.plugin(timestamps);
ProductSchema.plugin(mongooseStringQuery);

const Product = mongoose.model(PRODUCT.MODEL, ProductSchema);
module.exports = Product;
  