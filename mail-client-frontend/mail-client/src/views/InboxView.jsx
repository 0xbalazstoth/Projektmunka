import React, { useState, useEffect } from "react";
import { BsTrash, BsStar, BsBack, BsBackspace } from "react-icons/bs";
import MailList from "../components/MailList";
import OpenedMail from "../components/OpenedMail";
import { appPostRequest } from "../handlers/api";

const InboxView = () => {
	const getAllEmailEndpoint = "/api/mail/getAllEmailByMailBox";

	const [emails, setEmails] = useState();
	const [loading, setLoading] = useState(true);

	const handleGet = async () => {
		const mailBoxName = "INBOX";

		try {
			const response = await appPostRequest(getAllEmailEndpoint, {
				mailBoxName: mailBoxName,
			});

			setEmails(response);
			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	};

	useEffect(() => {
		handleGet();
	}, []);

	const [selectedMailId, setSelectedMailId] = useState(null);
	const [openMailView, setOpenMailView] = useState(
		false || selectedMailId === null
	);

	const handleSelectedMail = (email, openMailView) => {
		setSelectedMailId(email.messageId);

		setOpenMailView(openMailView);
	};

	const handleGoBackMail = () => {
		setOpenMailView(true);
	};

	return (
		<>
			{loading ? (
				<p>Loading...</p>
			) : (
				<>
					<div className="hidden lg:flex gap-x-6 min-h-[50vh]">
						{emails && emails.length > 0 ? (
							<MailList
								mailData={emails}
								handleSelectedMail={handleSelectedMail}
								selectedMailId={selectedMailId}
								mailBoxName="INBOX"
							></MailList>
						) : (
							<div className="flex flex-col gap-y-4 w-full">
								<span>No messages.</span>
							</div>
						)}

						<OpenedMail
							selectedMailId={selectedMailId}
							handleGoBackMail={handleGoBackMail}
							mailData={emails}
						></OpenedMail>
					</div>
					<div className="lg:hidden flex h-full">
						{emails.length === 0 ? (
							<div className="flex flex-col gap-y-4 w-full">
								<span>No messages.</span>
							</div>
						) : null}
						{openMailView ? (
							<MailList
								mailData={emails}
								handleSelectedMail={handleSelectedMail}
								selectedMailId={selectedMailId}
								mailBoxName="INBOX"
							></MailList>
						) : (
							<OpenedMail
								selectedMailId={selectedMailId}
								handleGoBackMail={handleGoBackMail}
								mailData={emails}
							></OpenedMail>
						)}
					</div>
				</>
			)}
		</>
	);
};

export default InboxView;
