const nodemailer = require("nodemailer");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
	host: "192.168.1.135",
	port: 587,
	auth: {
		user: "test@oemail.io",
		pass: "test",
	},
});

// Email data
const mailOptions = {
	from: "test@oemail.io",
	to: "test2@oemail.io",
	subject: "Tesztelek",
	html: "<h1>HEADING111</h1> EZ EGY TESZT", // text
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
