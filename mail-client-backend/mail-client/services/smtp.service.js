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
				// Create a transporter using SMTP
				const transporter = nodemailer.createTransport({
					host: "smtp.ethereal.email",
					port: 587,
					auth: {
						user: "adam.beier@ethereal.email",
						pass: "wByrcW3ubU9QHjM3at",
					},
				});

				// Email data
				const mailOptions = {
					from: ctx.params.from, // "adam.beier@ethereal.email",
					to: ctx.params.receivers, // clare22@ethereal.email
					subject: ctx.params.subject,
					html: ctx.params.content, // html: "<h1>HEADING1</h1> test"
					// text: "simple text"
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
