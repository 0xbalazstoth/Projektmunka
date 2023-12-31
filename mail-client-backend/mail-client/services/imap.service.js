﻿"use strict";
const DBMixin = require("../mixins/db.mixin");
const AuthenticationMixin = require("../mixins/authentication.mixin");
const { MoleculerError } = require("moleculer").Errors;
const { ImapFlow } = require("imapflow");
const simpleParser = require("mailparser").simpleParser;
var CryptoJS = require("crypto-js");
const axios = require("axios");

module.exports = {
	name: "imap",
	mixins: [],
	settings: [],
	actions: {
		initDefaultMailBoxes: {
			auth: false,
			params: {
				credentials: {
					type: "object",
				},
			},
			async handler(ctx) {
				const client = this.getClient(
					ctx,
					true,
					ctx.params.credentials
				);
				try {
					await client.connect();
					await client.idle();
					const defaultMailBoxes = [
						"SENT",
						"TRASH",
						"DRAFTS",
						"SPAM",
						"STARS",
					];

					let responses = [];
					defaultMailBoxes.forEach(async (mailBox) => {
						let info = await client.mailboxCreate(mailBox);
						responses.push(info);
					});

					return responses;
				} finally {
					await client.logout();
				}
			},
		},
		filterInboxFromSpam: {
			auth: true,
			async handler(ctx) {
				const client = this.getClient(ctx);

				try {
					await client.connect();
					await client.idle();

					const messages = await ctx.mcall({
						getAllEmailByMailBox: {
							action: "imap.getAllEmailByMailBox",
							params: {
								mailBoxName: "INBOX",
							},
						},
					});

					let messagesToInbox = [];
					const messageTexts = messages.getAllEmailByMailBox;

					await Promise.all(
						messageTexts.map(async (message) => {
							const classificationResponse =
								await this.postRequest(message.text);
							const isSpam = classificationResponse.isSpam;

							if (isSpam === false) {
								messagesToInbox.push(classificationResponse);
							} else {
								await ctx.mcall({
									moveMessage: {
										action: "imap.moveMessage",
										params: {
											message: message,
											fromMailBoxName: "INBOX",
											toMailBoxName: "SPAM",
										},
									},
								});
							}
						})
					);

					return messagesToInbox;
				} finally {
					await client.logout();
				}
			},
		},
		createMailBox: {
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

					let info = await client.mailboxCreate(
						ctx.params.mailBoxName
					);

					return info;
				} finally {
					await client.logout();
				}
			},
		},
		copyMessage: {
			auth: true,
			params: {
				message: {
					type: "object",
				},
				fromMailBoxName: {
					type: "string",
				},
				toMailBoxName: {
					type: "string",
				},
			},
			async handler(ctx) {
				const client = this.getClient(ctx);

				try {
					await client.connect();
					await client.idle();

					const searchCriteria = {
						header: { "Message-ID": ctx.params.message.messageId },
					};

					await client.mailboxOpen(ctx.params.fromMailBoxName);
					const res = await client.messageCopy(
						searchCriteria,
						ctx.params.toMailBoxName
					);

					return "";
				} finally {
					await client.logout();
				}
			},
		},
		deleteMessage: {
			auth: true,
			params: {
				message: {
					type: "object",
				},
				mailBoxName: {
					type: "string",
				},
			},
			async handler(ctx) {
				const client = this.getClient(ctx);

				try {
					await client.connect();
					await client.idle();

					const searchCriteria = {
						header: { "Message-ID": ctx.params.message.messageId },
					};

					await client.mailboxOpen(ctx.params.mailBoxName);
					await client.messageDelete(searchCriteria);
				} finally {
					await client.logout();
				}
			},
		},
		moveMessage: {
			auth: true,
			params: {
				message: {
					type: "object",
				},
				fromMailBoxName: {
					type: "string",
				},
				toMailBoxName: {
					type: "string",
				},
			},
			async handler(ctx) {
				const client = this.getClient(ctx);

				try {
					await client.connect();
					await client.idle();

					const searchCriteria = {
						header: { "Message-ID": ctx.params.message.messageId },
					};

					await client.mailboxOpen(ctx.params.fromMailBoxName);
					const res = await client.messageMove(
						searchCriteria,
						ctx.params.toMailBoxName
					);

					return res;
				} finally {
					await client.logout();
				}
			},
		},
		listMailBoxes: {
			auth: true,
			async handler(ctx) {
				const client = this.getClient(ctx);

				try {
					await client.connect();
					await client.idle();

					let list = await client.list();

					return list;
				} finally {
					await client.logout();
				}
			},
		},
		appendToMailBox: {
			auth: true,
			params: {
				content: {
					type: "string",
				},
			},
			async handler(ctx) {
				const client = this.getClient(ctx);

				try {
					await client.connect();
					await client.idle();

					await client.append(
						"SENT",
						ctx.params.content,
						["\\SEEN"],
						new Date()
					);
				} finally {
					await client.logout();
				}
			},
		},
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
		async postRequest(text) {
			const spamClassificationEndpoint = "spam-classification";
			const url = "http://127.0.0.1:5000";

			const data = {
				text: text,
			};

			const headers = { "Content-Type": "application/json" };

			try {
				const response = await axios.post(
					`${url}/${spamClassificationEndpoint}`,
					data,
					{ headers }
				);

				return response.data;
			} catch (err) {
				return err;
			}
		},
		getClient(ctx, isNewUser, credentials) {
			if (isNewUser) {
				return new ImapFlow({
					host: process.env.IMAP_HOST,
					port: process.env.IMAP_PORT,
					auth: {
						user: credentials.email,
						pass: credentials.password,
					},
				});
			} else {
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
			}
		},
	},
};
