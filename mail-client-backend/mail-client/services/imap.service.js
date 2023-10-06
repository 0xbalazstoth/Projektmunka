"use strict";
const DBMixin = require("../mixins/db.mixin");
const AuthenticationMixin = require("../mixins/authentication.mixin");
const { MoleculerError } = require("moleculer").Errors;
const { ImapFlow } = require("imapflow");
const simpleParser = require("mailparser").simpleParser;

module.exports = {
	name: "imap",
	mixins: [],
	settings: [],
	actions: {
		getEmail: {
			auth: true,
			params: {
				mailBoxName: {
					type: "string",
				},
			},
			async handler(ctx) {
				const client = this.getClient(ctx);

				try {
					await client.connect();
					await client.idle();

					let lock = await client.getMailboxLock(
						ctx.params.mailBoxName
					);

					try {
						// Fetch the latest message source
						let message = await client.fetchOne(
							client.mailbox.exists,
							{
								source: true,
							}
						);

						let parsedMail = await simpleParser(message.source);
						return parsedMail;
					} finally {
						lock.release();
					}
				} finally {
					await client.logout();
				}
			},
		},
	},
	methods: {
		getClient(ctx) {
			console.log(ctx.meta);
			return new ImapFlow({
				host: process.env.IMAP_HOST || "127.0.0.1",
				port: process.env.IMAP_PORT || 143,
				auth: {
					user: ctx.meta.user.email,
					pass: "test",
				},
			});
		},
	},
};
