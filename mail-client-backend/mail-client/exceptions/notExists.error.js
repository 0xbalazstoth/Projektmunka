const { MoleculerError } = require("moleculer").Errors;

class NotExistsError extends MoleculerError {
	constructor(msg, data) {
		super(msg || `Data does not exists!`, 404, "DATA_NOT_EXISTS", data);
	}
}

module.exports = NotExistsError;
