const bcrypt = require("bcrypt");
const hat = require("hat");
const UserNotFoundError = require("../exceptions/userNotFound.error");
const jwt = require("jsonwebtoken");

module.exports = {
	actions: {
		/**
		 * @actions
		 * @param {String} apiKey - API key
		 * @returns {Object} - Authenticated user
		 */
		findByApiKey: {
			params: {
				apiKey: {
					type: "string",
				},
			},

			async handler(ctx) {
				try {
					const decoded = jwt.verify(
						ctx.params.apiKey,
						process.env.JWT_SECRET
					);

					if (!decoded) {
						throw new TokenExpiredError("Token expired!");
					}

					const user = await this.adapter.findById(decoded.userId);

					if (!user) {
						throw new UserNotFoundError();
					}

					return user;
				} catch (err) {
					throw err;
				}
			},
		},

		login: {
			auth: false,
			params: {
				email: {
					type: "email",
				},
				password: {
					type: "string",
				},
			},

			async handler(ctx) {
				const { email, password } = ctx.params;

				const user = await this.adapter.findOne({ email });

				if (!user) {
					throw new UserNotFoundError();
				}

				const token = jwt.sign(
					{ userId: user._id },
					process.env.JWT_SECRET,
					{ expiresIn: process.env.JWT_EXPIRES_IN }
				);

				const passwordMatch = await bcrypt.compare(
					password,
					user.password
				);

				if (!passwordMatch) {
					throw new UnAuthorizedError();
				}

				const apiKey = {
					token: token,
				};

				user.apiKeys.push(apiKey);

				await user.save();
				const response = await this.transformDocuments(ctx, {}, user);
				return { ...response, apiKeys: [apiKey] };
			},
		},
	},

	methods: {
		generateToken({ userId, secret, expiresIn }) {
			console.log(userId, secret, expiresIn);
			return jwt.sign({ userId }, secret, { expiresIn });
		},
	},
};
