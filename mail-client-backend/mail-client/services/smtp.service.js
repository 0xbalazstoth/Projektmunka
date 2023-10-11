"use strict";
const DBMixin = require("../mixins/db.mixin");
const AuthenticationMixin = require("../mixins/authentication.mixin");
const { MoleculerError } = require("moleculer").Errors;
const nodemailer = require("nodemailer");

module.exports = {
	name: "smtp",
	mixins: [],
	settings: [],
	actions: {
		sendEmail: {
			auth: true,
			params: {
				subject: {
					type: "string",
				},
				from: {
					type: "string",
				},
				receivers: {
					type: "string",
				},
				content: {
					type: "string",
				},
				// https://nodemailer.com/message/attachments/
				// path
				// attachments: [
				// 	{
				// 		type: "string",
				// 	},
				// ],
			},
			async handler(ctx) {
				const transporter = nodemailer.createTransport({
					host: process.env.SMTP_HOST,
					port: process.env.SMTP_PORT,
				});

				// Email data
				const mailOptions = {
					from: ctx.params.from,
					to: ctx.params.receivers,
					subject: ctx.params.subject,
					html: ctx.params.content,
					bcc: ctx.params.from, // copy (for 'SENT')
					// Bcc (Blind Carbon Copy) is a practical
					// solution in scenarios where you want a copy of the email to be stored in your inbox,
					// allowing you to append it to the "Sent" folder without relying on self-sending.
				};

				// Send the email
				transporter.sendMail(mailOptions, async (error, info) => {
					if (error) {
						console.error("Error sending email: ", error);
					} else {
						console.info("Email sent successfully!");

						// TODO: Fetch message by messageId
						const messageId = info.messageId;
						const inboxMessages = await ctx.mcall({
							getAllEmailByMailBox: {
								action: "imap.getAllEmailByMailBox",
								params: {
									mailBoxName: "INBOX",
								},
							},
						});

						const message = inboxMessages.getAllEmailByMailBox.find(
							(message) => message.messageId === messageId
						);

						// Move message to 'SENT'
						await ctx.mcall({
							moveMessage: {
								action: "imap.moveMessage",
								params: {
									message: message,
								},
							},
						});

						console.info(info);
						console.info(
							"Message URL: " + nodemailer.getTestMessageUrl(info)
						);
					}
				});
			},
		},
	},

	methods: {},
};
