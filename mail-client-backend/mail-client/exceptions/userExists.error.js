const { MoleculerError } = require("moleculer").Errors;

class UserExistsError extends MoleculerError {
    constructor(msg, data) {
        super(msg || `User exists!`, 409, "USER_EXISTS", data)
    }
}

module.exports = UserExistsError;