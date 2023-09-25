const { MoleculerError } = require("moleculer").Errors;

class AlreadySetError extends MoleculerError {
	constructor(msg, data) {
		super(msg || `Data already set!`, 409, "DATA_EXISTS", data);
	}
}

module.exports = AlreadySetError;
