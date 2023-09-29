const { ImapFlow } = require("imapflow");

const getClient = () => {
	return new ImapFlow({
		// host: "ethereal.email",
		// port: 993,
		// secure: true,
		// auth: {
		// 	user: "adam.beier@ethereal.email",
		// 	pass: "wByrcW3ubU9QHjM3at",
		// },
		host: "192.168.1.135",
		port: 143,
		secure: false,
		auth: {
			user: "test@oemail.io",
			pass: "test",
		},
	});
};

const fetchAndListMessages = async (mailboxName) => {
	const client = getClient();

	try {
		// Wait until the client connects and authorizes
		await client.connect();
		await client.idle();

		// Select and lock the specified mailbox. Throws if the mailbox does not exist
		let lock = await client.getMailboxLock(mailboxName);

		try {
			// Fetch the latest message source
			let message = await client.fetchOne(client.mailbox.exists, {
				source: true,
			});
			console.info(message.source.toString());

			// List subjects for all messages
			// for await (let message of client.fetch("1:*", { envelope: true })) {
			// 	console.log(`${message.uid}: ${message.envelope.subject}`);
			// }
		} finally {
			// Make sure the lock is released; otherwise, the next `getMailboxLock()` never returns
			lock.release();
		}
	} finally {
		// Log out and close connection
		await client.logout();
	}
};

const createNewMailBox = async (mailboxName) => {
	const client = getClient();

	try {
		await client.connect();

		let info = await client.mailboxCreate(mailboxName);
		console.log(info);
	} catch (err) {
		console.log(err);
	}

	await client.logout();
};

const listMailboxes = async () => {
	const client = getClient();

	try {
		await client.connect();

		let mailboxes = await client.list();
		console.log(mailboxes);
	} catch (err) {
		console.log(err);
	}

	await client.logout();
};

const mailboxOpenEvent = () => {
	const client = getClient();

	client.on("mailboxOpen", (mailbox) => {
		console.log(`Mailbox ${mailbox.path} was opened`);
	});
};

// Example usage
const inbox = "INBOX";
fetchAndListMessages(inbox).catch((err) => console.error(err));

//createNewMailBox("WARNING");
//listMailboxes().catch((err) => console.error(err));
