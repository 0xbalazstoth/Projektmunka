const { MoleculerError } = require("moleculer").Errors;

class UserNotFoundError extends MoleculerError {
    constructor(msg, data) {
        super(msg || `User not found!`, 404, "USER_NOT_FOUND", data)
    }
}

module.exports = UserNotFoundError;