"use strict";
const DBMixin = require("../mixins/db.mixin");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const hat = require("hat");
const AuthenticationMixin = require("../mixins/authentication.mixin");
const { MoleculerError } = require("moleculer").Errors;
const UserExistsError = require("../exceptions/userExists.error");
const UserNotFoundError = require("../exceptions/userNotFound.error");
const jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");
const { VsAuthenticator } = require("@vs-org/authenticator");

module.exports = {
	name: "users",
	mixins: [DBMixin("users"), AuthenticationMixin],
	model: User,
	settings: {
		fields: ["_id", "email", "firstName", "lastName", "bio"],
		entityValidator: {
			email: { type: "email" },
			password: { type: "string" },
			firstName: { type: "string" },
			lastName: { type: "string" },
			bio: { type: "string", optional: true },
		},
	},

	actions: {
		/**
		 * Create a new user entity
		 * @actions
		 * @param {Object} user - User entity
		 * @returns {Object} Created entity & API key
		 */
		createUser: {
			auth: false,
			params: {
				user: {
					type: "object",
				},
			},

			async handler(ctx) {
				const user = new User(ctx.params.user);
				const pwd = user.password;
				await this.validateEntity(user);

				user.password = CryptoJS.AES.encrypt(
					user.password,
					process.env.ENCRYPTION_SECRET
				).toString();

				const token = jwt.sign(
					{ userId: user._id },
					process.env.JWT_SECRET,
					{ expiresIn: process.env.JWT_EXPIRES_IN }
				);

				user.apiKeys.push({
					token,
				});

				try {
					const existingUser = await User.findOne({
						email: user.email,
					});
					if (existingUser) {
						console.error("Email already exists");

						throw new UserExistsError();
					} else {
						const totpSecret = VsAuthenticator.generateSecret(
							"totpSecret",
							ctx.params.user.email
						);

						user.totpSecret = totpSecret;

						await user.save();

						const response = await this.transformDocuments(
							ctx,
							{},
							user
						);
						response.apiKey = user.apiKeys;

						const credentials = {
							email: user.email,
							password: pwd,
						};

						// TODO: Check if folder already exists!
						await ctx.mcall({
							initDefaultMailBoxes: {
								action: "imap.initDefaultMailBoxes",
								params: {
									credentials,
								},
							},
						});

						return response;
					}
				} catch (err) {
					if (err instanceof MoleculerError) {
						throw err;
					}
				}
			},
		},
		modifyUserDetails: {
			auth: true,
			params: {
				user: {
					type: "object",
				},
			},
			async handler(ctx) {
				const existingUser = await User.findOne({
					email: ctx.params.user.email,
				});

				if (!existingUser) {
					throw new UserNotFoundError();
				} else {
					const { email, password, ...updatedUserData } =
						ctx.params.user;

					const updatedUser = await User.findOneAndUpdate(
						{ email: ctx.params.user.email },
						updatedUserData,
						{ new: true, useFindAndModify: false }
					);

					return updatedUser;
				}
			},
		},
		me: {
			async handler(ctx) {
				return ctx.meta.user;
			},
		},
	},

	methods: {},
};
