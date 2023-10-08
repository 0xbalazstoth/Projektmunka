const { MoleculerError } = require("moleculer").Errors;

class UnAuthorizedError extends MoleculerError {
	constructor(msg, data) {
		super(msg || `Unauthorized!`, 401, "UNAUTHORIZED", data);
	}
}

module.exports = UnAuthorizedError;
