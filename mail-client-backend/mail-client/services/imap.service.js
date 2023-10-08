"use strict";
const DBMixin = require("../mixins/db.mixin");
const AuthenticationMixin = require("../mixins/authentication.mixin");
const { MoleculerError } = require("moleculer").Errors;
const { ImapFlow } = require("imapflow");
const simpleParser = require("mailparser").simpleParser;
var CryptoJS = require("crypto-js");

module.exports = {
	name: "imap",
	mixins: [],
	settings: [],
	actions: {
		getAllEmailByMailBox: {
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
						let emails = [];
						for await (let message of client.fetch("1:*", {
							envelope: true,
							bodyParts: true,
							source: true,
							bodyStructure: true,
						})) {
							//console.log(message.source.toString());
							let parsed = await simpleParser(message.source);
							emails.push(parsed);
						}

						return emails;
					} finally {
						lock.release();
					}
				} finally {
					await client.logout();
				}
			},
		},
		getEmailByMailBox: {
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
			const bytes = CryptoJS.AES.decrypt(
				ctx.meta.user.password,
				process.env.ENCRYPTION_SECRET
			);
			const decryptedPwd = bytes.toString(CryptoJS.enc.Utf8);
			return new ImapFlow({
				host: process.env.IMAP_HOST,
				port: process.env.IMAP_PORT,
				auth: {
					user: ctx.meta.user.email,
					pass: decryptedPwd,
				},
			});
		},
	},
};
