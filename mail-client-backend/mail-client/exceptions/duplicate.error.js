const { MoleculerError } = require("moleculer").Errors;

class DuplicateError extends MoleculerError {
	constructor(msg, data) {
		super(msg || `Data already exists!`, 409, "DATA_EXISTS", data);
	}
}

module.exports = DuplicateError;
