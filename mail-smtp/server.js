const nodemailer = require("nodemailer");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
	host: "127.0.0.1",
	port: 587,
});

// Email data
const mailOptions = {
	from: "test@oemail.io",
	to: "test2@oemail.io,test3@oemail.io",
	subject: "Tesztelek",
	html: "Egyszerű tartalomasd!", // text
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
