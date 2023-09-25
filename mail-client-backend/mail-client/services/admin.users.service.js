"use strict";
const DBMixin = require("../mixins/db.mixin");
const AdminUser = require("../models/adminUser");
const bcrypt = require("bcrypt");
const hat = require("hat");
const AuthenticationMixin = require("../mixins/authentication.mixin");

module.exports = {
	name: "admin.adminUsers",
	mixins: [DBMixin("adminUsers"), AuthenticationMixin],
	model: AdminUser,
	settings: {
		entityValidator: {
			email: { type: "email" },
			password: { type: "string" },
			firstName: { type: "string" },
			lastName: { type: "string" },
		},
	},

	actions: {
		create: {
			params: {
				adminUser: {
					type: "object",
				},
			},

			async handler(ctx) {
				const adminUser = new AdminUser(ctx.params.adminUser);
				await this.validateEntity(adminUser);
				adminUser.password = bcrypt.hashSync(adminUser.password, 10);
				adminUser.apiKeys.push({
					token: hat(256),
				});

				try {
					//Check if email already exists
					const existingUser = await AdminUser.findOne({
						email: adminUser.email,
					});
					if (existingUser) {
						throw new Error("Email already exists");
					} else {
						await adminUser.save();
					}
				} catch (err) {
					console.error(err);
				}

				return adminUser;
			},
		},
	},
};
