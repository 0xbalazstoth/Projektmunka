const bcrypt = require("bcrypt");
const hat = require("hat");
const UserNotFoundError = require("../exceptions/userNotFound.error");
const UnAuthorizedError = require("../exceptions/unauthorized.error");
const jwt = require("jsonwebtoken");
const ApiGateway = require("moleculer-web");
var CryptoJS = require("crypto-js");
const { VsAuthenticator } = require("@vs-org/authenticator");
const {
	generateSecret,
	generateUri,
	generateToken,
	validateToken,
} = require("@sunknudsen/totp");

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

		totpValidation: {
			auth: true,
			params: {
				code: {
					type: "string",
				},
			},
			async handler(ctx) {
				const user = ctx.meta.user;
				const totpSecret = user.totpSecret;

				const isValid = VsAuthenticator.verifyTOTP(
					ctx.params.code,
					totpSecret.base32Secret
				);

				const response = {
					isValid: isValid,
				};

				return response;
			},
		},

		totpCodeGeneration: {
			auth: true,
			params: {},
			async handler(ctx) {
				const user = ctx.meta.user;
				const totpSecret = user.totpSecret;

				const secret = VsAuthenticator.generateSecret(
					user.firstName,
					user.email
				);
				console.log(secret);

				const totp = VsAuthenticator.generateTOTP(
					totpSecret.base32Secret
				);

				const response = {
					totpCode: totp,
				};

				return response;
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

				var bytes = CryptoJS.AES.decrypt(
					user.password,
					process.env.ENCRYPTION_SECRET
				);
				var decryptedPwd = bytes.toString(CryptoJS.enc.Utf8);
				const passwordMatch = decryptedPwd === password;

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
