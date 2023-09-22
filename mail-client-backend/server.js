const nodemailer = require("nodemailer");
const Imap = require("imap");

// SMTP
const transporter = nodemailer.createTransport({
	host: "sandbox.smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: "87d30e1591971d",
		pass: "d00b3636d68abd",
	},
});

const mailOptions = {
	from: "grandmastar27@gmail.com",
	to: "keyon.cole@ethereal.email",
	subject: "Test Email",
	text: "This is a test email sent from Node.js.",
};

transporter.sendMail(mailOptions, (error, info) => {
	if (error) {
		console.error("Error sending email:", error);
	} else {
		console.log("Email sent:", info.response);
	}
});

// IMAP
const imap = new Imap({
	user: "keyon.cole@ethereal.email", // Your IMAP username
	password: "FeAtv2TJkKnzUUNARC", // Your IMAP password
	host: "imap.ethereal.email", // IMAP server hostname (usually 'localhost' for a local server)
	port: 993, // IMAP server port (usually 143 for non-secure, 993 for secure)
	tls: true, // Set to true if the server uses SSL/TLS
});

function openInbox(cb) {
	imap.openBox("INBOX", true, cb);
}

imap.once("ready", () => {
	openInbox((err, box) => {
		if (err) throw err;

		// Search for all emails since a certain date (you can modify the search criteria)
		const searchCriteria = ["ALL"];

		// Fetch the list of emails
		imap.search(searchCriteria, (err, results) => {
			if (err) throw err;

			const fetch = imap.fetch(results, { bodies: "" });

			fetch.on("message", (msg, seqno) => {
				console.log(`Message #${seqno}`);

				msg.on("body", (stream, info) => {
					let buffer = "";
					stream.on("data", (chunk) => {
						buffer += chunk.toString("utf8");
					});
					stream.once("end", () => {
						console.log(buffer); // The email content
					});
				});

				msg.once("attributes", (attrs) => {
					// You can access email attributes here, such as the subject, sender, etc.
					console.log(attrs);
				});
			});

			fetch.once("end", () => {
				console.log("Done fetching emails.");
				imap.end();
			});
		});
	});
});

imap.once("error", (err) => {
	console.error("IMAP Error:", err);
});

imap.once("end", () => {
	console.log("Connection ended.");
});

imap.connect();
