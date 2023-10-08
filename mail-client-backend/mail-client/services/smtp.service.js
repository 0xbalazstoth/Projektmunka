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
				};

				// Send the email
				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						console.error("Error sending email: ", error);
					} else {
						console.info("Email sent successfully!");
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
