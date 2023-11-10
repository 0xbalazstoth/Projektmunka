const { MoleculerError } = require("moleculer").Errors;

class InvalidValueError extends MoleculerError {
	constructor(msg, data) {
		super(msg || `Invalid value!`, 400, "INVALID_VALUE", data);
	}
}

module.exports = InvalidValueError;
