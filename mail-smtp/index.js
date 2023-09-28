const nodemailer = require("nodemailer");

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
	from: "adam.beier@ethereal.email",
	to: "clare22@ethereal.email",
	subject: "Tesztelek",
	text: "Teszt üzenet!",
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
	if (error) {
		console.error("Error sending email: ", error);
	} else {
		console.log("Email sent successfully!");
		console.log("Message URL: " + nodemailer.getTestMessageUrl(info));
	}
});
