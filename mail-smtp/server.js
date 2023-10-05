const nodemailer = require("nodemailer");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
	host: "127.0.0.1",
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
	subject: "Tesztelekasd",
	html: "<h1>HH2</h1> EZ EGY 2323TESZT2", // text
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
